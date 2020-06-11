const inquirer = require("inquirer");
const chalk = require("chalk");
const fm = require("./utilities/formatMarkdown");
const fs = require("fs");

function validateString(str) {
    // Checks input is a string
    return typeof str === "string";
}

function processList(str) {
    //turns a list into an array
}

// function appendFile()

const questions = [
    {
        type: "input",
        name: "projectTitle",
        message: "What is the name of your repository? : ",
        validate: validateString,
        markdownFormat: "title",
        sectionTitle: "",
    },
    {
        type: "input",
        name: "projectDescription",
        message:
            "Describe your project and introduce it. What was your motivation for making the project? What is the purpose of your project?\n",
        validate: validateString,
        markdownFormat: "text",
        sectionTitle: "",
    },
    {
        type: "input",
        name: "liveURL",
        message: "If your project is live on the internet anywhere, what is the URL? : ",
        validate: validateString,
        markdownFormat: "link",
        sectionTitle: "",
    },
    {
        type: "input",
        name: "screenshotURL",
        message:
            "Is there a screenshot you'd like included in your description?  Include the relative link : ",
        validate: validateString,
        markdownFormat: "image",
        sectionTitle: "",
    },
    {
        type: "input",
        name: "userIcon",
        message: "Please enter a link to your GitHub user icon : ",
        validate: validateString,
        markdownFormat: "image",
        sectionTitle: "",
    },
    {
        type: "input",
        name: "userEmail",
        message: "Please provide your email address used on GitHub : ",
        validate: validateString,
        markdownFormat: "text",
        sectionTitle: "",
    },
    {
        type: "input",
        name: "userTwitter",
        message: "What is your twitter handle? : ",
        validate: validateString,
        markdownFormat: "text",
        sectionTitle: "",
    },
    {
        type: "input",
        name: "languagesUsed",
        message: "List the languages your project utilizes (separated by commas).\n",
        validate: validateString,
        markdownFormat: "list",
        sectionTitle: "Languages Used",
    },
    {
        type: "input",
        name: "technologiesUsed",
        message:
            "List the technologies your project used, including APIs, external libraries (separated by commas)\n",
        validate: validateString,
        markdownFormat: "list",
        sectionTitle: "Technologies, APIs, External Libaries",
    },
    {
        type: "input",
        name: "installationInstructions",
        message:
            "How is your project installed?  Provide code examples enclosed with the ` character.\n",
        validate: validateString,
        markdownFormat: "text",
        sectionTitle: "Installation Instructions",
    },
    {
        type: "input",
        name: "usageInstructions",
        message:
            "How is your project used, provide examples.  Enclose code with the ` character.\n",
        validate: validateString,
        markdownFormat: "text",
        sectionTitle: "Usage",
    },
    {
        type: "input",
        name: "optionalLicense",
        message:
            "What license does your project use?  See https://choosealicense.com/ for options.  For no license, leave the field blank. : ",
        validate: validateString,
        markdownFormat: "text",
        sectionTitle: "License",
    },
    {
        type: "input",
        name: "contributingInfo",
        message: "How can other developers contribute to your project?\n",
        validate: validateString,
        markdownFormat: "text",
        sectionTitle: "Contributing",
    },
    {
        type: "input",
        name: "tests",
        message: "Provide examples of tests, enclose code with ` character\n",
        validate: validateString,
        markdownFormat: "text",
        sectionTitle: "Tests",
    },

    // {
    //     type: 'input',
    //     name: ,
    //     message: ,
    //     validate: validateString,
    // },
];

const questionKeys = {
    projectTitle: "title",
    projectDescription: "text",
    languagesUsed: "list",
    technologiesUsed: "list",
};

// inquirer.prompt(questions).then((answers) => {
//     console.log(answers);
// });

const answers = {
    projectTitle: "09-README-Generator",
    projectDescription:
        "This is a simple Node.js application for generator descriptive readmes properly formatted in markdown.  It was created to simplify the process of generating descriptive readmes for projects, and to increase the quality of readmes generated.",
    liveURL: "",
    screenshotURL: "",
    languagesUsed: "Javascript",
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
    userTwitter: "",
    GHUsername: "titanian229",
};

let tempFC = "";

let GHUsername = answers.GHUsername;
let repoName = answers.projectTitle;

questions.forEach(function (q) {
    let answer = answers[q.name];
    // console.log(q, fm.format(answer, q.markdownFormat));

    if (answer != "") {
        if (q.sectionTitle != "") {
            tempFC += fm.format(q.sectionTitle, "sectionTitle");
        }
        tempFC += "\n" + fm.format(answer, q.markdownFormat) + "\n";
        if (q.name === "optionalLicense" && GHUsername != "") {
            tempFC += `[![GitHub license](https://img.shields.io/github/license/${GHUsername}/StrapDown.js.svg)](https://github.com/${GHUsername}/StrapDown.js/blob/master/LICENSE)`;
        }
    }
});

const readmeFile = "./README.md";

// //Emptying file of contents and writing the new ones
fs.writeFileSync(readmeFile, tempFC);
