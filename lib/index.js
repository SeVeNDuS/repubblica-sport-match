var cheerio = require('cheerio');
var request = require('request');

function Crawler(options) {
    'use strict';

    this.options = options;
}

Crawler.prototype.load = function(callback) {
    'use strict';

    callback(null, null);
};

module.exports = Crawler;