const app = require('./app');

// app.listen(3000, () => 'server running on port 3000')

var serverless = require('serverless-http');
module.exports.handler = serverless(app);