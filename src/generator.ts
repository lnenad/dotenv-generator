import * as validators from "./validators";
import { EnvironmentData } from "./parser";

export const generateQuestions = (data: EnvironmentData) => {
  const env = data.vars;
  const comments = data.comments;

  return Object.keys(env).map((key) => {
    let typ = typeof env[key];
    let isArray = false;
    if (typ === "object") {
      isArray =
        env[key] instanceof Array &&
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        (<any>env[key]).length &&
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        (<any>env[key]).length > 0;
    }
    if (isArray) {
      typ = typeof env[key][0];
    }

    return {
      type: ((_typ, isArray) => {
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
      message: comments[key]
        ? comments[key]
        : `Enter the value, type ${typ}, for ${key}:`,
    };
  });
};

export const generateEnv = (obj: {
  [key: string]: number | string | boolean;
}): string => {
  return Object.keys(obj).reduce((acc, key) => {
    return acc + `${key}=${obj[key]}\n`;
  }, "");
};
