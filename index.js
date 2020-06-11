const inquirer = require("inquirer");
const chalk = require("chalk");

function validateString(str) {
    // Checks input is a string
    return typeof str === "string";
}

const questions = [
    {
        type: "input",
        name: "projectTitle",
        message: "What is the name of your repository?",
        validate: validateString,
    },
    {
        type: 'input',
        name: 'projectDescription',
        message: "Describe your project and introduce it. What was your motivation for making the project? What is the purpose of your project?",
        validate: validateString,
    },
    {
        type: 'input',
        name: 'languagesUsed',
        message: "List the languages your project utilizes.",
        validate: validateString,
    },
    {
        type: 'input',
        name: "technologiesUsed",
        message: "List the technologies your project used, including APIs, external libraries",
        validate: validateString,
    },
    {
        type: 'input',
        name: "installationInstructions",
        message: "How is your project installed?  Provide code examples enclosed with the ` character.",
        validate: validateString,
    },
    {
        type: 'input',
        name: 'usageInstructions',
        message: "How is your project used, provide examples.  Enclose code with the ` character.",
        validate: validateString,
    },
    {
        type: 'input',
        name: "optionalLicense",
        message: "What license does your project use?  See https://choosealicense.com/ for options.  For no license, enter 'none'",
        validate: validateString,
    },
    {
        type: 'input',
        name: "contributingInfo",
        message: "How can other developers contribute to your project?",
        validate: validateString,
    },
    {
        type: 'input',
        name: "tests",
        message: "Provide examples of tests, enclose code with ` character",
        validate: validateString,
    },
    {
        type: 'input',
        name: "userIcon",
        message: "Please enter a link to your GitHub user icon",
        validate: validateString,
    },
    {
        type: 'input',
        name: "userEmail",
        message: "Please provide your email address used on GitHub",
        validate: validateString,
    },
    // {
    //     type: 'input',
    //     name: ,
    //     message: ,
    //     validate: validateString,
    // },
];

inquirer.prompt(questions).then(answers => {console.log(answers)})
