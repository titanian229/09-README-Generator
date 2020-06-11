const inquirer = require("inquirer");
const chalk = require("chalk");
const formatMarkdown = require("./utilities/formatMarkdown");

function validateString(str) {
    // Checks input is a string
    return typeof str === "string";
}

function processList(str) {
    //turns a list into an array
}

const questions = [
    {
        type: "input",
        name: "projectTitle",
        message: "What is the name of your repository? : ",
        validate: validateString,
    },
    {
        type: "input",
        name: "projectDescription",
        message:
            "Describe your project and introduce it. What was your motivation for making the project? What is the purpose of your project?\n",
        validate: validateString,
    },
    {
        type: "input",
        name: "languagesUsed",
        message: "List the languages your project utilizes (separated by commas).\n",
        validate: validateString,
    },
    {
        type: "input",
        name: "technologiesUsed",
        message:
            "List the technologies your project used, including APIs, external libraries (separated by commas)\n",
        validate: validateString,
    },
    {
        type: "input",
        name: "installationInstructions",
        message:
            "How is your project installed?  Provide code examples enclosed with the ` character.\n",
        validate: validateString,
    },
    {
        type: "input",
        name: "usageInstructions",
        message:
            "How is your project used, provide examples.  Enclose code with the ` character.\n",
        validate: validateString,
    },
    {
        type: "input",
        name: "optionalLicense",
        message:
            "What license does your project use?  See https://choosealicense.com/ for options.  For no license, leave the field blank. : ",
        validate: validateString,
    },
    {
        type: "input",
        name: "contributingInfo",
        message: "How can other developers contribute to your project?\n",
        validate: validateString,
    },
    {
        type: "input",
        name: "tests",
        message: "Provide examples of tests, enclose code with ` character\n",
        validate: validateString,
    },
    {
        type: "input",
        name: "userIcon",
        message: "Please enter a link to your GitHub user icon : ",
        validate: validateString,
    },
    {
        type: "input",
        name: "userEmail",
        message: "Please provide your email address used on GitHub : ",
        validate: validateString,
    },
    // {
    //     type: 'input',
    //     name: ,
    //     message: ,
    //     validate: validateString,
    // },
];

// inquirer.prompt(questions).then((answers) => {
//     console.log(answers);
// });

const dummyData = {
    projectTitle: "README-Generator",
    projectDescription:
        "This is a simple Node.js application for generator descriptive readmes properly formatted in markdown.  It was created to simplify the process of generating descriptive readmes for projects, and to increase the quality of readmes generated.",
    languagesUsed: "javascript",
    technologiesUsed: "Node.js, inquirer, chalk",
    installationInstructions: "",
    usageInstructions:
        "To use this application, run `node index.js` A series of prompts will be generated, answer each as fully as possible.  If a list is required, enter comma separated values.  If you don't wish to answer a question leave it blank.",
    optionalLicense: "",
    contributingInfo: "",
    tests: "",
    userIcon:
        "https://avatars0.githubusercontent.com/u/48775473?s=460&u=2130e97623abb5b698c95a9b8de38f8bb767b1a2&v=4",
    userEmail: "james@jamestlee.ca",
};

const readmeFile = "./README.md";
console.log(formatMarkdown.format('testtitle', 'title'))