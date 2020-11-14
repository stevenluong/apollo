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
  var latestNews = reduxUser.latestNews;
  const filteredNews = useSelector(state =>
    state.news.filter(n=>{
      return reduxUser.sources.indexOf(n.source)!==-1
    }).filter(n=>{  //Keywords
      return reduxFilters.keywords.length === 0 || n.title.split(" ").filter(x=>reduxFilters.keywords.indexOf(x)!==-1).length>0
    }).filter(n=>{  //NoKeywords
      return reduxFilters.noKeywords.length === 0 || n.title.split(" ").filter(x=>reduxFilters.noKeywords.indexOf(x)!==-1).length===0
    })
  );
  var sortedNews = filteredNews.sort((a,b)=>(new Date(b.datetime))-(new Date(a.datetime)))
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
    dispatch({type:'user/titleClicked',payload:n.title})
    var latestNews =reduxUser.latestNews;
    if(!reduxUser.latestNews || reduxUser.latestNews.datetime<n.datetime){
      //u = Object.assign(reduxUser, {lastestNews:n})
      dispatch({type:'user/latestNewsUpdated',payload:n})
    }
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
              <TableCell><small>{n.time}<br/>{n.source}</small></TableCell>
              <TableCell>
              <VerticalAlignTopIcon style={latestNews._id!=n._id?{display: 'none'}:{}}/>
              <Link href={n.link} target="_blank" rel="noopener noreferrer" onClick={()=>handleLinkClick(n)}>{n.title} </Link>
               </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
