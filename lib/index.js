var cheerio = require('cheerio');
var request = require('request');
var url = require('url');

function Crawler() {
    'use strict';
}

var getCodeFromLink = function (link) {
    'use strict';

    var parts = link.split('/');

    return parts[parts.length - 1];
};

var getDataFromPlayer = function (player) {
    'use strict';

    var thePlayer,
        data = $(player).children('td');

    if (data.length === 3) {
        var playerLink = $(data[1]).children('a');
        thePlayer = {
            code: getCodeFromLink(playerLink.attr('href')),
            name: playerLink.text(),
            points: Number($(data[2]).text())
        };
    }

    return thePlayer;
};

var extractPlayersFromDatatable = function (datatable) {
    var team = [];

    var players = $(datatable).children('tbody').children('tr');
    if (players.length === 0) {
        players = $(datatable).children('tr');
    }
    $(players).each(function (i, player) {
        var aPlayer = getDataFromPlayer(player);
        if (aPlayer) {
            team.push(aPlayer);
        } 
    });

    return team;
};

var extractDataFromUrl = function (url, callback) {
    var result = [];
    request(url, function (err, resp, body) {
        $ = cheerio.load(body);

        if (err) {
            callback(new Error('request.error'));
        } else {
            var tables = $('table.datatables');
            $(tables).each(function (i, table) {
                result.push(extractPlayersFromDatatable(table));
            });
            result = result[0].concat(result[1]);

            callback(null, result);
        }
    });
};

Crawler.prototype.generateLink = function (champId, round, homeTeam, awayTeam) {
    return 'http://www.repubblica.it/sport/dirette/tabellino/calcio/italia/serie-a/A/' + homeTeam + '/' + awayTeam;
};

Crawler.prototype.get = function(theUrl, callback) {
    'use strict';

    var parsedUrl = url.parse(theUrl);
    if (parsedUrl.host === 'sport.repubblica.it' || parsedUrl.host === 'www.repubblica.it') {
        extractDataFromUrl(theUrl, callback);
    } else {
        callback(new Error('load.error.invalidUrl'));
    }
};

module.exports = Crawler;