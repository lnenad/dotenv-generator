#!/usr/bin/env node

import { program } from "commander";
import inquirer from "inquirer";
import { readFileSync, writeFileSync } from "fs";
import { parseFile } from "./parser";
import { generateQuestions, generateEnv } from "./generator";

const DEFAULT_FILE = ".env.example";
const DEFAULT_OUTPUT = ".env";

program
  .version("0.1.5")
  .option(
    "-f, --file <env-template-file>",
    "the environment file name to be used as an example",
  )
  .option(
    "-o, --output <env-output-file>",
    "the environment file name to be used as an output",
  )
  .option("-d, --debug", "flag whether to write debug output to stdout")
  .action(async (options) => {
    console.log(
      `\x1b[100m\x1b[1m\x1b[35mEnv-generator version ${"0.1.5"}\x1b[0m`,
    );

    const file = options.file || DEFAULT_FILE;
    const output = options.output || DEFAULT_OUTPUT;
    console.log(`Template file: \x1b[32m${file}\x1b[0m`);
    console.log(`Output file: \x1b[32m${output}\x1b[0m`);
    const exampleEnv = parseFile(readFileSync, file);
    if (exampleEnv instanceof Error) {
      console.log(
        `Error while parsing template file:\n${exampleEnv.toString()}`,
      );
      process.exit(1);
    }
    const questions = generateQuestions(exampleEnv);
    const answers = await inquirer.prompt(questions);
    const envOutput = generateEnv(answers);
    if (options.debug) {
      console.log("Input env:", exampleEnv);
      console.log("Provided answers:", answers);
      console.log("Env output:", envOutput);
    }
    writeFileSync(output, envOutput);
    process.exit();
  });

program.parse(process.argv);
