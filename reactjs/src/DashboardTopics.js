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


export default function DashboardTopics() {


  //REDUX
  const dispatch = useDispatch()
  const selectNews = state => state.news;
  const reduxNews = useSelector(selectNews);
  const selectUser = state => state.user;
  const reduxUser = useSelector(selectUser);
  const selectFilters = state => state.filters;
  const reduxFilters = useSelector(selectFilters);


  const filteredNews = useSelector(state =>
    state.news.filter(n=>{
      return reduxUser.sources.indexOf(n.source)!==-1
    }).filter(n=>{  //Keywords
      return reduxFilters.keywords.length === 0 || n.title.split(" ").filter(x=>reduxFilters.keywords.indexOf(x)!==-1).length>0
    }).filter(n=>{  //NoKeywords
      return reduxFilters.noKeywords.length === 0 || n.title.split(" ").filter(x=>reduxFilters.noKeywords.indexOf(x)!==-1).length===0
    })
  );
  var map = {}
  var topics = reduxUser.topics
  //console.log(props.news)
  topics.forEach(t=>{
    map[t]=0;
  })
  filteredNews.map(n=>{
    var t = n.title;
    var s = t.split(" ")
    return s.map(i =>{
      if(topics.indexOf(i)!=-1){
          map[i] = map[i]+1;
      }
      return map[i]
    })
  })
  var rawTopics = []
  for(var key in map){
      rawTopics.push({
        word:key,
        count:map[key]
      })
  }

  const handleNoKeywordChange = (keyword) => {
    dispatch({type:'filters/noKeywordToggled', payload:keyword})
  }
  const handleReset = () => {
    dispatch({type:'filters/filtersReset'})
  }
  const handleKeywordChange = (keyword) => {
    dispatch({type:'filters/keywordToggled', payload:keyword})
  }
  //console.log(rawKeywords)
  //rawTopics.sort(function(a, b){return b.count - a.count});
  //rawKeywords = rawKeywords.slice(0,20);

  //console.log(keywords);
  return (
    <React.Fragment>
      <Title>Topics</Title>
      <div>
      {rawTopics.map((k,i) => (
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
