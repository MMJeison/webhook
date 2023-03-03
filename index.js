const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/webhook', (req, res) => {
  let sessionId = req.body.session.split('/').pop();
  if(req.cookies['sessionId']) {
    sessionId = req.cookies['sessionId'];
  } else {
    res.cookie('sessionId', sessionId, { httpOnly: true });
  }

  // Aquí puedes agregar la lógica necesaria para procesar la solicitud de DialogFlow 
  // utilizando el ID de sesión almacenado en la variable sessionId.

  res.json({ 
    fulfillmentText: 'Respuesta de prueba', 
    sessionId: sessionId 
  });
});

app.get('/webhook', (req, res) => {
    res.send('Webhook funcionando');
});

app.listen(3003, () => {
  console.log('Servidor iniciado en el puerto 3003');
  console.log('Puedes probar el webhook en http://localhost:3003/webhook');
});
