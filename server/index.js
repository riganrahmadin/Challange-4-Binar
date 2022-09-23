const http = require("http");
const fs = require("fs");
const port = 8080;

const cars = require("../data/cars.min.json");

function loadHTML(file, statusCode, res) {
  let html = fs.readFileSync(file);
  let contentType = "text/html";
  let ekstension = file.split(".");
  ekstension = ekstension[ekstension.length - 1];
  switch (ekstension) {
    case "js":
      contentType = "application/javascript";
      break;
    case "css":
      contentType = "text/css";
      break;
    case "png":
      contentType = "image/png";
      break;
    case "jpg":
    case "jpeg":
      contentType = "image/jpg";
      break;
    case "svg":
      contentType = "image/svg+xml";
      break;
  }
  res.writeHead(statusCode, { "content-type": contentType });
  res.end(html);
}

function onRequest(req, res) {
  console.log(req.url);
  switch (req.url) {
    case "/":
      loadHTML("public/index.html", 200, res);
      break;
    case "/cars":
      loadHTML("public/Carimobil.html", 200, res);
      break;
    default:
      let assets = "public" + req.url;
      if (fs.existsSync(assets)) {
        loadHTML(assets, 200, res);
      } else {
        loadHTML("public/404.html", 404, res);
      }
      break;
  }
}

const server = http.createServer(onRequest);

server.listen(port, 'localhost',() => {
  console.log("server sudah berjalan, silahkan buka http://localhost:%d", port)
});
