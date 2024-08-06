# Additions

If you want to add other libraries to your project, you can find it here.

## Tailwind CSS

### Install Tailwind

Run `npm install -D tailwindcss autoprefixer` in your terminal to install the necessary packages.

### Configure Tailwind and PostCSS files

Change your `postcss.config.js` file to look like this:

```js
module.exports = {
 plugins: {
  autoprefixer: {},
  tailwindcss: {},
 },
};
```

Then add a new `tailwind.config.js` file and populate it like so:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
 content: ["./src/**/*.{html,js,svelte,ts}", "./src/*.{html,js,svelte,ts}"],
 theme: {
  extend: {},
 },
 plugins: [],
};
```

### Import Tailwind into CSS File and Rollup

Add this to the top of `src/css/app.css`:

``` css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Then, in your `rollup.config.mjs` file, add this to the imports at the top:

``` js
import tailwindcss from 'tailwindcss';
import tailwindConfig from './tailwind.config.js';
```

Then, change the `postcss` plugin to this:

``` js
postcss({
   config: {
     path: './postcss.config.js',
   },
   extensions: ['.css'],
   minimize: true,
   extract: true,
   output: "bundle.css",
   plugins: [tailwindcss(tailwindConfig)]
  }),
```

Tailwind CSS should now work in your project.
