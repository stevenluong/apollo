import React from 'react';
import Title from './Common/Title';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import RemoveIcon from '@material-ui/icons/Remove';
import BackspaceIcon from '@material-ui/icons/Backspace';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';

//REDUX
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

export default function Keywords() {
  var keywords = {}
  //console.log(props.news)

  const dispatch = useDispatch()
  const selectUser = state => state.user;
  const reduxUser = useSelector(selectUser);
  const selectFilters = state => state.filters;
  const reduxFilters = useSelector(selectFilters);
  //const selectNews = state => state.news;
  const reduxSourceFilteredNews = useSelector(state=>
    state.news.filter(n=>{
      return reduxUser.sources.indexOf(n.source)!==-1
    })
  );
  //console.log(reduxFilters);
  const filteredNews = useSelector(state =>
    state.news.filter(n=>{
      return reduxUser.sources.indexOf(n.source)!==-1
    }).filter(n=>{  //Keywords
      return reduxFilters.keywords.length === 0 || n.title.split(" ").filter(x=>reduxFilters.keywords.indexOf(x)!==-1).length>0
    }).filter(n=>{  //NoKeywords
      return reduxFilters.noKeywords.length === 0 || n.title.split(" ").filter(x=>reduxFilters.noKeywords.indexOf(x)!==-1).length===0
    })
  );

  reduxSourceFilteredNews.map(n=>{
    var t = n.title;
    var s = t.split(" ")
    return s.map(i =>{
      if(i in keywords)
        keywords[i] = keywords[i]+1;
      else
        keywords[i] = 1
      return keywords[i]
    })
  })
  var rawKeywords = []
  for(var key in keywords){
    if(key.length>4) //FILTER
      rawKeywords.push({
        word:key,
        count:keywords[key]
      })
  }

  const handleNoKeywordChange = (keyword) => {
    //var f = filters;
    //var k = reduxFilters.noKeywords;
    //console.log(keyword);
    //if(k.indexOf(keyword)==-1)
    //  k.push(keyword);
    //else {
    //  k.splice(k.indexOf(keyword),1)
    //}
    //var f = Object.assign(filters, {keywords:[...filters.keywords,k]})
    //var f = Object.assign(filters, {noKeywords:k})
    //setFilters(f);
    //setKeywordsFiltered(false);
    dispatch({type:'filters/noKeywordToggled', payload:keyword})
  }
  const handleReset = () => {
    //var f = filters;
    //console.log(k);
    //var f = Object.assign(filters, {keywords:[...filters.keywords,k]})
    //var f = Object.assign(filters, {keywords:[],noKeywords:[]})
    //setFilters(f);
    //setKeywordsFiltered(false);
    dispatch({type:'filters/filtersReset'})
  }
  const handleKeywordChange = (keyword) => {
    //var f = filters;
    //console.log(k);
    //var f = Object.assign(filters, {keywords:[...filters.keywords,k]})
    //var k = reduxFilters.keywords;
    //console.log(keyword);
    //if(k.indexOf(keyword)==-1)
    //  k.push(keyword);
    //else {
    //  k.splice(k.indexOf(keyword),1)
    //}
    //var f = Object.assign(filters, {keywords:k,noKeywords:[]})
    //setFilters(f);
    //setKeywordsFiltered(false);

    dispatch({type:'filters/keywordToggled', payload:keyword})
  }
  //console.log(rawKeywords)
  rawKeywords.sort(function(a, b){return b.count - a.count});
  rawKeywords = rawKeywords.slice(0,10);

  //console.log(keywords);
  return (
    <React.Fragment>
      <Title>Keywords</Title>
      <div>
      {rawKeywords.map((k,i) => (
        <React.Fragment key={k.word}>
        <Checkbox
          checked={reduxFilters.keywords.indexOf(k.word)!=-1}
          color="primary"
          size="small"
          //multiple ?
          style={reduxFilters.keywords.indexOf(k.word)!=-1?{}:{ display: 'none' }}
          onClick={()=>handleKeywordChange(k.word)}
        />
        <Link onClick={()=>handleKeywordChange(k.word)}>{k.word}</Link> ({k.count})
      <IconButton
      size="small"
      onClick={()=>handleNoKeywordChange(k.word)}
      style={reduxFilters.noKeywords.indexOf(k.word)!=-1?{}:{ display: 'none' }}
      >
        <BackspaceIcon fontSize="inherit"/>
      </IconButton>
      <IconButton
      size="small"
      onClick={()=>handleNoKeywordChange(k.word)}
      style={reduxFilters.noKeywords.indexOf(k.word)!=-1?{display: 'none'}:{}}
      >
        <BackspaceOutlinedIcon fontSize="inherit"/>
      </IconButton>

        <br/>
        </React.Fragment>
      ))}
      </div>
      <Button color="primary" variant="outlined" href="#" onClick={handleReset}>
        Reset
      </Button>

    </React.Fragment>
  );
}
