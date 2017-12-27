[![Build Status](https://travis-ci.org/jankapunkt/meteor-game-skeleton.svg?branch=master)](https://travis-ci.org/jankapunkt/meteor-game-skeleton)
[![Maintainability](https://api.codeclimate.com/v1/badges/45bba8e2030280fd6000/maintainability)](https://codeclimate.com/github/jankapunkt/meteor-game-skeleton/maintainability)
[![GitLicense](https://gitlicense.com/badge/jankapunkt/meteor-game-skeleton)](https://gitlicense.com/license/jankapunkt/meteor-game-skeleton)


# meteor-game-skeleton

A Meteor skeleton app as foundation for games.

# About the App

### General Vision and Use Case

* Provide out-of the box runnable app template for browser based games
* Core-features like user login, registration, minimal application cycle
* Extensible API, providig only the most basic functionalities
* Server side methods and api decouples from ui (to allow developers to choose their own rendering engine)
* Minimal app but fully tested


### APP Flow

<img src="./diagrams/app_flow.svg" />

### Game Flow

<img src="./diagrams/pooling.svg" />



# Conventions

### DRY

To enforce the DRY principle, the following conventions should be regarded:

* DefObjects should be used where possible to decouple definition from implementation
* Use factories to create collections, methods, publications from DefObjects (see `imports/api/factories`)


### Translation

* All labels are defined untranslated as i18n code in camelCase (for example: `"componentName.featureName.labelName"`)
* No server-side translation, all data is passed to client as untranslated string
* This also applies for error messages or data, that is saved in documents
* Translation work is done by client (reactively), depending on client's language



### Mobile First

* Keep views mobile friendly
* Write code, that can be compiled into mobile app (android/ios), add tests to ensure mobile compatibility


### Cheating

The following client actions should always be server-side checked:

actions that affect or are affected by

* game logic
* rules
* scores
* other game entities than player
* players stats
* any data that is made persistent

