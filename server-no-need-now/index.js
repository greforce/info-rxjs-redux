const express = require('express');
const cors = require('cors');
const myip = require('my-local-ip');

const app = express();
app.use(cors());

app.get('/test5', (req, res) => {
  const response = [1, 2, 3];
  setTimeout(() => res.send(response), 5000);
});

app.get('/test8', (req, res) => {
  const response = ['a', 'b', 'c', 'd', 'e'];
  setTimeout(() => res.send(response), 8000);
});

app.get('/error', (req, res) => {
  res.status(500);
  res.send('nope, it is error 401!');
});

app.listen(8888);
console.log('server local ip4', myip());
