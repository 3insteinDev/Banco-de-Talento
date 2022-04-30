const nodemailer = require("nodemailer");
const xoauth2 = require("xoauth2");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.post("/sendFormData/:email/:nome/:vaga", (req, res) => {
  const email = req.params.email;
  const nome = req.params.nome;
  const vaga = req.params.vaga;
  console.log(email);
  console.log(nome);
  console.log(req.body, "data of form");
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: "true",
    port: "465",
    auth: {
      user: "projeto.talentos.bcw7@gmail.com", // must be Gmail
      pass: "senhadogrupotalento",
    },
  });

  var mailOptions = {
    from: "projeto.talentos.bcw7@gmail.com",
    to: `${email}`, // must be Gmail
    subject: "SoulJobs informa:",
    html: `  <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script id="mcjs">!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/9024bfecdf2a61e18b90e3739/f3949c2536abe24b7a7a9fac7.js");</script>
        <title>Document</title>
    </head>

    <body>

        <header>

            <h1>SoulCode Academy informa:</h1>
            <h2> Vaga: ${vaga}</h2>
        </header>
        <main>

            <p>Olá, ${nome}! Você recebeu uma mensagem da empresa SoulCode Academy referente à vaga ${vaga}.</p>
            <p>Saber que um profissional como você quer mudar a tecnologia e construir um futuro mais inclusiva com a gente
                nos deixou muito felizes!</p>
            <p>Infelizmente não foi nessa oportunidade, mas saiba que seu perfil ficará em nosso radar.</p>
            <p> <strong>Queremos agradecer por todo seu tempo e esforço dedicado neste processo para vaga de
            ${vaga}</strong></p>
            <p> A SoulCode Academy é uma Empresa em ascensão, portanto, sempre estão surgindo novas oportunidades! Continue
                acessando nosso LinkedIn e o SoulCodeJobs, checando as vagas divulgadas.</p>
            <p>Esperamos vê-lo novamente em breve!</p>
            <p>SoulCode Academy, </p>
            <p>www.soulcodejobs.com.br</p>
        </main>
        <footer>
            <div class="container">
                              <div class="card-header">

                        <p>
                            Rua Helena, 235 Conj 111, 11ª andar - Vila Olímpia - São Paulo/SP -
                            CEP: 04552-050
                        </p>
                    </div>
                </div>

        </footer>

    </body>

    </html>

          `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({
        message: "successfuly sent!",
      });
    }
  });
});

app.listen(3000, () => {
  console.log("server run!!!");
});
