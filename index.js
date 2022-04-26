let server = require('./server');
let router = require('./router');
let requestHandlers = require('./requestHandlers');

let handle={};

handle["/insertarNoticia"] = requestHandlers.insertarNoticia;
handle["/verNoticias"] = requestHandlers.verNoticias;

server.start(router.route, handle)
