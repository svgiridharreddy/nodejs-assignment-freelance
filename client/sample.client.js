const axios = require('axios').default;
const config = require('../config');


class SampleClientError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}


class SampleClient {
  constructor(config) {
    this.baseUrl = config.baseUrl
    this.jsonUrl = config.dummy.jsonUrl;
    this.xmlUrl = config.dummy.xmlUrl;
    this.fileUrl = config.dummy.fileUrl;
    this.debug = config.debug;
  }

  api(method, url){
    if (this.debug) {
      console.log('request is : ', url);
    }
    const headers = {'Content-Type': 'application/json'}

    let req;
    if (method === 'get') {
      req = axios[method](`${url}`,headers);
    }
    return req
      .then((res) => res.data)
      .catch((err) => {
        if (this.debug) {
          console.log('CLIENT ERR:', err.message);
          console.log(err.stack);
        }
        if (err.response) {
          throw new SampleClientError(JSON.stringify(err.response.data));
        }
        throw err;
      });
  }


  getData(url) {
    return this.api('get', url);
  }
}

module.exports = new SampleClient(config);
// getXmlData(url){
//   return this.api('get', this.xmlUrl);
// }
//
// getFileData(){
//   return this.api('get', this.fileUrl);
// }
