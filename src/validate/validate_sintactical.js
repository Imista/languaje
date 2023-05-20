const TYPE = "(?<input_type>[\\w]+)";

const VALUE = '(?<value>-?[\\w\\." :]+)';
const SPACE = " *";
const OPBLOCK = "(?<open>\\(?)";
const CLBLOCK = "(?<close>\\)?)";
const NAME_ID = /^[a-zA-Z][\w]*$/;
const NUMBER_ID = /^\d+(\.\d+)?$/;
const TEXT_ID = /^\".*\"$/;

const INPUT =
    "^input" +
    SPACE +
    OPBLOCK +
    TYPE +
    SPACE +
    "(," +
    SPACE +
    VALUE +
    ")?" +
    SPACE +
    CLBLOCK +
    "$";

// let if_keys = 0;
// let for_keys = 0;
// let while_keys = 0;

function validate_condition(condition) {
    const value_id = '[\\w" \\.]+';
    const comparator_id = "==|!=|>|>=|<|<=";
    const condition_id = `^(?<value_a>${value_id}) *(?<comparator>${comparator_id}) *(?<value_b>${value_id})$`;

    const match = RegExp(condition_id).exec(condition);

    if (!match) throw new Error(`${condition} is invalid condition`);

    let { value_a, value_b, comparator } = match.groups;
    value_a = value_a.trim();
    value_b = value_b.trim();

    if (!validate_id(value_a, NAME_ID, NUMBER_ID))
        throw new Error(`${value_a} is invalid value comparation statement.`);
    if (!validate_id(value_b, NAME_ID, NUMBER_ID))
        throw new Error(`${value_b} is invalid value comparation statement.`);

    return {
        value_a,
        value_b,
        comparator,
    };
}

function validate_id(value, ...ids) {
    return ids.some((id) => RegExp(id).exec(value));
}

function validate_asignation(name, content) {
    if (!validate_id(name, NAME_ID))
        throw new Error(`${name} is invalid name.`);

    content = content.trim();

    const INPUT_ID =
        /^input *(?<open>\(?)(?<input_type>[\w]+) *(, *(?<value>-?[\w\." :]+)) *(?<close>\)?)$/;
    const MATH_ID =
        /(?<value_a>([a-zA-Z][\w]*)|(\d+(.\d+)?)) *(?<operator>\+|-|\*|\/|\\|%|\^) *(?<value_b>([a-zA-Z][\w]*)|(\d+(.\d+)?))/;

    if (!validate_id(content, NAME_ID, TEXT_ID, NUMBER_ID, INPUT_ID, MATH_ID))
        throw new Error(`${content} is a invalid value.`);

    const input_match = RegExp(INPUT_ID).exec(content);
    if (input_match) {
        const { open, close, value, input_type } = input_match.groups;
        if (!(open && close))
            throw new Error(
                `${!open ? "(" : ")"} is missing at input statement.`
            );

        if (!validate_id(value, TEXT_ID, NAME_ID))
            throw new Error(`${content} is a invalid input value.`);

        const types = ["string", "int", "float"];
        if (!types.some((tp) => tp == input_type))
            throw new Error(`${input_type} type no exits.`);

        return {
            value_type: "input",
            input_type,
            value,
        };
    }

    const math_match = RegExp(MATH_ID).exec(content);
    if (math_match) {
        let { value_a, value_b, operator } = math_match.groups;
        value_a = value_a.trim();
        value_b = value_b.trim();

        if (!validate_id(value_a, NAME_ID, NUMBER_ID))
            throw new Error(`${value_a} is invalid value for operation.`);
        if (!validate_id(value_b, NAME_ID, NUMBER_ID))
            throw new Error(`${value_b} is invalid value for operation.`);

        return {
            value_type: "math",
            value_a,
            value_b,
            operator,
        };
    }

    return {
        value_type: "normal",
        value: content,
    };
}

function validate_sintactical(lexical) {
    for (const line of lexical) {
        try {
            if (line.name == "asignation") {
                const { name, content } = line.content;

                const data = validate_asignation(name, content);
                line.content = {
                    name,
                    ...data,
                };
            }
            if (line.name == "declaration") {
                const { type, name, content } = line.content;

                const types = ["string", "int", "float"];
                if (!types.some((tp) => tp == type))
                    throw new Error(`${type} type no exits.`);

                const data = validate_asignation(name, content);
                line.content = {
                    type,
                    name,
                    ...data,
                };
            }
            if (line.name == "for") {
                const { name, content: range } = line.content;

                const NAME_ID = /^[a-zA-Z][\w]*$/;

                if (!RegExp(NAME_ID).exec(name))
                    throw new Error(
                        `${name} is invalid name for for statement.`
                    );

                const range_id = `^(?<value_a>[\\w]+)${SPACE},${SPACE}(?<value_b>[\\w]+)$`;
                const range_match = RegExp(range_id).exec(range);

                if (!range_match)
                    throw new Error(
                        `${range} is invalid range for for statement.`
                    );

                const { value_a, value_b } = range_match.groups;
                if (!validate_id(value_a, /^\d+$/, NAME_ID))
                    throw new Error(
                        `${value_a} is invalid value for output statement.`
                    );
                if (!validate_id(value_b, /^\d+$/, NAME_ID))
                    throw new Error(
                        `${value_b} is invalid value for output statement.`
                    );

                delete line.content.content;
                line.content.value_a = value_a;
                line.content.value_b = value_b;
            }
            if (line.name == "if") {
                const { content: condition } = line.content;
                const data = validate_condition(condition);
                line.content = data;
            }
            if (line.name == "while") {
                const { content: condition } = line.content;
                const data = validate_condition(condition);
                line.content = data;
            }
            if (line.name == "output") {
                const { open, close, value } = line.content;
                if (!(open && close))
                    throw new Error(
                        `${!open ? "(" : ")"} is missing at output statement.`
                    );

                if (!validate_id(value, NAME_ID, TEXT_ID))
                    throw new Error(
                        `${value} is invalid value for output statement.`
                    );
            }
        } catch (error) {
            throw new Error(`Line ${line.index}: ${error.message}`);
        }
    }
    return lexical;
}

module.exports = validate_sintactical;
