// 2025-11-28T14:32:55.123Z => 2025-11-28T16-09-38-930Z
export const makeTimestampFilesafe = (timestamp) =>
  timestamp.replace(/:/g, "-").replace(/\./g, "-");
