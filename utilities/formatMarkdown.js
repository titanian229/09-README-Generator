exports.format = function (text, type) {
    if (text.indexOf('`') > -1){
        text = text.split('`').join('\n```\n')
    }


    if (typeof text !== "string") {
        return Error("Text was not entered into the function to format text.  Please enter text.");
    }
    if (type === "text") {
        return text;
    }
    if (type === "title") {
        return "\n# " + text + "\n";
    }
    if (type === "sectionTitle") {
        return "\n## " + text + "\n";
    }
    if (type === "list") {
        text = text.split(", ");
        let ret = "";
        text.forEach(function (item) {
            ret += "* " + item + "\n";
        });
        return ret;
    }
    if (type === "image") {
        return `![image](${text})` + "\n";
    }
    if (type === "link") {
        return `[link](${text})` + "\n";
    }
};
