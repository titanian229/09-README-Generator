const inquirer = require("inquirer");
const chalk = require("chalk");
const fm = require("./utilities/formatMarkdown");
const fs = require("fs");

function validateString(str) {
    // Checks input is a string
    return typeof str === "string";
}

function requireInput(str) {
    return str == "" ? false : true;
}

// function appendFile()

const questions = [
    {
        type: "input",
        name: "GHUsername",
        message: "What is your GitHub username?  Required\n",
        validate: requireInput,
        markdownFormat: "",
        sectionTitle: "",
    },
    {
        type: "input",
        name: "reponame",
        message: "What is the name of your repository?\n",
        validate: requireInput,
        markdownFormat: "",
        sectionTitle: "",
    },
    {
        type: "input",
        name: "projectTitle",
        message: "What is the title of your project? : ",
        validate: validateString,
        markdownFormat: "",
        sectionTitle: "",
    },
    {
        type: "input",
        name: "projectDescription",
        message:
            "Describe your project and introduce it. What was your motivation for making the project? What is the purpose of your project?\n",
        validate: requireInput,
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
        markdownFormat: "",
        sectionTitle: "",
    },
    {
        type: "input",
        name: "userEmail",
        message: "Please provide your email address used on GitHub : ",
        validate: validateString,
        markdownFormat: "",
        sectionTitle: "",
    },
    {
        type: "input",
        name: "userTwitter",
        message: "What is your twitter handle? : ",
        validate: validateString,
        markdownFormat: "",
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
        type: "confirm",
        name: "optionalLicense",
        message: "Do you want a license badge on your repo?",
        markdownFormat: "",
        sectionTitle: "",
    },
    {
        type: "confirm",
        name: "optionalDownloadsBadge",
        message: "Do you want to add a downloads badge?",
        markdownFormat: "",
        sectionTitle: "",
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

async function mainApp() {
    // const answers = await inquirer.prompt(questions);

    const answers = {
        GHUsername: "titanian229",
        reponame: "09-README-Generator",
        projectTitle: "README-Generator",
        projectDescription:
            "This is a simple Node.js application for generator descriptive readmes properly formatted in markdown.  It was created to simplify the process of generating descriptive readmes for projects, and to increase the quality of readmes generated.",
        liveURL: "",
        screenshotURL: "",
        languagesUsed: "Javascript",
        technologiesUsed: "Node.js, inquirer, chalk",
        installationInstructions: "",
        usageInstructions:
            "To use this application, run `node index.js` A series of prompts will be generated, answer each as fully as possible.  If a list is required, enter comma separated values.  If you don't wish to answer a question leave it blank.",
        optionalLicense: true,
        contributingInfo: "",
        tests: "",
        userIcon:
            "https://avatars0.githubusercontent.com/u/48775473?s=460&u=2130e97623abb5b698c95a9b8de38f8bb767b1a2&v=4",
        userEmail: "james@jamestlee.ca",
        userTwitter: "",
        optionalDownloadsBadge: true,
    };

    //creating a list composed of the sections
    sectionsList = [];
    contentsList = [];

    //important information required, username and repo name
    let GHUsername = answers.GHUsername;
    let reponame = answers.reponame;

    //First generating a header
    sectionsList.push(
        `${fm.format(
            answers.projectTitle != "" ? answers.projectTitle : answers.reponame,
            "title"
        )}\n${answers.projectDescription}`
    );

    //Adding badges
    if (answers.optionalLicense) {
        sectionsList[1] += `\n\n[![GitHub license](https://img.shields.io/github/license/${GHUsername}/${reponame}.svg)](https://github.com/${GHUsername}/${reponame}/blob/master/LICENSE)\n`;
    }
    if (answers.optionalDownloadsBadge) {
        sectionsList[1] += ` [![Github all releases](https://img.shields.io/github/downloads/${GHUsername}/${reponame}/total.svg)](https://GitHub.com/${GHUsername}/${reponame}/releases/)`;
    }

    questions.forEach(function (q) {
        let answer = answers[q.name];

        if (answer != "" && q.markdownFormat != "") {
            if (q.sectionTitle != "") {
                sectionsList.push(fm.format(q.sectionTitle, "sectionTitle"));
                contentsList.push(q.sectionTitle);
            }
            sectionsList.push("\n" + fm.format(answer, q.markdownFormat) + "\n");
        }
    });

    //Adding footer
    sectionsList.push("\n" + fm.format("Author", "sectionTitle") + "\n");
    sectionsList.push("Created by " + GHUsername);
    if (answers.userIcon) {
        sectionsList.push("\n" + fm.format(answers.userIcon, "icon"));
    }
    if (answers.userEmail) {
        sectionsList.push("\n" + answers.userEmail + "\n");
    }
    if (answers.userTwitter) {
        sectionsList.push("\n" + answers.userTwitter + "\n");
    }

    //Adding table of content if over certain length
    if (sectionsList.join().length > 300) {
        contentsList = contentsList.map(function (item) {
            return fm.format(item, "contentsItem");
        });
        contentsList.unshift(fm.format("Table of Contents", "sectionTitle"));
        contentsList.push("\n\n");
        sectionsList.splice(2, 0, contentsList.join("\n\n"));
    }

    const readmeFile = "./README.md";

    // Emptying file of contents and writing the new ones
    fs.writeFileSync(readmeFile, sectionsList.join(""));

    // sectionsList.forEach(function(i){console.log(i)})
}

mainApp();
