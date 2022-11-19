const http = require("http");
const fs = require("fs");
const path = require("path");

// set path, file extension and content type (according to extension)

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);

  let extname = path.extname(filePath);

  let contentType = "text/html";

  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".html":
      contentType = "text/html";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
  }

  fs.readFile(filePath, "utf8", (error, content) => {
    if (error) {
      if (error.code == "ENOENT") {
        fs.readFile(
          path.join(__dirname, "404.html"),
          "utf8",
          (error, content) => {
            res.writeHead(200, { "Content-type": "text/html" });
            res.end(content);
          }
        );
      } else {
        res.writeHead(500);
        res.end(`Server error ${error.code}`);
      }
    } else {
      res.writeHead(200, { "Content-type": contentType });
      res.end(content, "utf8");
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("Server running...");
});
