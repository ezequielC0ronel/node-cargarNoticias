let fs = require("fs");
let formidable = require("formidable");

function insertarNoticia(req, res) {
  const noticias = fs.readFile("./noticias.json", function (err, data) {
    let noticiasObj = JSON.parse(data);

    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      if (!err) {
        let noticia = { ...fields };
        if (
          noticia.tituloNoticia != "" &&
          noticia.fechaNoticia != "" &&
          noticia.textoNoticia != "" &&
          noticia.autorNoticia != ""
        ) {
          noticia.url = files.imagenNoticia.originalFilename;
          fs.rename(
            files.imagenNoticia.filepath,
            "./static/imagenes/" + files.imagenNoticia.originalFilename,
            function (err) {
              console.log("El path del file fue cambiado!");
            }
          );

          noticiasObj.push(noticia);
          fs.writeFile(
            "noticias.json",
            JSON.stringify(noticiasObj),
            function (error) {
              res.writeHead(201, { "content-Type": "text/html" });
              res.write(
                "Noticia cargada con exito<br> <a href='ingresarNoticia.html'>Volver a cargar una noticia</a>"
              );
              res.end();
            }
          );
        } else {
          res.writeHead(400, { "content-Type": "text/html" });
          res.write("<p>Faltan datos obligatorios en el formulario</p>");
          res.write("<a href='/ingresarNoticia.html'>Volver al formulario</a>");
          res.end();
        }
      } else {
        res.writeHead(500, { "content-Type": "text/html" });
        res.write("No se pudo procesar los datos del formulario");
        res.end();
      }
    });
  });
}

function verNoticias(req, res) {
  const noticias = fs.readFile("./noticias.json", function (err, data) {
    let noticiasObj = JSON.parse(data);


    let divNoticias = "<div style='display: flex;flex-wrap: wrap;gap: 16px;padding: 100px;justify-content: center;'>";
    noticiasObj.forEach((noticia) => {
      if (noticia.url != "") {
        divNoticias += `<div style="display: flex;flex-direction: column; outline: 2px solid black; width:500px;justify-content: center;"><h1>${noticia.tituloNoticia}</h1><img src="imagenes/${noticia.url}"><p>${noticia.fechaNoticia}</p><h3>${noticia.textoNoticia}</h3><p>${noticia.autorNoticia}</p></p></div>`;
      } else {
        divNoticias += `<div style="display: flex;flex-direction: column; outline: 2px solid black; width:500px;justify-content: center;"><h1>${noticia.tituloNoticia}</h1><p>${noticia.fechaNoticia}</p><h3>${noticia.textoNoticia}</h3><p>${noticia.autorNoticia}</p></p></div>`;
      }
    });
    divNoticias += "</div>";

    res.writeHead(200, { "content-Type": "text/html" });
    res.write(divNoticias);
    res.write("<a href='/' style='display:block; text-align:center;'>Volver al inicio</a>");
    res.end();
  });
}

exports.verNoticias = verNoticias;
exports.insertarNoticia = insertarNoticia;
