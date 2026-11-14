import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import HomePage from "../../app/(public)/page";

test("renders Sweet Aroma bakery, sweets and nimko shop", () => {
  const markup = renderToStaticMarkup(<HomePage />);
  assert.match(markup, /Sweet Aroma/);
  assert.match(markup, /Bakery, Sweets &amp; Nimko Shop/);
  assert.match(markup, /Popular Products/);
  assert.match(markup, /Celebration Cake/);
  assert.match(markup, /Mix Nimko/);
  assert.match(markup, /Traditional Sweet Box/);
  assert.match(markup, /Add to Cart/);
  assert.match(markup, /Search products/);
  assert.doesNotMatch(markup, /goat herd management|care reminders|My herd/i);
});
