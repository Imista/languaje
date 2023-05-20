const variables = {};

function is_name(value) {
    return !!RegExp(/^[a-zA-Z][\w]*$/).exec(value);
}

function get_type(value) {
    if (RegExp(/^\d+$/).exec(value)) return "int";
    if (RegExp(/^\d+\.\d+$/).exec(value)) return "float";
    if (RegExp(/^\".*\"$/).exec(value)) return "string";
}

function validate_value(content) {
    const { name, value_type } = content;
    const type = variables[name];
    switch (value_type) {
        case "normal":
            const { value } = content;
            if (is_name(value)) {
                if (type != variables[value])
                    throw new Error(`${name} and ${value} don't match types.`);
            } else {
                if (type != get_type(value))
                    throw new Error(`${value} is not a ${type} value.`);
            }
            break;
        case "input":
            const { input_type } = content;
            if (type != input_type)
                throw new Error(`${name} is not a ${input_type} type.`);
            break;
        case "math":
            const { value_a, value_b, operator } = content;
            if (is_name(value_a)) {
                if (type != variables[value_a])
                    throw new Error(
                        `${name} and ${value_a} don't match types.`
                    );
            } else {
                if (type != get_type(value_a))
                    throw new Error(`${value_a} is not a ${type} value.`);
            }
            if (is_name(value_b)) {
                if (type != variables[value_b])
                    throw new Error(
                        `${name} and ${value_b} don't match types.`
                    );
            } else {
                if (type != get_type(value_b))
                    throw new Error(`${value_b} is not a ${type} value.`);
            }

            const type_operators = {
                int: /\+|-|\*|\\|%|\^/,
                float: /\+|-|\*|\/|\\|\^/,
                string: /\+/,
            };

            if (!operator.match(type_operators[type]))
                throw new Error(
                    `Invalid operator ${operator} to ${type} type.`
                );

            break;

        default:
            break;
    }
}

function validate_condition(content) {
    const { value_a, value_b, comparator } = content;
    let type_a, type_b;

    if (is_name(value_a)) type_a = variables[value_a];
    else type_a = get_type(value_a);

    if (is_name(value_b)) type_b = variables[value_b];
    else type_b = get_type(value_b);

    if (type_a != type_b)
        throw new Error(
            `Invalid comparation between ${value_a} and ${value_b} .`
        );

    const type_comparator = {
        int: /(==)|(!=)|(>)|(>=)|(<)|(<=)/,
        float: /(==)|(!=)|(>)|(>=)|(<)|(<=)/,
        string: /(==)|(!=)/,
    };

    if (!comparator.match(type_comparator[type_a]))
        throw new Error(`Invalid comparator ${comparator} to ${type_a} type.`);
}

function validate_semantical(sintactical) {
    for (const line of sintactical) {
        try {
            if (line.name == "for") {
                const { name, value_a, value_b } = line.content;
                if (!!variables[name])
                    throw new Error(`Variable ${name} already exists.`);

                variables[name] = "int";

                let type_a, type_b;

                if (is_name(value_a)) type_a = variables[value_a];
                else type_a = get_type(value_a);

                if (is_name(value_b)) type_b = variables[value_b];
                else type_b = get_type(value_b);

                if (type_a != "int" || type_b != "int")
                    throw new Error(
                        `Invalid range between ${value_a} and ${value_b} .`
                    );
            }
            if (line.name == "while") {
                validate_condition(line.content);
            }
            if (line.name == "if") {
                validate_condition(line.content);
            }
            if (line.name == "output") {
                const { value } = line.content;
                if (!is_name(value) && "string" != get_type(value))
                    throw new Error(`${value} is not a string value.`);
                if (is_name(value))
                    if (!variables[value])
                        throw new Error(`Variable ${value} not exists.`);
            }
            if (line.name == "asignation") {
                if (!variables[line.content.name])
                    throw new Error(
                        `Variable ${line.content.name} not exists.`
                    );

                validate_value(line.content);
            }
            if (line.name == "declaration") {
                const { name, type } = line.content;
                if (!!variables[name])
                    throw new Error(`Variable ${name} already exists.`);
                else variables[name] = type;

                validate_value(line.content);
            }
        } catch (error) {
            throw new Error(`Line ${line.index}: ${error.message}`);
        }
    }
    return sintactical;
}

module.exports = validate_semantical;
