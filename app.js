const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;
const path = require('path');
const routesCards = require('./routes/cards.js');
const routersUsers = require('./routes/users.js');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/cards', routesCards);
app.use('/users', routersUsers);
app.use('/*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
