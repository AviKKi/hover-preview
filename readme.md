# Hover Preview

A vanilla js library to show preview images on hover.

## Getting started

1. Add `hover-preview.min.js` to bottom of your body tag.
   ```js
   <script defer src='https://raw.githubusercontent.com/AviKKi/hover-preview/main/dist/hover-preview.min.js'></script>
   ```
1. Add class `hover-preview` to `img` tag that should have preview behaviour.
   ```html
   <img src="poster.jpg" class="hover-preview" />
   ```
1. Add `data-preview` attribute with `|` seperated preview image urls.
   ```html
   <img
     src="poster.jpg"
     class="hover-preview"
     data-preview="preview1.jpg|preview2.jpg|preview3.jpg"
   />
   ```

## Build minified bundle
```sh
$ yarn build
```
