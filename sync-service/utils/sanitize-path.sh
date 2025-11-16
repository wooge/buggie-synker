INPUT_PATH=$1

echo "Sanitizing path: '$INPUT_PATH'"

for (( i=0; i<${#INPUT_PATH}; i++ )); do
    char="${INPUT_PATH:$i:1}"

	# Placed dash at end to evoid being perceived as range
    if [[ "$char" =~ [a-zA-Z0-9:/\\._\'\ -] ]]; then
        SAFE_PATH+="$char"
    else
        SAFE_PATH+="_"
    fi
done

echo "Resulting path: '$SAFE_PATH'"

mv "$INPUT_PATH" "$SAFE_PATH"