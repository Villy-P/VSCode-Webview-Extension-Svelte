#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const term = require('terminal-kit').terminal;

const projectName = process.argv[2] || 'my-project';
const projectPath = path.resolve(projectName);

if (!process.argv[2])
    term.yellow("WARNING: No project name provided. Using 'my-project' as project name.\n");

console.log(projectName, projectPath);