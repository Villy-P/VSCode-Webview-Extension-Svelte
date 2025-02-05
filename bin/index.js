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

    createFileName("../tsconfig.node.json", `${projectPath}/tsconfig.node.json`);
    createFileName("../tsconfig.json", `${projectPath}/tsconfig.json`);
    createFileName("../rollup.config.mjs", `${projectPath}/rollup.config.mjs`);
    createFileName("../postcss.config.js", `${projectPath}/postcss.config.js`);
    createFileNameWithData(`${projectPath}/README.md`, `# ${projectName}\n\n${projectDescription}\n## Installation\n\n## Usage\n\n## License\n\n## Contributing\n\n## Changelog\n\n## Authors\n\n## Acknowledgements\n\n## Keywords\n\n${projectName} ${projectKeywords.join(" ")}`);
}

runProject();