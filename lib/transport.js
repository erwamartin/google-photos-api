'use strict';

import axios from 'axios';

const apiConstants = require('../constants/api');

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
    });
  }

  // upload(fileName, filePath, requestTimeout) {
  //   return axiosInstance
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
  // }

  post(endpoint, params) {
    return axiosInstance
      .post(endpoint, params, {
        headers: this._getHeaders(),
      });
  }

  _getHeaders() {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    };
  }
}

module.exports = Transport;
