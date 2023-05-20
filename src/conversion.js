const fs = require("fs");

const declarations = [];
const codes = [];
let messages = 1;
let jump_if = 0;
let end_if = [];
let jump_for = 0;
let jump_while = 0;
let end_while = [];

function is_name(value) {
    return !!RegExp(/^[a-zA-Z][\w]*$/).exec(value);
}

function asignation(content) {
    const { name, value_type } = content;
    switch (value_type) {
        case "normal":
            //corregir
            codes.push(";Asignation");
            const { value } = content;
            codes.push(`Mov dx, offset ${name}+2`);
            codes.push(`MOV si, dx`);
            codes.push(`MOV [si], ${value}`);
            codes.push(`add [si], 30h`);
            break;
        case "input":
            codes.push(";Input");

            const { value: msg, input_type } = content;

            declarations.push(`MSG_${messages} DB ${msg}, 10, 13, "$"`);
            codes.push(`MOV AH, 09h`);
            codes.push(`MOV Dx, OFFSET MSG_${messages}`);
            codes.push(`INT 21H`);

            messages++;

            // console.log(msg);
            // console.log(variable);

            //Leer input
            codes.push(`MOV AH, 0AH`);
            codes.push(`MOV DX, offset ${name}`);
            codes.push(`INT 21h`);

            codes.push(`MOV AH, 09h`);
            codes.push(`MOV Dx, OFFSET MSG_0`);
            codes.push(`INT 21H`);
            break;
        case "math":
            codes.push(";Operation");

            const { value_a, value_b, operator } = content;
            switch (operator) {
                case "+": //Codificar suma
                    codes.push("push ax");
                    codes.push("push bx");
                    if (is_name(value_a)) {
                        codes.push("mov si, offset " + value_a + " + 2");
                        codes.push("mov ah, [si]");
                    } else {
                        codes.push(`mov ah, ${value_a}`);
                        codes.push(`add ah, 30h`);
                    }
                    if (is_name(value_b)) {
                        codes.push("mov si, offset " + value_b + " + 2");
                        codes.push("mov bh, [si]");
                    } else {
                        codes.push(`mov bh, ${value_b}`);
                        codes.push(`add bh, 30h`);
                    }
                    codes.push("add ah, bh");
                    codes.push("sub ah, 30h");
                    codes.push("mov si, offset " + name + " + 2");
                    codes.push("mov [si], ah");
                    codes.push("pop bx");
                    codes.push("pop ax");
                    break;
                case "-":
                    codes.push("push ax");
                    codes.push("push bx");
                    if (is_name(value_a)) {
                        codes.push("mov si, offset " + value_a + " + 2");
                        codes.push("mov ah, [si]");
                    } else {
                        codes.push(`mov ah, ${value_a}`);
                        codes.push(`add ah, 30h`);
                    }
                    if (is_name(value_b)) {
                        codes.push("mov si, offset " + value_b + " + 2");
                        codes.push("mov bh, [si]");
                    } else {
                        codes.push(`mov bh, ${value_b}`);
                        codes.push(`add bh, 30h`);
                    }
                    codes.push("sub ah, bh");
                    codes.push("add ah, 30h");
                    codes.push("mov si, offset " + name + " + 2");
                    codes.push("mov [si], ah");
                    codes.push("pop bx");
                    codes.push("pop ax");
                    break;
                case "*":
                    codes.push("push ax");
                    codes.push("push bx");
                    if (is_name(value_a)) {
                        codes.push("mov si, offset " + value_a + " + 2");
                        codes.push("mov al, [si]");
                        codes.push("sub al, 30h");
                    } else {
                        codes.push(`mov al, ${value_a}`);
                    }
                    if (is_name(value_b)) {
                        codes.push("mov si, offset " + value_b + " + 2");
                        codes.push("mov bh, [si]");
                        codes.push("sub bh, 30h");
                    } else {
                        codes.push(`mov bh, ${value_b}`);
                    }
                    codes.push("mul bh");
                    codes.push("mov si, offset " + name + " + 2");
                    codes.push("mov [si], al");
                    codes.push("add [si], 30h");
                    codes.push("pop bx");
                    codes.push("pop ax");
                    // codes.push("push ax");
                    // codes.push("push bx");
                    // codes.push("mov si, offset " + value_a + " + 2");
                    // codes.push("mov al, [si]");
                    // codes.push("sub al, 30h");
                    // codes.push("mov si, offset " + value_b + " + 2");
                    // codes.push("mov bh, [si]");
                    // codes.push("sub bh, 30h");
                    // codes.push("mul bh");
                    // codes.push("mov si, offset " + name + " + 2");
                    // codes.push("mov [si], al");
                    // codes.push("add [si], 30h");
                    // codes.push("pop bx");
                    // codes.push("pop ax");
                    break;
                case "\\":
                    codes.push("push ax");
                    codes.push("push bx");
                    codes.push("xor ax, ax");
                    // codes.push("mov si, offset " + value_a + " + 2");
                    // codes.push("mov al, [si]");
                    // codes.push("sub al, 30h");
                    // codes.push("mov si, offset " + value_b + " + 2");
                    // codes.push("mov bh, [si]");
                    // codes.push("sub bh, 30h");

                    if (is_name(value_a)) {
                        codes.push("mov si, offset " + value_a + " + 2");
                        codes.push("mov al, [si]");
                        codes.push("sub al, 30h");
                    } else {
                        codes.push(`mov al, ${value_a}`);
                    }
                    if (is_name(value_b)) {
                        codes.push("mov si, offset " + value_b + " + 2");
                        codes.push("mov bh, [si]");
                        codes.push("sub bh, 30h");
                    } else {
                        codes.push(`mov bh, ${value_b}`);
                    }
                    codes.push("div bh");
                    codes.push("mov si, offset " + name + " + 2");
                    codes.push("mov [si], al");
                    codes.push("add [si], 30h");
                    codes.push("pop bx");
                    codes.push("pop ax");
                    break;
                case "%":
                    codes.push("push ax");
                    codes.push("push bx");
                    codes.push("xor ax, ax");
                    // codes.push("mov si, offset " + value_a + " + 2");
                    // codes.push("mov al, [si]");
                    // codes.push("sub al, 30h");
                    // codes.push("mov si, offset " + value_b + " + 2");
                    // codes.push("mov bh, [si]");
                    // codes.push("sub bh, 30h");

                    if (is_name(value_a)) {
                        codes.push("mov si, offset " + value_a + " + 2");
                        codes.push("mov al, [si]");
                        codes.push("sub al, 30h");
                    } else {
                        codes.push(`mov al, ${value_a}`);
                    }
                    if (is_name(value_b)) {
                        codes.push("mov si, offset " + value_b + " + 2");
                        codes.push("mov bh, [si]");
                        codes.push("sub bh, 30h");
                    } else {
                        codes.push(`mov bh, ${value_b}`);
                    }
                    codes.push("div bh");
                    codes.push("mov si, offset " + name + " + 2");
                    codes.push("mov [si], ah");
                    codes.push("add [si], 30h");
                    codes.push("pop bx");
                    codes.push("pop ax");
                    break;

                default:
                    break;
            }
            break;

        default:
            break;
    }
}

