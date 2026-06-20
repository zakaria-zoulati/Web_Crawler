const { test, expect, describe } = require("@jest/globals");
const { isValidURL, isNumber } = require("../../utils/validation.js");

describe("isValidURL", () => {
  test("accepts a basic https url", () => {
    expect(isValidURL("https://books.toscrape.com")).toBe(true);
  });

  test("accepts an http url with path and query", () => {
    expect(isValidURL("http://example.com/path?q=1")).toBe(true);
  });

  test("rejects a url without a protocol", () => {
    expect(isValidURL("example.com")).toBe(false);
  });

  test("rejects non-web protocols (mailto)", () => {
    expect(isValidURL("mailto:someone@example.com")).toBe(false);
  });

  test("rejects javascript: pseudo-protocol", () => {
    expect(isValidURL("javascript:alert(1)")).toBe(false);
  });

  test("rejects garbage input", () => {
    expect(isValidURL("not a url")).toBe(false);
  });

  test("rejects empty string", () => {
    expect(isValidURL("")).toBe(false);
  });
});

describe("isNumber", () => {
  test("accepts a positive integer", () => {
    expect(isNumber(5)).toBe(true);
  });

  test("accepts zero", () => {
    expect(isNumber(0)).toBe(true);
  });

  test("accepts a negative number", () => {
    expect(isNumber(-3)).toBe(true);
  });

  test("rejects NaN", () => {
    expect(isNumber(NaN)).toBe(false);
  });

  test("rejects Infinity", () => {
    expect(isNumber(Infinity)).toBe(false);
  });

  test("rejects a numeric string", () => {
    expect(isNumber("5")).toBe(false);
  });

  test("rejects undefined", () => {
    expect(isNumber(undefined)).toBe(false);
  });
});
