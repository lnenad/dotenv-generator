#!/usr/bin/env node

import { program } from "commander";
import inquirer from "inquirer";
import { readFileSync, writeFileSync } from "fs";
import { parseFile } from "./parser.js";
import { generateQuestions, generateEnv } from "./generator.js";

const DEFAULT_FILE = ".env.example";
const DEFAULT_OUTPUT = ".env";

program
  .version("0.1.7")
  .option(
    "-f, --file <env-template-file>",
    "the environment file name to be used as an example",
  )
  .option(
    "-o, --output <env-output-file>",
    "the environment file name to be used as an output",
  )
  .option("-pi, --postinstall", "if set the script will check for npm version")
  .option("-d, --debug", "flag whether to write debug output to stdout")
  .action(async (options) => {
    if (options.postinstall) {
      const npmData = process.env["npm_config_user_agent"] || "npm/0.0.0 node";
      const npmVersion = /npm\/(.*) node/.exec(npmData)[1].split(".");
      console.log(`npm Version: ${npmVersion[0]}`);
      if (parseInt(npmVersion[0]) > 6) {
        // If greater than 6 postinstall hooks won't work
        console.log(
          `\x1b[100m\x1b[1m\x1b[35mTo configure the environment for this project please execute "npm explore {name_of_the_package} -- npm run postinstall". 
Replace {name_of_the_package} with the name of the package that you are trying to install\x1b[0m`,
        );

        process.exit();
      }
    }
    console.log(
      `\x1b[100m\x1b[1m\x1b[35mEnv-generator version ${"0.1.7"}\x1b[0m`,
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
