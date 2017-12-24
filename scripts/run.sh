#!/usr/bin/env bash


port=3030
settings=settings.json

meteor update
meteor npm prune
meteor npm install

echo "////////////////////////////////////////////"
echo "// RUN APP ON $port"
echo "////////////////////////////////////////////"

meteor --port=$port --settings=$settings