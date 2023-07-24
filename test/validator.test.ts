import * as validators from "../src/validators";

test("positive number validation", () => {
  expect(validators.number("1")).toBe(true);
  expect(validators.number("33")).toBe(true);
  expect(validators.number("45.4")).toBe(true);
  expect(validators.number("3.223412")).toBe(true);
  expect(validators.number(2.34)).toBe(true);
});

test("negative number validation", () => {
  expect(validators.number("1e")).toBe(false);
  expect(validators.number("w")).toBe(false);
  expect(validators.number("e2")).toBe(false);
  expect(validators.number("!")).toBe(false);
  expect(validators.number("false")).toBe(false);
});

test("positive string validation", () => {
  expect(validators.string("1")).toBe(true);
  expect(validators.string("ww")).toBe(true);
  expect(validators.string("true")).toBe(true);
  expect(validators.string("")).toBe(true);
});

test("positive boolean validation", () => {
  expect(validators.boolean("true")).toBe(true);
  expect(validators.boolean("false")).toBe(true);
  expect(validators.boolean(true)).toBe(true);
  expect(validators.boolean(false)).toBe(true);
});

test("negative boolean validation", () => {
  expect(validators.boolean("truee")).toBe(false);
  expect(validators.boolean("falwse")).toBe(false);
});
