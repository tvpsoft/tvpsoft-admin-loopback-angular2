"use strict";
/**
 * UNIVERSAL DEPENDENCIES
 */
require('angular2-universal/polyfills');
var NG2Universal = require('angular2-universal');
var client = require('./dist/app');
var server = require('../server/server');
var path = require('path');
/**
 * Enable Prod Mode
 */
NG2Universal.enableProdMode();
/**
 * REQUIRED PROPERTIES
 */
var baseUrl = '/';
/**
 * LOG LOOBACK UNIVERSAL STARTER
 */
console.log('\nANGULAR UNIVERSAL: SERVER SIDE RENDERING WITH STRONGLOOP\n');
/**
 * SERVER CONFIGURATIONS
 */
server.engine('.html', NG2Universal.expressEngine);
server.set('views', __dirname + '/dist');
server.set('view engine', 'html');
server.set('view options', { doctype: 'html' });
server.use(server.loopback.static(path.join(__dirname, 'dist'), { index: false }));
server.use(server.loopback.static(path.join(__dirname, 'src'), { index: false }));
server.use(baseUrl, function ngApp(req, res) {
    var url = req.originalUrl || baseUrl;
    var config = {
        directives: [client.ClientAppComponent],
        platformProviders: [
            NG2Universal.provide(NG2Universal.ORIGIN_URL, { useValue: 'http://localhost:' + server.get('port') }),
            NG2Universal.provide(NG2Universal.BASE_URL, { useValue: baseUrl }),
        ],
        providers: [
            NG2Universal.provide(NG2Universal.REQUEST_URL, { useValue: url }),
            NG2Universal.NODE_ROUTER_PROVIDERS,
            NG2Universal.NODE_HTTP_PROVIDERS,
        ],
        async: true,
        preboot: { appRoot: 'client-app' }
    };
    res.render('index', config);
});
/**
 * START ANGULAR UNIVERSAL: SERVER SIDE RENDERING WITH STRONGLOOP
 */
server.start();
