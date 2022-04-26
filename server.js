let http = require("http");
const PORT = 8888;

function start(route, handle) {
  function requestListener(req, res) {
    const { pathname } = new URL(req.url, "http://" + req.headers.host);
    console.log("Request para ruta " + pathname + " recibido.");
    route(handle, pathname, res, req);
  }

  http.createServer(requestListener).listen(PORT);
  console.log(`Servidor creado en puerto ${PORT}`);
}

exports.start = start;