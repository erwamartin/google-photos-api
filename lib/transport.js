'use strict';

// const fs = require('fs');

import axios from 'axios';

const apiConstants = require('../constants/api');

// const ky = require('ky-universal').create({
//   prefixUrl: apiConstants.HOST,
// });

const axiosInstance = axios.create({
  baseURL: apiConstants.HOST,
});

class Transport {
  constructor(authToken) {
    this.authToken = authToken;
  }

  get(endpoint, params) {
    return axiosInstance.get(endpoint, {
      headers: this._getHeaders(),
      params: params,
    }).json();
  }

  // upload(fileName, filePath, requestTimeout) {
  //   return ky
  //     .post('v1/uploads', {
  //       headers: {
  //         'Content-Type': 'application/octet-stream',
  //         Authorization: `Bearer ${this.authToken}`,
  //         'X-Goog-Upload-File-Name': fileName,
  //         'X-Goog-Upload-Protocol': 'raw',
  //       },
  //       body: fs.readFileSync(filePath),
  //       timeout: requestTimeout,
  //     })
  //     .text();
  // }

  post(endpoint, params) {
    return axiosInstance
      .post(endpoint, {
        headers: this._getHeaders(),
        data: params,
      })
      .json();
  }

  _getHeaders() {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    };
  }
}

module.exports = Transport;
