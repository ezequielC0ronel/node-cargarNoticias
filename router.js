let fs = require("fs");

const mime = {
  html: "text/html",
  css: "text/css",
  jpg: "image/jpeg",
  ico: "image/x-icon",
  mp3: "audio/mpeg3",
  mp4: "video/mp4"
};

function route(handle, pathname, res, req) {
  if (typeof handle[pathname] == "function") {
    handle[pathname](req, res);
  } else {
    let path = "./static" + pathname;
    if(path == "./static/"){
        path = "./static/index.html";
    }
    fs.stat(path, (error) => {
      if (!error) {
        fs.readFile(path, (error, data) => {
          if (error) {
            res.writeHead(500, { "content-Type": "text/plain" });
            res.write("Error interno");
            res.end();
          } else {
            const vec = path.split(".");
            const extension = vec[vec.length - 1];
            const miArchivo = mime[extension];
            res.writeHead(200, { "content-Type": miArchivo });
            res.write(data);
            res.end();
          }
        });
      } else {
        console.log("No request handler found for " + pathname);
        res.writeHead(404, { "content-Type": "text/html" });
        res.write("<p>404 Not Found</p>");
        res.end();
      }
    });
  }
}

exports.route = route;
