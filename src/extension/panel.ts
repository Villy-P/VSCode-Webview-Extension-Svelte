import * as vscode from "vscode";
import { Uri, WebviewPanel, Disposable, ViewColumn, Webview } from "vscode";

interface Payload {
    title: string;
    msg: string;
}

function getUri(webview: Webview, extensionUri: Uri, pathList: string[]) {
	return webview.asWebviewUri(Uri.joinPath(extensionUri, ...pathList));
}

export function getNonce() {
	let text = "";
	const possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

/* 
    This is the class that will handle all things related to the svelte panel
    The base for this class was found here:
    https://github.com/microsoft/vscode-webview-ui-toolkit-samples/blob/main/frameworks/hello-world-svelte/src/panels/HelloWorldPanel.ts

    If you need any utilties for your webview panel, add them here

    You can call them through SveltePanel.currentPanel.function()
*/
export class SveltePanel {
	private readonly panel: WebviewPanel;
	private disposables: Disposable[] = [];
	public static currentPanel: SveltePanel | undefined;

	private constructor(panel: WebviewPanel, uri: Uri) {
		this.panel = panel;
		this.panel.onDidDispose(() => this.dispose(), null, this.disposables);
		this.panel.webview.html = this.getWebviewContent(this.panel.webview, uri);
		this.setWebviewMessageListener(this.panel.webview);
	}

	public static render(view: string, name: string, uri: Uri) {
		if (SveltePanel.currentPanel) {
			SveltePanel.currentPanel.panel.reveal(ViewColumn.One);
		} else {
			const panel = vscode.window.createWebviewPanel(
				view,
				name,
				ViewColumn.One,
				{
					enableScripts: true,
					localResourceRoots: [Uri.joinPath(uri, "out")],
				}
			);

			SveltePanel.currentPanel = new SveltePanel(panel, uri);
		}
	}

	public post(content: Payload) {
		this.panel.webview.postMessage(content);
	}

	public dispose() {
		SveltePanel.currentPanel = undefined;
		this.panel.dispose();

		while (this.disposables.length) {
			const disposable = this.disposables.pop();
			if (disposable) {
				disposable.dispose();
			}
		}
	}

	public getWebviewContent(webview: Webview, uri: Uri) {
		const scriptUri = getUri(webview, uri, ["out", "compiled", "bundle.js"]);
		const styleUri = getUri(webview, uri, ["out", "compiled", "bundle.css"]);
		const nonce = getNonce();

		return /*html*/ `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                <title>Hello World</title>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
				<link href="${styleUri}" rel="stylesheet" />
                <script defer nonce="${nonce}" src="${scriptUri}"></script>
                </head>
                <body>
                </body>
            </html>
        `;
	}

	private setWebviewMessageListener(webview: Webview) {
		webview.onDidReceiveMessage(
			(message: Payload) => {
				const command = message.title;
				const text = message.msg;

                // Add more commands here
				switch (command) {
					case "hello":
						vscode.window.showInformationMessage(text);
						return;
				}
			},
			undefined,
			this.disposables
		);
	}
}
