var should = require('should');
var sinon = require('sinon');
var RepubblicaSportMatchCrawler = require('../lib/index.js');

describe('Repubblica Sport Match', function () {
    'use strict';

    it('returns err when no URL is passed', function (done) {
        var crawler = new RepubblicaSportMatchCrawler();
        crawler.get(function (err, data) {
            should.exist(err);
            err.message.should.be.equal('get.error.urlNeeded');
            should.not.exist(data);
            done();
        });
    });

    it('returns invalid host when non repubblica URL is passed', function (done) {
        var options = {
            url: 'http://www.google.com'
        };

        var crawler = new RepubblicaSportMatchCrawler(options);
        crawler.get(function (err, data) {
            should.exist(err);
            err.message.should.be.equal('get.error.invalidUrl');
            should.not.exist(data);
            done();
        });
    });

    it('returns no err when URL is passed', function (done) {
        var options = {
            url: 'http://sport.repubblica.it/tabellino/A/Bologna/Roma?refresh_ce'
        };

        var crawler = new RepubblicaSportMatchCrawler(options);
        crawler.get(function (err, data) {
            should.not.exist(err);
            done();
        });
    });

    it('returns an array with 28 players data', function (done) {
        var options = {
            url: 'http://sport.repubblica.it/tabellino/A/Bologna/Roma?refresh_ce'
        };

        var crawler = new RepubblicaSportMatchCrawler(options);
        crawler.get(function (err, data) {
            should.not.exist(err);
            should.exist(data);
            data.length.should.be.equal(28);

            var player = data[0];
            player.should.have.property('code');
            player.should.have.property('name');
            player.should.have.property('points');

            done();
        });
    });
});