#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
// const term = require('terminal-kit').terminal;

// const projectName = process.argv[2] || 'my-project';
// const projectPath = path.resolve(projectName);
// let projectDescription = '';
// let projectDisplayName = '';

// function promptYesOrNo(question) {
//     return new Promise((resolve) => {
//         term.yellow(question);
//         term.yesOrNo({ yes: ['y', 'ENTER'], no: ['n'] }, function (error, result) {
//             resolve(result);
//         });
//     });
// }

// async function checkEmptyDirectory() {
//     return new Promise(async (resolve) => {
//         if (fs.readdirSync(projectPath).length > 0) {
//             const shouldContinue = await promptYesOrNo("WARNING: Directory is not empty. Continue? [Y|n] ");
//             if (shouldContinue) {
//                 term("\n");
//                 resolve();
//             } else {
//                 term.red("Exiting...\n");
//                 process.exit();
//             }
//         } else {
//             resolve();
//         }
//     });
// }

// async function getProjectMetadata() {
//     term.green("\nFirst, let's set up some metadata for your project.\n\n");
//     return new Promise(async (resolve) => {
//         term.blue("Enter a description: ");
//         projectDescription = await term.inputField({}).promise;
//         term.blue("\nEnter a display name: ");
//         projectDisplayName = await term.inputField({}).promise;
//         resolve();
//     });
// }

// async function runProject() {
//     if (!process.argv[2])
//         term.yellow("WARNING: No project name provided. Using 'my-project' as project name.\n");
    
//     if (!fs.existsSync(projectPath))
//         fs.mkdirSync(projectPath);

//     await checkEmptyDirectory();
//     await getProjectMetadata();

//     console.log("FINISHED");
//     process.exit();
// }

// runProject();
