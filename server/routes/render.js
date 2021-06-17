const express = require('express');
const path = require('path');
const fs = require('fs');

const React = require('react');
const ReactDOMServer = require('react-dom/server');

import App from '../../client/src/components/App';

const router = express.Router();

router.get('/', (req, res) => {

    const app = ReactDOMServer.renderToString(<App />);

    let indexHtml = path.resolve('../client/build/static/index.html');

    fs.readFile(indexHtml, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Ups! Algo salió mal');
        }

        return res.send(
            data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
        );
    });

});

module.exports = router;