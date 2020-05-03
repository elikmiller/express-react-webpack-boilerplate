// Node.js
const path = require("path");

// Express
const express = require("express");
const app = express();

if (process.env.NODE_ENV === "development") {
  // Webpack
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const config = require("../../webpack.dev.js");
  const compiler = webpack(config);

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
} else if (process.env.NODE_ENV === "production") {
  app.use(express.static("dist"));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../../dist", "index.html"));
  });
} else {
  throw new Error(
    'NODE_ENV should be set to either "development" or "production"'
  );
}

app.listen(3000, function () {
  console.log("Example app listening on port 3000!\n");
});
