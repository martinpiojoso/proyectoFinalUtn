//1 Creamos el servidor.
const express = require("express");
require("dotenv").config();
const path = require("path");
const hbs = require("hbs");
const mysql2 = require("mysql2");
const nodemailer = require("nodemailer");
const app = express();
const cls = require("cls");

//2 Creamos un Puerto que escuche las peticiones.
const PORT = process.env.PORT || 8080;
const puerto = 3000;


//3 Conexion base de datos
/* const conexion = mysql2.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

conexion.connect((err) => {
  if (err) {
    console.error(`Error de conexión: ${err.stack}`);
  } else {
    console.log(`Conectado a la Base de Datos ${process.env.DATABASE}`);
  }
}); */

// 4 Usamos los Middelwares: funciones de Express.Tienen que estar siempres antes de las rutas.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//---- Configurar Motor de plantillas - Hbs ----//
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));


//---Verbos http ---//
//---GET --// usuario obtiene datos desde el frondent
app.get('/', (req, res) => {
  res.render('index', {
    styles: 'styles.css',
    scripts: 'scripts.js'
  })
});

app.get('/inicio', (req, res) => {
  res.render('inicio', {
    styles: 'styles.css',
    scripts: 'scripts.js'
  })
});

app.get('/servicios', (req, res) => {
  res.render('servicios', {
    styles: 'styles.css',
    scripts: 'scripts.js'
  })
});

app.get('/nosotros', (req, res) => {
  res.render('nosotros', {
    styles: 'styles.css',
    scripts: 'scripts.js'
  })
});

app.get('/contacto', (req, res) => {
  res.render("contacto", {
    styles: 'styles.css',
    scripts: 'scripts.js'
  })
});

// -- Post --//

app.post('/contacto', (req, res) => {// Mail
  const { nombre, mail, telefono, mensaje } = req.body;

  if (nombre == "" || mail == "" || telefono == "" || mensaje == "") {
    res.render('contacto', {
      styles: 'styles.css',
      scripts: 'scripts.js'
    });
  } else {
    
    let datos = {
      nombre: nombre,
      mail: mail,
      telefono: telefono
    };

    // let sql = 'INSERT INTO usuarios SET ?';

    // conexion.query(sql, datos, (err, result) => {
    //   if (err) throw err;
    //     res.render('contacto', {
    //     styles: 'styles.css',
    //     scripts: 'scripts.js'
    //   }); 

    // });
};

    async function envioMail() {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.USERMAIL,
          pass: process.env.PASS
        },
      });

      let envio = await transporter.sendMail({
        from: process.env.USERMAIL,
        to: `${mail}`,
        subject: "Gracias por Suscribirse",
        html: `Muchas gracias por contactar con nosotros. <br>
            Todas nuestras promociones estaran a su disposicion.`,
      });
    }

    envioMail();


app.listen(puerto, () => {
  console.log(`Servidor corriendo en el puerto ${puerto}`);
});
