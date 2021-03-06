var http = require('http');
//var io = require('socket.io');
var request = require('request');
var FeedParser = require('feedparser');
var COMMON = require('./common.js');
//Variables config
var server_host= "apollo_loopback_1";
var server_port = "3000";
var news_path = '/api/News';
var sources_path = '/api/Sources';
//
console.log('-Start');
var CronJob = require('cron').CronJob;
var cronJob = new CronJob({
    cronTime: '0 0 * * * *', 
    onTick: function() {
        process();
    }
});
cronJob.start();

//var config = require('./config.json');

//var server = http.createServer();
//var socket = io.listen(server);
//TODO CLEAN var minutes = 15;
var process = function(){
    //TODO Clean up
    //var now = new Date();
    //var nNow = normalizeDate(now);
    //var before = now;
    //before.setMinutes(now.getMinutes()-minutes);
    //var nLast = normalizeDate(before);
    //console.log(nNow);
    //console.log(nLast);
    var options = {
        host: server_host,
        port: server_port,
        path: sources_path,
        method: 'GET'
    };

    console.log(options);
    http.request(options, function(res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            //console.log('BODY: ' + chunk);
            var sources = JSON.parse(chunk);
            readAll(sources);
        });
    }).end();
}

process();
var readAll = function(sources){
    sources.forEach(function(source){
        readRSS(source.name,source.rss_url);
    });
};
function readRSS(sourceName,sourceLink){
    var now = new Date();
    console.log(now);
    var start = new Date();
    start.setHours(now.getHours(),0,0,0);
    var end = new Date();
    end.setHours(now.getHours(),59,59,999);
    var nNow = normalizeDate(now);
    console.log(nNow);
    var feedparser = new FeedParser();
    var req = request(sourceLink);
    //req.on('error', done);
    req.on('response', function (res) {
        var stream = this;
        if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
        stream.pipe(feedparser);
    });
    feedparser.on('error', function(data){
        console.log(this);
        console.log(data);
    });
    //feedparser.on('end', done);
    feedparser.on('readable', function() {
        var item;
        while (item = this.read()) {
            var nDate = normalizeDate(item.pubDate);
            var date = item.pubDate;
            console.log(now);
            console.log(nNow);
            console.log(start);
            console.log(date);
            console.log(end);
            if(date < start && date > end)
                continue;
            var img = "";
            if(item.enclosures[0]!=undefined){
                img = item.enclosures[0].url;
            };
            var getImageLink = function(field,start,end){
                var n = field.indexOf(start);
                var tmp = item.description.substring(n+start.length);
                var m = tmp.indexOf(end);
                var img = tmp.substring(0,m);
                //console.log(sourceName+' - '+img);
                return img;
            }
            if(sourceName=="The Verge") {
                img=getImageLink(item.description,'src="','"');
            }
            if(sourceName=="Korben") {
                img=getImageLink(item.description,'src="','"');
            }
            if(sourceName=="BBC") {
                img=item.image.url;
            }
            if(sourceName=="LifeHacker") {
                img=getImageLink(item.description,'<img src="','" />');
            }
            if(sourceName=="JDG") {
                img=getImageLink(item.description,'src="','"');
            }

            var key = nDate+':'+sourceName;
            console.log('['+nNow+']'+key);
            var data = {
                news: {
                    guid: key,
                    title: normalize(item.title),
                    link: item.link,
                    image_link: img,
                    datetime: date,
                    source: sourceName
                        //TODO description: normalize(title) 
                }
            };
            //COMMON.ror_post(data,server_host,server_port,news_path,function(res){
            //});
            //console.log("queue.create")
            //queue.create('news',data.news).ttl(600000).removeOnComplete(true).save();
            //TODO STRAIGHT UPDATE OF CLIENT
            COMMON.ror_post(data.news,server_host,server_port,news_path,function(res){
                //console.log(res);
            });
        };
    });
};
function normalizeDate(date){
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);
    var seconds = ("0" + date.getSeconds()).slice(-2);
    var milli = ("00"+date.getMilliseconds()).slice(-3);
    return parseInt(year+month+day+hours+minutes+seconds+milli);
};
function normalize(title){
    var space = title.toLowerCase().replace(/[ç]/g,"c").replace(/[üùû]/g,"u").replace(/[îï]/g,"i").replace(/[àâ]/g,"a").replace(/[öô]/g,"o").replace(/[œ]/g,"oe").replace(/[€ëéèê]/g,"e").replace(/[^a-zA-Z0-9]/g," ");
    return space; 
}

