import { readFileSync, writeFileSync } from "node:fs";
import { renderToString } from "react-dom/server";
import { App } from "../src/App";

const shell = readFileSync("dist/index.html", "utf8");
const marker = '<div id="root"></div>';
if (!shell.includes(marker)) throw new Error("Missing static page insertion point");
writeFileSync(
  "dist/index.html",
  shell.replace(marker, `<div id="root">${renderToString(<App />)}</div>`),
);
console.log("Prerendered VELA content for immediate display and no-JavaScript reading.");
