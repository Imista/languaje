const path = require("path");
const { promises: fsPromises } = require("fs");
const validate_lexical = require("./validate_lexical");
const validate_sintactical = require("./validate_sintactical");
const validate_semantical = require("./validate_semantical");

async function validate_code(name) {
    try {
        const contents = await fsPromises.readFile(
            path.join(__dirname, `../docs/${name}`),
            "utf-8"
        );
        const arr = contents.split(/\r?\n/);
        const text = arr.map((x) => x.trim());

        const lexical = validate_lexical(text);
        const sintactical = validate_sintactical(lexical);
        const semantical = validate_semantical(sintactical);

        return semantical;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

module.exports = validate_code;
