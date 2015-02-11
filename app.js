'use strict';

var kraken = require('kraken-js'),
    app = require('express')(),
    options = require('./lib/index')(app),
    port = process.env.PORT || 3000;

app.use(kraken(options));

app.listen(port, function(err) {
    console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
});
