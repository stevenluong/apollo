import apiConfig from './Base/apiConfig';
import moment from 'moment';

export default {
  getNews: function(cb){
    //var news = rows;
    //news.push({})
    //var start = new Date(currentDate);
    var start = new Date();
    start.setDate(start.getDate()-1);
    //start.setDate(currentDate.getDate()-1);
    start.setHours(0,0,0,0);
    //TODO GOOD
    var s = start.toISOString();
    //console.log("s:"+s);
    var end = new Date();
    end.setHours(23,59,59,999);
    //TODO GOOD
    var e = end.toISOString();
    //console.log("e:"+e);
    //var q = "https://apollo-loopback.slapps.fr/api/News?filter[where][and][0][datetime][gt]="+s+"&filter[where][and][1][datetime][lt]="+e
    var q = apiConfig.server+apiConfig.dbUrl+"/news";
    //console.log(q)
    fetch(q)
        .then(result=>result.json())
        .then(titles=>{
            //console.log(titles);
            //this.setState({titles:titles});
            var news = []
            news = titles.map(n=>{
              return {
                ...n,
                link:n.link.replace("http:","https:"),
                image_link:n.image_link.replace("http:","https:"),
                time:moment(n.datetime).format("HH:mm"),
                title:n.title.trim().charAt(0).toUpperCase() + n.title.trim().slice(1)
              }
            });
            //news = titles;
            cb(news);
        });
    //return news;
  },

  getSources: function(cb){
    var q = apiConfig.server+apiConfig.dbUrl+"/sources"
    //console.log(q)
    fetch(q)
        .then(result=>result.json())
        .then(sources=>{
            //var s = []
            //sources.forEach(source => {
            //  s.push({
            //    name:source.name,
            //    language:source.language
            //  })
            //})
            cb(sources);
            //console.log(s);
        });
  }
}
