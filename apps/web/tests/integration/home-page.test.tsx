import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import HomePage from "../../app/(public)/page";

test("renders Sweet Aroma bakery, sweets and nimko shop", () => {
  const markup = renderToStaticMarkup(<HomePage />);
  assert.match(markup, /Sweet Aroma/);
  assert.match(markup, /Bakery &amp; Nimko Shop/);
  assert.match(markup, /Popular picks/);
  assert.match(markup, /Shop our menu/);
  assert.match(markup, /Explore/);
  assert.match(markup, /Add/);
  assert.match(markup, /Search products/);
  assert.match(markup, /All products/);
  assert.doesNotMatch(markup, /goat herd management|care reminders|My herd/i);
});
