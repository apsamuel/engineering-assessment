import compileData from "../api/lib/compileData.js";

console.log(JSON.stringify(await compileData(), null, 2))