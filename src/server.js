const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addUser') {
    const body = [];// buffer

    // event based system
    request.on('error', (err) => {
      // callback fns coming from HTTP library
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    // data event
    request.on('data', (chunk) => {
      // want to add chunk of data to the array
      body.push(chunk);
    });

    // end event
    request.on('end', () => {
      // built in fns for array.., takes all elements and combines them into a single element
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      // call our handler
      jsonHandler.addUser(request, response, bodyParams);
    });
  }
};

const handleGet = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (parsedUrl.pathname === '/getUsers') {
    jsonHandler.getUsers(request, response);
  } else {
    htmlHandler.getIndex(request, response);
  }
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else {
    handleGet(request, response, parsedUrl);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
