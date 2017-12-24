# meteor-game-skeleton
A skeleton app as foundation for games.


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

