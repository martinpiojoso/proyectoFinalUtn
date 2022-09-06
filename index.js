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
const conexion = mysql2.createConnection({
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
});

// 4 Usamos los Middelwares: funciones de Express.Tienen que estar siempres antes de las rutas.
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use(express.static(path.join(__dirname, "public"))); 

//---- Configurar Motor de plantillas - Hbs ----//
app.set("view engine", "hbs"); 
app.set("views", path.join(__dirname, "views")); 
hbs.registerPartials(path.join(__dirname, "views/partials")); 


//---Verbos http ---//
//---GET --// usuario obtiene datos desde el frontent
app.get("/", (req, res) => {
  res.render("index", {
    titulo: "Bienvenido a la App de la Utn",
  });
});

app.get("/formulario", (req, res) => {
  res.render("formulario", {
    titulo: "Formulario para Productos",
    style: "formulario.css",
  });
});

app.get("/productos", (req, res) => {
  let sql = "SELECT * FROM producto";

  conexion.query(sql, (err, result) => {
    if (err) throw err;
    res.render("productos", {
      titulo: "Productos en stock",
      results: result,
    });
  });
});

app.get("/contacto", (req, res) => {
  res.render("contacto", {
    titulo: "Formulario para Suscripcion",
  });
});



app.listen(puerto, () => {
  console.log(`Servidor corriendo en el puerto ${puerto}`);
});
