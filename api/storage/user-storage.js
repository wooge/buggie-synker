import fs from "fs";
import yaml from "js-yaml";
import { execSync } from "child_process";

const USERS_FILE = "/authelia/users_database.yml";

const readUsersFile = () => {
  const file = fs.readFileSync(USERS_FILE, "utf8");
  const data = yaml.load(file);

  if (!data || !data.users)
    throw new Error("List of users couldn't be read from users_database.yml.");

  return data;
};

const hashPassword = (password) => {
  const result = execSync(
    `docker exec authelia authelia crypto hash generate argon2 --password '${password}'`
  );
  const resultString = result.toString();

  return resultString.replace(/^Digest:\s*/, "").trim();
};

const saveDataToUsersFile = (usersFileData) => {
  fs.writeFileSync(
    USERS_FILE,
    yaml.dump(usersFileData, { styles: { "!!str": '"' } }),
    "utf8"
  );
};

export const getUsers = () => {
  const usersObject = readUsersFile().users;

  return Object.entries(usersObject).map(([username, info]) => ({
    username,
    groups: info.groups || [],
  }));
};

export const getUserByUsername = (username) => {
  const usersObject = readUsersFile().users;

  const userObject = usersObject[username];

  if (!userObject) {
    return userObject;
  }

  return {
    username,
    groups: userObject.groups ?? [],
  };
};

export const createUser = ({ username, password }) => {
  const usersFileData = readUsersFile();

  const hashedPassword = hashPassword(password);

  const userObject = {
    displayname: username,
    password: hashedPassword,
  };

  usersFileData.users[username] = userObject;

  saveDataToUsersFile(usersFileData);

  return userObject;
};

export const deleteUser = (username) => {
  const usersFileData = readUsersFile();

  const userObject = usersFileData.users[username];

  const userGroups = userObject.groups ?? [];

  if (userGroups.includes("admins")) return false;

  delete usersFileData.users[username];

  saveDataToUsersFile(usersFileData);

  return true;
};
