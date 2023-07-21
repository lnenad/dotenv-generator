import { program } from "commander";
import { version } from "../package.json";
import { parseFile } from "./parser";
import { generateQuestions, generateEnv } from "./generator";
import inquirer = require('inquirer');
import { readFileSync, writeFileSync } from "fs";

const DEFAULT_FILE = ".env.example";
const DEFAULT_OUTPUT = ".env";

program
  .version(version)
  .option("-f, --file <env-template-file>", "the environment file name to be used as an example")
  .option("-o, --output <env-output-file>", "the environment file name to be used as an output")
  .option("-d, --debug", "flag whether to write debug output to stdout")
  .action(async options => {
    console.log(`Env-generator version ${version}`);

    const file = options.file || DEFAULT_FILE;
    const output = options.output || DEFAULT_OUTPUT;
    console.log(`Template file: ${file}`);
    console.log(`Output file: ${output}`);
    const exampleEnv = parseFile(readFileSync, file);
    if (exampleEnv instanceof Error) {
      console.log(`Error while parsing template file:\n${exampleEnv.toString()}`);
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