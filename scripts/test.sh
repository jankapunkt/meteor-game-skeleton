#!/usr/bin/env bash

port=3000
settings=settings.json

meteor update
meteor npm prune
meteor npm install

TEST_BROWSER_DRIVER=phantomjs meteor test --once --driver-package meteortesting:mocha --port=$port --settings=$settings