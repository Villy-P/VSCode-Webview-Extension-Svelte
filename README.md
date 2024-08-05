# VSCode-Webview-Extension-Svelte

A template repository to quickly make a Visual Studio Code Webview Extension using Svelte and Rollup

This repo gives you everything you need to start making your own webview extensions using the power and reactivity of Svelte.
It automatically comes with everything you need, from components to CSS.

## Startup

You can start using this repository by clicking the `Use the template` button on the [Github Page](https://github.com/Villy-P/VSCode-Webview-Extension-Svelte).

After you create your repo, you can run `npm run compile` to begin compiling the frontend and backend, and press `F5` to start the Extension enviroment.

You can find the extension by pressing `Ctrl-Shift-P` and navigating to `Hello World`.

Before you begin making changes, change your extension details in `package.json` and webview properties in `src/extension/extension.ts` on line `6`.

After that, you are good to go!
Read the `Directory Composition` section to see where to put which files.

## Directory Composition

### Front End

This is your webview itself and all files pertaining to it:

| File / Folder | Use |
| ------------- | --- |
| `src/main.ts`     | The base file for your Svelte Webview |
| `src/App.svelte`  | This is your webview page |
| `src/css/`        | This folder holds all your CSS |
| `src/components/` | You can put all your Svelte components here |

You can put `ts` files that you use on the front end anywhere in the project directory EXCEPT the `src/extension` folder.

### Back End

This is the VSCode Backend that will contain all files used by the backend.

| File / Folder | Use |
| ------------- | --- |
| `src/extension/extension.ts` | This is the base file for your extension. |
| `src/extension/panel.ts` | This is the class that handles the creation of the Panel. |
| `src/extension/`  | Place all utility `ts` files here |
