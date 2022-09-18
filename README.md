# Imgur-Uploader-Firefox

Addon for user to upload image to imgur in Firefox 57+

## Addon url
https://addons.mozilla.org/firefox/addon/imgur-upload/

## Build (for developer)
[Node.js](https://nodejs.org/) must be installed in advance.

Install build tools:
```
$ npm install
```
Build JavaScript:
```
$ npx webpack
```
Package to XPI:
```
$ zip -r Imgur-Uploader-Firefox.xpi build icons templates LICENSE manifest.json README.md
```

## License
[Mozilla Public License 2.0](LICENSE)
