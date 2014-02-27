var should = require('should');
var RepubblicaSportMatchCrawler = require('../lib/index.js');

describe('Repubblica Sport Match', function () {
    'use strict';

    it('return null on err and data', function (done) {

        var crawler = new RepubblicaSportMatchCrawler();
        crawler.load(function (err, data) {
            should.not.exist(err);
            should.not.exist(data);
            done();
        });
    });

});