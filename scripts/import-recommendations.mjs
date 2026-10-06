#!/usr/bin/env node
// Converts LinkedIn's Recommendations_Received.csv (from "Get a copy of your data")
// into src/data/recommendations.json.
//
// Usage: npm run import:recommendations -- /path/to/Recommendations_Received.csv
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const input = process.argv[2];
if (!input) {
  console.error("Usage: npm run import:recommendations -- <path/to/Recommendations_Received.csv>");
  process.exit(1);
}

/** Minimal RFC 4180 parser: quoted fields, escaped quotes, embedded newlines. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.some((f) => f.trim() !== "")) rows.push(row);
      row = [];
    } else field += c;
  }
  row.push(field);
  if (row.some((f) => f.trim() !== "")) rows.push(row);
  return rows;
}

let raw;
try {
  raw = readFileSync(input, "utf8");
} catch (err) {
  console.error(`Could not read ${input}: ${err.message}`);
  process.exit(1);
}
const rows = parseCsv(raw.replace(/^﻿/, ""));
const header = rows.shift()?.map((h) => h.trim().toLowerCase()) ?? [];
const col = (name) => header.indexOf(name);
const idx = {
  first: col("first name"),
  last: col("last name"),
  company: col("company"),
  title: col("job title"),
  text: col("text"),
  status: col("status"),
};
if (idx.first < 0 || idx.text < 0) {
  console.error(`Unexpected CSV columns: ${header.join(", ")}\nExpected at least "First Name" and "Text".`);
  process.exit(1);
}

const cell = (r, i) => (i >= 0 ? (r[i] ?? "").trim() : "");
const items = rows
  // Skip recommendations you've hidden on your profile.
  .filter((r) => idx.status < 0 || ["", "visible"].includes(cell(r, idx.status).toLowerCase()))
  .map((r) => ({
    quote: cell(r, idx.text).replace(/\s*\n\s*/g, " "),
    author: [cell(r, idx.first), cell(r, idx.last)].filter(Boolean).join(" "),
    context: [cell(r, idx.title), cell(r, idx.company)].filter(Boolean).join(", "),
  }))
  .filter((r) => r.quote && r.author);

if (items.length === 0) {
  console.error("No visible recommendations found; leaving recommendations.json unchanged.");
  process.exit(1);
}

const out = fileURLToPath(new URL("../src/data/recommendations.json", import.meta.url));
writeFileSync(out, JSON.stringify(items, null, 2) + "\n");
console.log(`Wrote ${items.length} recommendation(s) to src/data/recommendations.json`);
