import * as validators from "./validators";

export const generateQuestions = env => {
    return Object.keys(env).map(key => {
        let typ = typeof env[key];
        let isArray = false;
        if (typ === "object") {
            isArray = env[key] instanceof Array && env[key].length && env[key].length > 0;
        }
        if (isArray) {
            typ = typeof env[key][0];
        }

        return {
            type: ((typ, isArray) => {
                if (isArray) {
                    return "list";
                }

                return "input";
            })(typ, isArray),
            name: key,
            choices: isArray ? env[key] : null,
            validate: function (input) {
                if (isArray) {
                    return true;
                }
                if (env[key] === undefined) {
                    return true;
                }
                const validator = validators[typ];
                if (!validator) {
                    return true;
                }
                if (!validator(input)) {
                    return `You need to provide a ${typ}`;
                }
                return true;
            },
            default: ((value) => {
                if (isArray) {
                    return value[0];
                }
                return value !== undefined ? env[key] : null;
            })(env[key]),
            message: `Enter the value, type ${typ}, for ${key}:`
        }
    });
}

export const generateEnv = obj => {
    return Object.keys(obj).reduce((acc, key) => {
        return acc + `${key}=${obj[key]}\n`;
    }, "")
}