set -e

BASEDIR=$(dirname $(dirname $0))
OUTFILE=$BASEDIR/docs/Architecture.md
mkdir -p $BASEDIR/docs

echo "# Architecture" > $OUTFILE
echo "" >> $OUTFILE
echo "\`\`\`mermaid" >> $OUTFILE
npx depcruise src --include-only "^src" --config --output-type mermaid >> $OUTFILE
echo "\`\`\`" >> $OUTFILE
