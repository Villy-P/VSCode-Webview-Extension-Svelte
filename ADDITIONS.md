# Additions

If you want to add other libraries to your project, you can find it here.

## Tailwind CSS

Run `npm install tailwindcss @tailwindcss/postcss postcss` in your terminal to install the necessary packages.

```js
module.exports = {
    plugins: {
      autoprefixer: {},
      "@tailwindcss/postcss": {}
    },
};
```

Add this to the top of `src/css/app.css`:

``` css
@import "tailwind"
```

Tailwind CSS should now work in your project.
