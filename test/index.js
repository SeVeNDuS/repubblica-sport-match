var should = require('should');
var RepubblicaSportMatchCrawler = require('../lib/index.js');

describe('Repubblica Sport Match', function () {
    'use strict';

    it('return err when no URL is passed', function (done) {
        var crawler = new RepubblicaSportMatchCrawler();
        crawler.load(function (err, data) {
            should.exist(err);
            err.message.should.be.equal('load.error.urlNeeded');
            should.not.exist(data);
            done();
        });
    });

});