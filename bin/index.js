#!/usr/bin/env node

import { existsSync, fstat, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { confirm, input, checkbox } from '@inquirer/prompts';

let projectRelativePath = process.argv[2];
let projectPath = '';
let projectName = '';
let projectDescription = '';
let projectDisplayName = '';
let projectCategories = [];
let projectKeywords = [];
let projectAdditions = [];

const validCategories = ['Programming Languages', 'Snippets', 'Linters', 'Themes', 'Debuggers', 'Formatters', 'Keymaps', 'SCM Providers', 'Other', 'Extension Packs', 'Language Packs', 'Data Science', 'Machine Learning', 'Visualization', 'Notebooks', 'Education', 'Testing'];
const validAdditions = ["Tailwind"];

function createFileName(path, writeFileName) {
    const data = readFileSync(path, 'utf8');
    writeFileSync(writeFileName, data, 'utf-8');
}

function createFileNameWithData(writeFileName, data) {
    writeFileSync(writeFileName, data, 'utf-8');
}

function createFileNameWithReplace(path, writeFileName, replace) {
    let data = readFileSync(path, 'utf8');
    for (const key in replace)
        data = data.replaceAll(key, replace[key]);
    writeFileSync(writeFileName, data, 'utf-8');
}

async function runProject() {
    if (!process.argv[2])
        projectRelativePath = await input({ 
            message: chalk.blue('Enter project relative path. Leave blank to use current directory') ,
            default: "."
        });
    projectPath = resolve(process.cwd(), projectRelativePath);

    if (!existsSync(projectPath))
        mkdirSync(projectPath);

    if (readdirSync(projectPath).length > 0) {
        const answer = await confirm({ message: chalk.yellow('WARNING: Directory is not empty. Continue?') });
        if (answer) {
            console.log("\n");
        } else {
            console.log(chalk.red("Exiting...\n"));
            process.exit();
        }
    }

    console.log(chalk.green('\nCreating project...'));
    console.log(chalk.green('Enter project details\n'));

    projectName = await input({ message: chalk.blue('Enter project name'), default: projectRelativePath });
    projectDescription = await input({ message: chalk.blue('Enter project description'), default: '' });
    projectDisplayName = await input({ message: chalk.blue('Enter project display name'), default: projectName });

    projectCategories = await checkbox({
        message: chalk.blue("Select project categories"),
        choices: validCategories
    });

    projectKeywords = await input({ 
        message: chalk.blue('Enter up to 5 project keywords (seperated by space)'), 
        default: '' 
    });
    projectKeywords = projectKeywords.split(" ").slice(0, 5);

    projectAdditions = await checkbox({ 
        message: chalk.blue('Enter additional toolkits (optional)'), 
        choices: validAdditions
    });

    const README = `# ${projectName}\n\n${projectDescription}\n## Installation\n\n## Usage\n\n## License\n\n## Contributing\n\n## Changelog\n\n## Authors\n\n## Acknowledgements\n\n## Keywords\n\n${projectName} ${projectKeywords.join(" ")}`;

    createFileName("../tsconfig.node.json", `${projectPath}/tsconfig.node.json`);
    createFileName("../tsconfig.json", `${projectPath}/tsconfig.json`);
    createFileName("../rollup.config.mjs", `${projectPath}/rollup.config.mjs`);
    if (projectAdditions.includes("Tailwind")) 
        createFileNameWithReplace("../postcss.config.js", `${projectPath}/postcss.config.js`, {
            "/* twconfig */": "tailwindcss: {},"
        });
    else
        createFileName("../postcss.config.js", `${projectPath}/postcss.config.js`);
    createFileNameWithData(`${projectPath}/README.md`, README);
    createFileNameWithReplace("../package.json", `${projectPath}/package.json`, {
        "extension-name": projectName,
        "extension-display-name": projectDisplayName,
        "extension-description": projectDescription,
        "Other": projectCategories.join("\", \""),
        "extension-keywords": projectKeywords.join("\", \""),
    });
    createFileNameWithReplace("../package-lock.json", `${projectPath}/package-lock.json`, {
        "extension-name": projectName
    });
    createFileNameWithData("../CHANGELOG.md", `# Changelog`);
    createFileName("../.vscodeignore", `${projectPath}/.vscodeignore`);
    createFileName("../.gitignore", `${projectPath}/.gitignore`);
    createFileName("../.eslintrc.json", `${projectPath}/.eslintrc.json`);

    if (!existsSync(`${projectPath}/src`))
        mkdirSync(`${projectPath}/src`);

    createFileName("../src/svelte-shim.d.ts", `${projectPath}/src/svelte-shim.d.ts`);
    createFileName("../src/main.ts", `${projectPath}/src/main.ts`);
    createFileName("../src/App.svelte", `${projectPath}/src/App.svelte`);

    if (!existsSync(`${projectPath}/src/extension`))
        mkdirSync(`${projectPath}/src/extension`);

    createFileNameWithReplace("../src/extension/extension.ts", `${projectPath}/src/extension/extension.ts`, {
        "extension-name": projectName,
        "extension-display-name": projectDisplayName,
    });
    createFileName("../src/extension/panel.ts", `${projectPath}/src/extension/panel.ts`);

    if (!existsSync(`${projectPath}/src/css`))
        mkdirSync(`${projectPath}/src/css`);

    if (projectAdditions.includes("Tailwind"))
        createFileNameWithReplace("../src/css/app.css", `${projectPath}/src/css/app.css`, {
            "/* twimport */": "@tailwind base;\n@tailwind components;\n@tailwind utilities;"
        });
    else
        createFileName("../src/css/app.css", `${projectPath}/src/css/app.css`);

    if (!existsSync(`${projectPath}/src/components`))
        mkdirSync(`${projectPath}/src/components`);

    createFileName("../src/components/data.svelte", `${projectPath}/src/components/data.svelte`);

    if (!existsSync(`${projectPath}/.vscode`))
        mkdirSync(`${projectPath}/.vscode`);

    createFileName("../.vscode/tasks.json", `${projectPath}/.vscode/tasks.json`);
    createFileName("../.vscode/launch.json", `${projectPath}/.vscode/launch.json`);
    createFileName("../.vscode/settings.json", `${projectPath}/.vscode/settings.json`);

    if (projectAdditions.includes("Tailwind"))
        createFileName("./additions/tailwind.config.js", `${projectPath}/tailwind.config.js`);

    console.log(chalk.green('\n\nProject created successfully!'));
    console.log(chalk.green('Run the following commands to get started:\n'));
    if (projectRelativePath !== ".")
        console.log(chalk.blue(`* cd ${projectRelativePath}`));
    console.log(chalk.blue('* npm install'));
    if (projectAdditions.includes("Tailwind"))
        console.log(chalk.blue('* npm install -D tailwindcss autoprefixer'));
    console.log(chalk.blue('* npm run compile'));
    console.log(chalk.blue('* Press F5 on your keyboard'));
}

runProject();