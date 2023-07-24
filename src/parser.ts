import { parse } from "dotenv";
import parseVariables from "dotenv-parse-variables";

interface EnvironmentData {
  vars: parseVariables.ParsedVariables;
  comments: CommentList;
}

type CommentList = { [key: string]: string };
type ReadFunction = (filePath: string) => string | Buffer;

const STATES: { [key: string]: number } = {
  NONE: 0,
  COMMENT: 1,
  VARIABLE: 2,
};

const commentToken = "#";
const assignmentToken = "=";

const parseComments = (contents: string) => {
  const lines = contents.split(/\r?\n/);
  const result = {};

  let state = STATES.NONE;
  let lastComment = "";
  let lastVar = "";
  let i = 0;
  let captureNext = false;

  for (const line of lines) {
    for (const ch of line.trim()) {
      if (ch === commentToken && i === 0) {
        // Whole line comment
        state = STATES.COMMENT;
        captureNext = true;
        i++;
        continue;
      }
      if (ch !== commentToken && i === 0) {
        // Variable assignment
        state = STATES.VARIABLE;
      }
      if (ch === commentToken && i > 0) {
        // Inline comment
        state = STATES.COMMENT;
        captureNext = false;
        lastComment = "";
        i++;
        continue;
      }
      if (
        ch === assignmentToken &&
        state === STATES.VARIABLE &&
        captureNext &&
        lastComment.length > 0
      ) {
        // End of assignment with a comment on the previous line
        result[lastVar.trim()] = lastComment.trim();
        lastVar = "";
        lastComment = "";
        captureNext = false;
        break;
      }
      if (
        ch === assignmentToken &&
        state === STATES.VARIABLE &&
        !captureNext &&
        i > 0
      ) {
        // Variable assignment completed
        state = STATES.NONE;
      }
      if (state === STATES.COMMENT) {
        lastComment += ch;
      }
      if (state === STATES.VARIABLE) {
        lastVar += ch;
      }
      i++;
    }
    if (captureNext === false) {
      state = STATES.NONE;
      if (lastVar.length > 0 && lastComment.length > 0) {
        result[lastVar.trim()] = lastComment.trim();
      }
      lastComment = "";
    }
    lastVar = "";

    i = 0;
  }
  return result;
};

const parseFile = (readFn: ReadFunction, filePath: string): EnvironmentData => {
  try {
    const contents = readFn(filePath).toString();
    const parsed = parse(contents);

    const vars = parseVariables(parsed);
    const comments = parseComments(contents);
    return {
      vars,
      comments,
    };
  } catch (err) {
    return err;
  }
};

export { EnvironmentData, parseComments, parseFile };
