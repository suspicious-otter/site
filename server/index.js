require('now-env');

const express = require('express');
const next = require('next');
const { parse } = require('url');

const { NODE_ENV, PORT = 3001 } = process.env;

const dev = NODE_ENV !== 'production';

const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

async function main() {
  await app.prepare();

  const server = express();

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  return new Promise((resolve, reject) => {
    server.listen(PORT, error => {
      if (error) return reject(error);
      return resolve();
    });
  });
}

function successHandler() {
  console.log(`> Ready on http://localhost:${PORT}`);
}

function errorHandler(error) {
  console.error(error);
  process.exit(0);
}

main()
  .then(successHandler)
  .catch(errorHandler);
