
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
});
