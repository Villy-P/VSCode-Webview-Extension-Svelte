import * as vscode from 'vscode';
import { SveltePanel } from './panel';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension-name.helloWorld', () => {
		SveltePanel.render("showPanel", "extension-display-name", context.extensionUri);

		// Your setup should go here (things like posting things to the front end)
		// This is an example
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
