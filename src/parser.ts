import { parse } from 'dotenv';
import parseVariables = require('dotenv-parse-variables');

const parseFile = (readFn, file) => {
    try {
        const contents = readFn(file).toString();
        const parsed = parse(contents);

        return parseVariables(parsed);
    } catch (err) {
        return err;
    }
};

export { parseFile };