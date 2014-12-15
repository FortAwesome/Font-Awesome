#!/bin/bash
# Publish package to Meteor's repository, Atmospherejs.com

# Make sure Meteor is installed, per https://www.meteor.com/install.
# The curl'ed script is totally safe; takes 2 minutes to read its source and check.
type meteor >/dev/null 2>&1 || { curl https://install.meteor.com/ | sh; }

# sanity check: make sure we're in the root directory of the checkout
cd "$( dirname "$0" )/.."

ALL_EXIT_CODE=0

# test any package*.js packages we may have, e.g. package.js, package-compat.js
for PACKAGE_FILE in meteor/package*.js; do

  # Meteor expects package.js to be in the root directory of the checkout, so copy there our package file under that name, temporarily
  cp $PACKAGE_FILE ./package.js

  # publish package, creating it if it's the first time we're publishing
  PACKAGE_NAME=$(grep -i name package.js | head -1 | cut -d "'" -f 2)

  echo "Publishing $PACKAGE_NAME..."

  # Attempt to re-publish the package - the most common operation once the initial release has
  # been made. If the package name was changed (rare), you'll have to pass the --create flag.
  meteor publish "$@"; EXIT_CODE=$?
  ALL_EXIT_CODE=$(( $ALL_EXIT_CODE + $EXIT_CODE ))
  if (( $EXIT_CODE == 0 )); then
    echo "Thanks for releasing a new version. You can see it at"
    echo "https://atmospherejs.com/${PACKAGE_NAME/://}"
  else
    echo "We got an error. Please post it at https://github.com/raix/Meteor-community-discussions/issues/14"
  fi

  # rm the temporary build files and package.js
  rm -rf ".build.$PACKAGE_NAME" versions.json package.js

done

exit $ALL_EXIT_CODE
