import React from 'react';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import Title from './Common/Title';
import Hidden from '@material-ui/core/Hidden';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import Done from '@material-ui/icons/Done';
import WhatshotIcon from '@material-ui/icons/Whatshot';

//REDUX
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

export default function News() {
  //var cleanedNews = props.news;
  //REDUX
  const dispatch = useDispatch()
  const selectNews = state => state.news;
  const reduxNews = useSelector(selectNews);
  const selectUser = state => state.user;
  const reduxUser = useSelector(selectUser);
  const selectFilters = state => state.filters;
  const reduxFilters = useSelector(selectFilters);
  //var latestNews = reduxUser.latestNews;
  const filteredNews = useSelector(state =>
    state.news.filter(n=>{
      return reduxUser.sources.indexOf(n.source)!==-1
    }).filter(n=>{  //Keywords
      return reduxFilters.keywords.length === 0 || n.title.split(" ").filter(x=>reduxFilters.keywords.indexOf(x)!==-1).length>0
    }).filter(n=>{  //NoKeywords
      return reduxFilters.noKeywords.length === 0 || n.title.split(" ").filter(x=>reduxFilters.noKeywords.indexOf(x)!==-1).length===0
    })
  );
  var sortedNews = filteredNews.slice().sort((a,b)=>(new Date(b.datetime))-(new Date(a.datetime)))
  const imgStyle = {
    "objectFit": "cover",
  };

  const handleLinkClick = (n) => {
    //console.log(n);
    /*
    var t = reduxUser.interests;
    var s = n.title.split(" ");
    s.forEach(w => {
      if(w.length<4)
        return false;
      //console.log(w);
      if(w in t)
        t[w] = t[w]+1;
      else
        t[w] = 1
    })
    var t2 = [];
    for(var i in t){
      t2.push({
        word:i,
        count:t[i]
      })
    }
    console.log(t);
    */
    //var u = Object.assign(reduxUser, {interests:t,interests2:t2})
    //setUser(u);
    //var latestNews =reduxUser.latestNews;
    dispatch({type:'user/titleClicked',payload:n})

    /*
    if(!reduxUser.latestNews || reduxUser.latestNews.datetime<n.datetime){
      //u = Object.assign(reduxUser, {lastestNews:n})
      dispatch({type:'user/latestNewsUpdated',payload:n})
    }
    */
    //console.log(u);
    //updateUser(u);
  }
  //console.log(user.visits)
  return (
    <React.Fragment>
      <Title id="news">News ({sortedNews.length})</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
          <Hidden xlDown>
            <TableCell>Image</TableCell>
          </Hidden>
            <TableCell>Time-Source</TableCell>
            <TableCell>Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedNews.map(n => (
            <TableRow key={n.link}>
            <Hidden xlDown>
              <TableCell><img style={imgStyle} src={n.image_link} height="40" width="40" alt=""/></TableCell>
            </Hidden>
              <TableCell style={{width: "10%"}}><small>{n.time}<br/>{n.source}</small></TableCell>
              <TableCell style={{width: "90%"}}>
              <WhatshotIcon style={n.title.split(" ").filter(w=>reduxUser.topics.indexOf(w)!==-1).length>0?{}:{display: 'none'}} fontSize="small"/>
              <Link href={n.link} target="_blank" rel="noopener noreferrer" onClick={()=>handleLinkClick(n)} color={reduxUser.readNews.map(n=>n._id).indexOf(n._id)==-1?"primary":"textPrimary"}>
                {n.title}
              </Link>
              <Done style={reduxUser.readNews.map(n=>n._id).indexOf(n._id)!==-1?{}:{display: 'none'}} fontSize="small"/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
