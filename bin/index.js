#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const term = require('terminal-kit').terminal;

const projectName = process.argv[2] || 'my-project';
const projectPath = path.resolve(projectName);

function promptYesOrNo(question) {
    return new Promise((resolve) => {
        term.yellow(question);
        term.yesOrNo({ yes: ['y', 'ENTER'], no: ['n'] }, function (error, result) {
            resolve(result);
        });
    });
}

async function checkEmptyDirectory() {
    return new Promise(async (resolve) => {
        if (fs.readdirSync(projectPath).length > 0) {
            const shouldContinue = await promptYesOrNo("WARNING: Directory is not empty. Continue? [Y|n] ");
            if (shouldContinue) {
                term("\n");
                resolve();
            } else {
                term.red("Exiting...\n");
                process.exit();
            }
        }
    });
}

async function runProject() {
    if (!process.argv[2])
        term.yellow("WARNING: No project name provided. Using 'my-project' as project name.\n");
    
    if (!fs.existsSync(projectPath))
        fs.mkdirSync(projectPath);

    await checkEmptyDirectory();

    console.log("FINISHED");
    process.exit();
}

runProject();
