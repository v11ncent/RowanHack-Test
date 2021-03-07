#!/bin/bash
git clone 'https://github.com/unitehenry/kandband';
export INSTALL_DIR=$(pwd)/kandband;

# Build react app
cd $INSTALL_DIR/app;
npm install;
npm run build;

# Build board
cd $INSTAL_DIR/board;
npm install;
npx pkg index.js;

# Install binaries
case "$OSTYPE" in
  darwin*)  mv linux-tm /usr/bin ;;
  linux*)   mv mac-tm /usr/bin ;;
esac