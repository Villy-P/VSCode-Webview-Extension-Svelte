#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const term = require('terminal-kit').terminal;

const projectName = process.argv[2] || 'my-project';
const projectPath = path.resolve(projectName);

function checkEmptyDirectory() {
    if (fs.readdirSync(projectPath).length > 0) {
        term.yellow("WARNING: Directory is not empty. Continue? [Y|n] ");
        term.yesOrNo({ yes: ['y', 'ENTER'], no: ['n'] }, function (_error, result) {
            if (result) {
                term("\n");
                runProject();
            } else {
                term.red("Exiting...\n");
                process.exit();
            }
        });
    }
}

function runProject() {
    if (!process.argv[2])
        term.yellow("WARNING: No project name provided. Using 'my-project' as project name.\n");
    
    if (!fs.existsSync(projectPath))
        fs.mkdirSync(projectPath);

    checkEmptyDirectory();
}

runProject();
