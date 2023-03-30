//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/final-year-project-macro-social'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/final-year-project-macro-social/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 9090);
