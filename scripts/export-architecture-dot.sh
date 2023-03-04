set -e
BASEDIR=$(dirname $(dirname $0))
OUTFILE=$BASEDIR/architecture/dependency.dot
mkdir -p $BASEDIR/architecture
npx depcruise src --include-only "^src" --config --output-type dot > $OUTFILE
