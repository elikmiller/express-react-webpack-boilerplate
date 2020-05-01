// Node.js
const path = require("path");

// Webpack
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const config = require("../../webpack.config.js");
const compiler = webpack(config);

// Express
const express = require("express");
const app = express();

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.use(
  require("webpack-hot-middleware")(compiler, {
    path: "/__webpack_hmr",
  })
);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../../dist", "index.html"));
});

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log("Example app listening on port 3000!\n");
});
