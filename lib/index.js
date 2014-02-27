var cheerio = require('cheerio');
var request = require('request');

function Crawler(options) {
    'use strict';

    this.options = options;
}

Crawler.prototype.load = function(callback) {
    'use strict';

    if (!this.options || !this.options.url) {
        callback(new Error('load.error.urlNeeded'));
    } else {
        callback(null, null);
    }
};

module.exports = Crawler;