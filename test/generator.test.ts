import * as generators from "../src/generator";

describe("generating questions", () => {
    test("generating single question for string input", () => {
        const questions = generators.generateQuestions({
            comments: {},vars: {
            TEST_KEY: "TEST_VALUE"
            }
        });

        expect(questions.length).toEqual(1);
        expect(questions[0]).toMatchObject(
            {
                type: "input",
                name: "TEST_KEY",
                choices: null,
                default: "TEST_VALUE",
                message: "Enter the value, type string, for TEST_KEY:"
            }
        );
    })
    test("generating single question for number input", () => {
        const questions = generators.generateQuestions({
            comments: {},vars: {
            TEST_KEY: 2
            }
        })

        expect(questions.length).toEqual(1);
        expect(questions[0]).toMatchObject(
            {
                type: "input",
                name: "TEST_KEY",
                choices: null,
                default: 2,
                message: "Enter the value, type number, for TEST_KEY:"
            }
        );
    })
    test("generating single question for list input", () => {
        const choices = ["ONE", "TWO", "THREE"];
        const questions = generators.generateQuestions({
            comments: {},vars: {
            TEST_KEY: choices
            }
        })

        expect(questions.length).toEqual(1);
        expect(questions[0]).toMatchObject(
            {
                type: "list",
                name: "TEST_KEY",
                choices: ["ONE", "TWO", "THREE"],
                default: "ONE",
                message: "Enter the value, type string, for TEST_KEY:"
            }
        );
    })
    test("generating single question for boolean input", () => {
        const questions = generators.generateQuestions({
            comments: {},vars: {
            TEST_KEY: true
            }
        })

        expect(questions.length).toEqual(1);
        expect(questions[0]).toMatchObject(
            {
                type: "input",
                name: "TEST_KEY",
                choices: null,
                default: true,
                message: "Enter the value, type boolean, for TEST_KEY:"
            }
        );
    })
    test("generating multiple questions for different inputs", () => {
        const choices = ["ONE", "TWO", "THREE"];
        const questions = generators.generateQuestions({
            comments: {},vars: {
            TEST_KEY: true,
            TEST_KEY_TWO: choices,
            TEST_KEY_THREE: 2,
            TEST_KEY_FOUR: "TEST_VALUE",
            }
        });

        expect(questions.length).toEqual(4);
        expect(questions[3]).toMatchObject(
            {
                type: "input",
                name: "TEST_KEY_FOUR",
                choices: null,
                default: "TEST_VALUE",
                message: "Enter the value, type string, for TEST_KEY_FOUR:"
            }
        );
        expect(questions[2]).toMatchObject(
            {
                type: "input",
                name: "TEST_KEY_THREE",
                choices: null,
                default: 2,
                message: "Enter the value, type number, for TEST_KEY_THREE:"
            }
        );
        expect(questions[1]).toMatchObject(
            {
                type: "list",
                name: "TEST_KEY_TWO",
                choices: ["ONE", "TWO", "THREE"],
                default: "ONE",
                message: "Enter the value, type string, for TEST_KEY_TWO:"
            }
        );
        expect(questions[0]).toMatchObject(
            {
                type: "input",
                name: "TEST_KEY",
                choices: null,
                default: true,
                message: "Enter the value, type boolean, for TEST_KEY:"
            }
        );
    })
});

describe("generating env", () => {
    test("generates valid env file", () => {
        const env = generators.generateEnv({
            KEY: "VALUE",
            NUM_KEY: 2,
            BOOL_KEY: true
        });

        expect(env).toEqual(`KEY=VALUE
NUM_KEY=2
BOOL_KEY=true
`)
    });
})