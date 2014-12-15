#!/bin/sh
# Test Meteor package before publishing to Atmospherejs.com

# Make sure Meteor is installed, per https://www.meteor.com/install.
# The curl'ed script is totally safe; takes 2 minutes to read its source and check.
type meteor >/dev/null 2>&1 || { curl https://install.meteor.com/ | sh; }

# sanity check: make sure we're in the root directory of the checkout
cd "$( dirname "$0" )/.."

ALL_EXIT_CODE=0

# test any package*.js packages we may have, e.g. package.js, package-standalone.js
for PACKAGE_FILE in meteor/package*.js; do

  # Meteor expects package.js in the root dir of the checkout, so copy there our package file under that name, temporarily
  cp $PACKAGE_FILE ./package.js

  PACKAGE_NAME=$(grep -i name package.js | head -1 | cut -d "'" -f 2)

  echo "### Testing $PACKAGE_NAME..."

  # provide an invalid MONGO_URL so Meteor doesn't bog us down with an empty Mongo database
  if [ $# -gt 0 ]; then
    # interpret any parameter to mean we want an interactive test
    MONGO_URL=mongodb:// meteor test-packages ./
  else
    # automated/CI test with phantomjs
    spacejam --mongo-url mongodb:// test-packages ./
    ALL_EXIT_CODES=$(( $ALL_EXIT_CODES + $? ))
  fi

  # delete temporary build files and package.js
  rm -rf .build.* versions.json package.js

done

exit $ALL_EXIT_CODES
