var cheerio = require('cheerio');
var request = require('request');
var url = require('url');

function Crawler(options) {
    'use strict';

    this.options = options;
}

Crawler.prototype.load = function(callback) {
    'use strict';

    if (!this.options || !this.options.url) {
        callback(new Error('load.error.urlNeeded'));
    } else {
        var parsedUrl = url.parse(this.options.url); 
        if (parsedUrl.host === 'sport.repubblica.it') {
            callback();
        } else {
            callback(new Error('load.error.invalidUrl'));
        }
        
    }
};

module.exports = Crawler;