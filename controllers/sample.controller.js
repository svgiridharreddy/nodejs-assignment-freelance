const fs = require('fs');
const path = require('path');
const csvToJson = require('csvtojson');
var convert = require('xml-js');
const sampleClient = require('../client/sample.client');
const config = require('../config');
const getJsonData= async(req,res) => {
  const jsonUrl = config.dummy.jsonUrl;
  try {
    const resp = await sampleClient.getData(jsonUrl);
    console.log("json response is : ", resp);
    res.status(200).send({success: true, result: resp});
  } catch(err) {
    console.log(err);
    res.status(412).send({success: false, message: err.message});
  }
}

const getXmlData = async(req,res) => {
  const xmlUrl = config.dummy.xmlUrl;
  console.log("xml url is : ", xmlUrl);
  try {
    const response = await sampleClient.getData(xmlUrl);
    console.log("xml response is : ", response);

    const jsonResponse = await convertXmlToJson(response);

    console.log("xml to json response is : ", jsonResponse);
    res.status(200).send({success: true, result: jsonResponse});
  } catch(err) {
    res.status(412).send({success: false, message: err.message});
  }
}

const getFileData = async(req,res) => {
  const fileUrl = config.dummy.xmlUrl;
  try {
    const response = await sampleClient.getData(fileUrl);
    res.status(200).send({success: true, result: response});
  } catch(err) {
    res.status(412).send({success: false, message: err.message});
  }
}

const convetCsvToJson = async(req,res) => {
  const csvDetails = {filePath:  path.join(__dirname,"../temp/sample.csv"),event: "sample event"}
  let fileName = csvDetails["filePath"]
  const response = await convertToJson(fileName);
    console.log("response is : ", response);
  if(response["data"] && response.status === 200) {
    res.send(response["data"]);
  }else{
    res.send({message: response["message"],status: response['status']})
  }
}


const convertToJson = async(fileName) => {
  const response = await(csvToJson().fromFile(fileName)
    .then(data => {
        return {data: data,message: "success",status: 200};
    }).catch(err => {
        return {message: "failure",status: 500};
    }));
    return response;
}

const convertXmlToJson = async(response) => {
  const resp =  await convert.xml2json(response, {compact: true, spaces: 4})
  return JSON.parse(resp);
}


module.exports = {
  getJsonData,
  getXmlData,
  getFileData,
  convetCsvToJson
}
