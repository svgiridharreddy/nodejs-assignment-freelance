const express = require('express');
const { sample: sampleController } = require('../controllers');

const sampleRouter = express.Router();

sampleRouter.get('/json', sampleController.getJsonData);
sampleRouter.get('/xml-to-json',sampleController.getXmlData);
sampleRouter.get('/csv-to-json',sampleController.convetCsvToJson);
sampleRouter.get('/file',sampleController.getFileData);

module.exports = sampleRouter;
