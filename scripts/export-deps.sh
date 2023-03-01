set -e

BASEDIR=$(dirname $(dirname $0))

echo "# Dependency Graph" > $BASEDIR/dependency.md
echo "\`\`\`mermaid" >> $BASEDIR/dependency.md
npx depcruise src --include-only "^src" --config --output-type mermaid >> $BASEDIR/dependency.md
echo "\`\`\`" >> $BASEDIR/dependency.md
