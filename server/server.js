const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 5000;

const renderRoute = require('./routes/render');

app.use('/', renderRoute);

app.use(express.static(path.resolve('../client/build/static')));

app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
});