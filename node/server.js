var http = require('http');
//var io = require('socket.io');
var request = require('request');
var FeedParser = require('feedparser');

//var config = require('./config.json');

var server = http.createServer();
//server.listen(3030);
//var socket = io.listen(server);

//var server_url = "localhost:3000";
var server_url = "slapps.fr/apollo/ror";
var now = new Date();
var nNow = normalizeDate(now);
var before = now;
before.setMinutes(now.getMinutes()-15);
var nLast = normalizeDate(before);
//console.log(nNow);
//console.log(nLast);

// READ RSS
// TODO rework ? 
http.get('http://'+server_url+'/sources.json', (res) => {
        var body = '';
        res.on('data', function(chunk){
            body += chunk;
        });
        res.on('end', function(){
            var sources = JSON.parse(body);
            readAll(sources);
        });
        }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
});

function readAll(sources){
    sources.forEach(function(source){
        readRSS(source.name,source.rss_url);
    });
};
function readRSS(sourceName,sourceLink){
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
            if(nDate < nLast)
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
            console.log(key);
            ror_post(key,item.title,item.link,img,nDate,sourceName,"description");
            //TODO STRAIGHT UPDATE OF CLIENT
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
    var milli = date.getMilliseconds();
    return parseInt(year+month+day+hours+minutes+seconds+milli);
};
/*
   function done(err){
   if(err){
   console.log("SL error");
   console.log(err,err.stack);
   return process.exit(1);
   }
//server.close();
//process.exit();
}
*/
// UPDATE CLIENTS
/*
   socket.on('connection', function (socket) {
   console.log('connection');
   socket.emit('connected');

   socket.on('last items',function(){
   console.log('last items');
   var today = new Date();
   console.log(today);
   var yesterday = new Date();
   yesterday.setDate(today.getDate() -1);
   console.log(yesterday);
//TODO update client from ROR
});

});
*/
function ror_post(key,title,link,image_link,date,source, description){
    var data = {
        news: {
            guid: key,
            title: normalize(title),
            link: link,
            image_link: image_link,
            date: date,
            source: source
                //TODO description: normalize(title) 
        }
    };
    var dataStr = JSON.stringify(data);
    var options = {
        host: "slapps.fr",
        port: 80,
        path: '/apollo/ror/news.json',
        method: 'POST',
        headers: {
            'Content-Length': dataStr.length,
            'Content-Type': 'application/json'
        }
    };
    var str = '';

    var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(data) {
            str += data;
        });

        res.on('end', function() {
            //console.log(str);
        })

        res.on('error', function(error) {
            //console.log(error);
        })
    })
    req.on('error',function(e){
        console.log(e);
        console.log("SLerror");
    });
    req.end(dataStr);
}
function normalize(title){
    var space = title.toLowerCase().replace(/[ç]/g,"c").replace(/[üùû]/g,"u").replace(/[îï]/g,"i").replace(/[àâ]/g,"a").replace(/[öô]/g,"o").replace(/[œ]/g,"oe").replace(/[€ëéèê]/g,"e").replace(/[^a-zA-Z0-9]/g," ");
    return space; 
}

