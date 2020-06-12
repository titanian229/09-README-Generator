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

const questions = [
    {
        type: "input",
        name: "userName",
        message: "What is your name?\n",
        validate: requireInput,
        markdownFormat: "",
        sectionTitle: "",
    },
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
        markdownFormat: "",
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
        sectionTitle: "Technologies, APIs, External Libraries",
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
];

async function mainApp() {
    const answers = await inquirer.prompt(questions);


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
        sectionsList[0] += `\n\n[![GitHub license](https://img.shields.io/github/license/${GHUsername}/${reponame}.svg)](https://github.com/${GHUsername}/${reponame}/blob/master/LICENSE)\n`;
    }

    if (answers.optionalDownloadsBadge) {
        sectionsList[0] += `[![Github all releases](https://img.shields.io/github/downloads/${GHUsername}/${reponame}/total.svg)](https://GitHub.com/${GHUsername}/${reponame}/releases/)`;
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
    sectionsList.push(`Created by ${answers.userName} (${GHUsername})`);
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
    if (contentsList.length > 3 || sectionsList.join("").length > 300) {
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
}

mainApp();