function conversion(code) {
    for (const line of code) {
        if (line.name == "close_if") {
            codes.push(";close_if");
            codes.push(`salto_${end_if.pop()}:`);
        }
        if (line.name == "close_for") {
            codes.push(";close_for");
            codes.push(`Loop fsalto_${jump_for}`);
            jump_for++;
        }
        if (line.name == "close_while") {
            codes.push(";close_while");
            const j = end_while.pop();
            console.log("end", j);
            codes.push(`jmp wsalto_${j - 1}`);
            codes.push(`wsalto_${j}:`);
        }
        if (line.name == "for") {
            codes.push(";for");
            const { name, value_a, value_b } = line.content;
            declarations.push(`${name} DB 5, ?, 5 DUP (24H)`);

            codes.push(`xor Cx, Cx`);
            codes.push(`mov si, offset ${value_b}+2`);
            codes.push(`MOV CL, BYTE PTR [SI]`);
            codes.push(`SUB cx, 30h`);
            codes.push(`MOV Si, offset ${name}+2`);
            codes.push(`mov byte ptr [si], ${value_a}`);
            codes.push(`sub cx, 30h`);
            codes.push(`fsalto_${jump_for}:`);
        }
        if (line.name == "while") {
            codes.push(";while");
            const { value_a, value_b, comparator } = line.content;

            codes.push(`wsalto_${jump_while}:`);
            console.log("start", jump_while);
            jump_while++;
            end_while.push(jump_while);
            if (is_name(value_a)) {
                codes.push("mov si, offset " + value_a + " + 2");
                codes.push("mov ah, 0");
                codes.push("mov al, byte ptr [si]");
            } else {
                codes.push("mov ah, 0");
                codes.push(`mov al, ${value_a}`);
                codes.push(`add al, 30h`);
            }
            if (is_name(value_b)) {
                codes.push("mov di, offset " + value_b + " + 2");
                codes.push("mov bh, 0");
                codes.push("mov Bl, byte ptr [di]");
            } else {
                codes.push("mov bh, 0");
                codes.push(`mov bl, ${value_b}`);
                codes.push(`add bl, 30h`);
            }
            codes.push("cmp al, bl");

            console.log(comparator);
            switch (comparator) {
                case ">":
                    codes.push(`jna wsalto_${jump_while}`);
                    break;
                case "<":
                    codes.push(`jnb wsalto_${jump_while}`);
                    break;
                case "==":
                    codes.push(`jne wsalto_${jump_while}`);
                    break;
                case ">=":
                    codes.push(`jnae wsalto_${jump_while}`);
                    break;
                case "<=":
                    codes.push(`jnbe wsalto_${jump_while}`);
                    break;
                case "!=":
                    codes.push(`je wsalto_${jump_while}`);
                    break;

                default:
                    break;
            }
            jump_while++;
        }
        if (line.name == "if") {
            codes.push(";if");
            const { value_a, value_b, comparator } = line.content;

            if (is_name(value_a)) {
                codes.push("mov si, offset " + value_a + " + 2");
                codes.push("mov ah, 0");
                codes.push("mov al, byte ptr [si]");
            } else {
                codes.push("mov ah, 0");
                codes.push(`mov al, ${value_a}`);
                codes.push(`add al, 30h`);
            }
            if (is_name(value_b)) {
                codes.push("mov di, offset " + value_b + " + 2");
                codes.push("mov bh, 0");
                codes.push("mov Bl, byte ptr [di]");
            } else {
                codes.push("mov bh, 0");
                codes.push(`mov bl, ${value_b}`);
                codes.push(`add bl, 30h`);
            }
            codes.push("cmp al, bl");

            console.log(comparator);
            switch (comparator) {
                case ">":
                    codes.push(`jna salto_${jump_if}`);
                    break;
                case "<":
                    codes.push(`jnb salto_${jump_if}`);
                    break;
                case "==":
                    codes.push(`jne salto_${jump_if}`);
                    break;
                case ">=":
                    codes.push(`jnae salto_${jump_if}`);
                    break;
                case "<=":
                    codes.push(`jnbe salto_${jump_if}`);
                    break;
                case "!=":
                    console.log(`je salto_${jump_if}`);
                    codes.push(`je salto_${jump_if}`);
                    break;

                default:
                    break;
            }
            // codes.push(`jna salto_${jump_if}`);
            end_if.push(jump_if);
            jump_if++;
        }
        if (line.name == "output") {
            const { value } = line.content;

            codes.push(";Output");
            codes.push(`MOV AH, 09h`);
            codes.push(`MOV Dx, OFFSET MSG_0`);
            codes.push(`INT 21H`);

            if (value.match(/^[a-zA-Z][\w]*$/)) {
                codes.push(`MOV DX, OFFSET ${value} + 2`);
                codes.push(`MOV AH, 09h`);
                codes.push(`INT 21h`);
            } else {
                declarations.push(`MSG_${messages} DB ${value}, 10, 13, "$"`);
                codes.push(`MOV AH, 09h`);
                codes.push(`MOV Dx, OFFSET MSG_${messages}`);
                codes.push(`INT 21H`);

                messages++;

                codes.push(`MOV AH, 09h`);
                codes.push(`MOV Dx, OFFSET MSG_0`);
                codes.push(`INT 21H`);
            }
        }
        if (line.name == "asignation") {
            asignation(line.content);
        }
        if (line.name == "declaration") {
            const { type, name } = line.content;
            switch (type) {
                case "int":
                    declarations.push(`${name} DB 5, ?, 5 DUP (24H)`);
                    break;

                default:
                    declarations.push(`${name} DB 5, ?, 5 DUP (24H)`);
                    break;
            }

            asignation(line.content);
        }
    }

    const conversion_code = `
.MODEL SMALL
.CODE
START:
\tMOV AX, @Data
\tMOV Ds, Ax

\t${codes.join("\n\t")}

\tMOV AX, 4C00h
\tINT 21h
.DATA
\tMSG_0 DB "", 10, 13, "$"
\t${declarations.join("\n\t")}
.STACK
END START`;

    fs.writeFile("code.asm", conversion_code, (err) => {
        if (err) throw err;
        console.log("File saved success.");
    });
}

module.exports = conversion;
