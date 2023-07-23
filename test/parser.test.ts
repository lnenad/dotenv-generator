import { parseComments, parseFile } from "../src/parser";

test("comment whole line", () => {
  let result = parseComments(`# This is a comment
SECRET_KEY=YOURSECRETKEYGOESHERE`);

  expect(result["SECRET_KEY"]).toEqual("This is a comment");
});

test("inline comment", () => {
  let result = parseComments(`SECRETO=REALLYSECRET # Commentier`);

  expect(result["SECRETO"]).toEqual("Commentier");
});

test("multiple scenarios", () => {
  let result = parseComments(`C=E
# This is a comment
SECRET_KEY=23123
# This should have priority
SECRET_HASH="something-with-a-#-hash" # Inline comment that should be ignored
# No variable after, should be ignored`);

  expect(result["SECRET_KEY"]).toEqual("This is a comment");
  expect(result["SECRET_HASH"]).toEqual("This should have priority");
});
