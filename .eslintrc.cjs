module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["**/lib/*.js", "jest.config.cjs"],
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
};
