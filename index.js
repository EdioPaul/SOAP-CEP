
const express = require('express');
const soap = require('soap');
const bodyParser = require('body-parser');
const app = express()
const port = 3333
const url = 'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

const middleware = (req, res) => {
  const cep = req.body;
  console.log(cep)
  try {
    soap.createClient(url, {}, (err, client) => {
      client.consultaCEP(cep, (err, result) => {
        if (err) {
          res.status(500).json({ err: 'CEP Inválido!' });
        } else {
          res.status(200).json({ result });
        }
      })
    })
  } catch (e) {
    console.log(e);
  }
}

app.post('/', middleware, (req, res) => { })

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
