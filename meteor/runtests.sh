# Test Meteor package before publishing to Atmosphere.js

# Make sure Meteor is installed, per https://www.meteor.com/install. The curl'ed script is totally safe; takes 2 minutes to read its source and check.
type meteor >/dev/null 2>&1 || { curl https://install.meteor.com/ | sh; }

# sanity check: make sure we're in the root directory of the checkout
DIR=$( cd "$( dirname "$0" )" && pwd )
cd $DIR/..

# Meteor expects package.js to be in the root directory of the checkout, so copy it there temporarily
cp meteor/package.js ./

# run tests and delete the temporary package.js even if Ctrl+C is pressed
int_trap() {
  echo
  echo "Tests interrupted."
}

trap int_trap INT

meteor test-packages ./

PACKAGE_NAME=$(grep -i name package.js | head -1 | cut -d "'" -f 2)
rm -rf ".build.$PACKAGE_NAME"
rm -rf ".build.local-test:$PACKAGE_NAME"
rm versions.json 2>/dev/null

rm package.js
