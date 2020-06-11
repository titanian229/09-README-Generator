exports.format = function (text, type) {
    if (typeof text !== "string") {
        return Error("Text was not entered into the function to format text.  Please enter text.");
    }
    if (type === "title") {
        return "\n# " + text + "\n";
    }
};
