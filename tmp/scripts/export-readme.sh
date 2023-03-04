set -e

BASEDIR=$(dirname $(dirname $0))

echo "# Front-end Clean Architecture in Practice" > $BASEDIR/README.md
echo "## Architecture" > $BASEDIR/README.md
echo "\`\`\`mermaid" >> $BASEDIR/README.md
npx depcruise src --include-only "^src" --config --output-type mermaid >> $BASEDIR/README.md
echo "\`\`\`" >> $BASEDIR/README.md
