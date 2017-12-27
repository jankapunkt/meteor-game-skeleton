#!/usr/bin/env bash

port=3090
settings=settings.json

meteor update
meteor npm prune
meteor npm install

if [ "$1" = "--watch" ]; then
    TEST_WATCH=1 meteor test --driver-package meteortesting:mocha --port=$port --settings=$settings
else
    TEST_BROWSER_DRIVER=phantomjs meteor test --once --driver-package meteortesting:mocha --port=$port --settings=$settings
fi

