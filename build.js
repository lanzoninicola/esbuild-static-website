/**
 *  "scripts": {
    "test": "test",
    "build": "node build.js -build",
    "start": "node build.js -watch"
  },
 */

const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const outdirectory = "dist";

//clear out any old JS or CSS
fs.readdir(outdirectory, (err, files) => {
  if (err) throw err;
  for (const file of files) {
    if (
      file.endsWith(".js") ||
      file.endsWith(".css") ||
      file.endsWith(".js.map")
    ) {
      fs.unlink(path.join(outdirectory, file), (err) => {
        if (err) throw err;
      });
    }
  }
});

//defaults to build
let config = "-build";
if (process.argv.length > 2) {
  config = process.argv[2];
}

console.log(process.argv);

config == "-watch" &&
  esbuild.build({
    // pass any options to esbuild here...
    entryPoints: ["modules/index.js"],
    outdir: outdirectory,
    bundle: true,
    // inject: ["./react-shim.js"],
    define: { "process.env.NODE_ENV": '"production"' },
    sourcemap: true,
    minify: false,
    watch: {
      onRebuild(error, result) {
        if (error) console.error("watch build failed:", error);
        else console.log("watch build succeeded:", result);
      },
    },
  }) &&
  esbuild.build({
    // pass any options to esbuild here...
    entryPoints: ["pages/about/index.js"],
    outfile: "index.min.js",
    bundle: true,
    // inject: ["./react-shim.js"],
    define: { "process.env.NODE_ENV": '"production"' },
    sourcemap: true,
    minify: false,
    watch: {
      onRebuild(error, result) {
        if (error) console.error("watch build failed:", error);
        else console.log("watch build succeeded:", result);
      },
    },
  });

config == "-build" &&
  esbuild.build({
    // pass any options to esbuild here...
    entryPoints: ["src/app.jsx"],
    outdir: outdirectory,
    bundle: true,
    inject: ["./react-shim.js"],
    define: { "process.env.NODE_ENV": '"production"' },
    minify: true,
  }) &&
  console.log("building");

// Run a local web server with livereload when -watch is set
config == "-watch" && serve();

async function serve() {
  console.log("running server from: http://localhost:8080/");
  const servor = require("servor");
  await servor({
    browser: true,
    root: ".",
    port: 8080,
  });
}
