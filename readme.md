# Hover Preview

A vanilla js library to show preview images on hover, check a Demo [here](https://nostalgic-boyd-d0a053.netlify.app/)


Please **watch** :eyes: or **star** :star2: this repo if you like it.


![preview](https://s8.gifyu.com/images/5f8db16a40fbc297233548.gif)



## Getting started

1. Grab the minified js code, from [here](https://github.com/AviKKi/hover-preview/blob/main/dist/hover-preview.min.js).

1. Add `hover-preview.min.js` to bottom of your body tag, example -
   ```js
   <script defer src='/js/hover-preview.min.js'></script>
   ```
   
1. Add class `hover-preview` to `img` tag that should have preview behaviour.
   ```html
   <img src="poster.jpg" class="hover-preview" />
   ```
   
1. Add `data-preview` attribute with `pipe(|)` seperated preview image urls, example
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



