# Publish package on Meteor's Atmosphere.js

# Make sure Meteor is installed, per https://www.meteor.com/install. The curl'ed script is totally safe; takes 2 minutes to read its source and check.
type meteor >/dev/null 2>&1 || { curl https://install.meteor.com/ | sh; }

# sanity check: make sure we're in the root directory of the checkout
DIR=$( cd "$( dirname "$0" )" && pwd )
cd $DIR/..

# Meteor expects package.js to be in the root directory of the checkout, so copy it there temporarily
cp meteor/package.js ./

# publish package, creating it if it's the first time we're publishing
PACKAGE_NAME=$(grep -i name package.js | head -1 | cut -d "'" -f 2)
PACKAGE_EXISTS=$(meteor search $PACKAGE_NAME 2>/dev/null | wc -l)

if [ $PACKAGE_EXISTS -gt 0 ]; then
  meteor publish
else
  meteor publish --create
fi

rm package.js
