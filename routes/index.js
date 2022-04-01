
const sampleRouter = require('./sample');

const routes = (app) => {
  app.use('/sample', sampleRouter);

  app.get('/status', (req, res) => {
    return res.send({ message: "Sample app is Running,"});
  })
}

module.exports = routes;
