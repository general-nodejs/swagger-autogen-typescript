npm commands

- npm login
- npm publish
- npm version patch && npm publish

```JSON
    "prepare": "yarn run build",
    "prepublishOnly": "yarn test && npm run lint",
    "preversion": "npm run lint",
    "version": "npm run format && git add -A src",
    "postversion": "git push && git push --tags"
```
