const conversion = require("./conversion");
const validate_code = require("./validate");

async function run() {
    const clean_code = await validate_code("easy.txt");
    if (clean_code) conversion(clean_code);
}
run();
