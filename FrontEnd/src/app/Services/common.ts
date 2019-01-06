
import { HttpHeaders } from '@angular/common/http';

var accessPointUrlBase = 'http://localhost:57115/api/';
var generateHeaders = function (password: string): HttpHeaders {
    var headers = { 'Content-Type': 'application/json; charset=utf-8' }
    if (password) headers['Authorization'] = password;
    return new HttpHeaders(headers);
};

export { accessPointUrlBase, generateHeaders };