// template.html에 SheetJS를 인라인해 오프라인 단일 파일을 만든다.
// 사용: npm install xlsx@0.18.5 && node record-label/build.mjs
import { readFileSync, writeFileSync } from "fs";
import { createRequire } from "module";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const lib = readFileSync(require.resolve("xlsx/dist/xlsx.full.min.js"), "utf8");
const tpl = readFileSync(join(here, "template.html"), "utf8");
const out = tpl.replace("/*__XLSX__*/", () => lib.replace(/<\/script/gi, "<\\/script"));
writeFileSync(join(here, "기록물철_라벨_생성기.html"), out);
console.log("built", out.length, "bytes");
