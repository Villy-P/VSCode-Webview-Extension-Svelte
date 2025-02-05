#!/usr/bin/env node

import { existsSync, mkdirSync, readdirSync } from 'fs';
import { resolve } from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { confirm, input } from '@inquirer/prompts';

let projectRelativePath = process.argv[2];
let projectPath = '';
let projectName = '';
let projectDescription = '';
let projectDisplayName = '';

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
}

runProject();