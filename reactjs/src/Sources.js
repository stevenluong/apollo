import React from 'react';
import Title from './Common/Title';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

//REDUX
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(5),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));

export default function Sources() {
  const classes = useStyles();
  //var keywords = {}
  //var userSources = user.sources;
  //if(sources)
  //REDUX
  const dispatch = useDispatch()
  //const selectNews = state => state.news;
  //const reduxNews = useSelector(selectNews);
  const selectSources = state => state.sources;
  const reduxSources = useSelector(selectSources);
  const selectUser = state => state.user;
  const reduxUser = useSelector(selectUser);

  const handleSourceChange = (s) => {
    //var f = filters;
    //console.log(s);
    //console.log(userSources.indexOf(s.name));
    //if(user.sources.indexOf(s.name)==-1){
    //  user.sources.push(s.name)
    //}else{
    //  user.sources.splice(user.sources.indexOf(s.name),1)
    //}
    dispatch({type:"user/sourceToggled", payload:s})
    //user.sources=userSources;
    //console.log(reduxUser.sources);
    //console.log(userSources);

    //var i = reduxUser.sources.indexOf(s);
    //var sources = i===-1?[...reduxUser.sources].concat(s):[...reduxUser.sources].filter(k=>k!==s)
    //var u = Object.assign(reduxUser, {sources:sources})
    //setUser(u);
    //console.log(u);
    //updateUser(u);
    //var s = Object.assign(sources)
    //setSources(s);
    //var f = Object.assign(filters, {sources: userSources})
    //setFilters(f);
    //console.log(f);
    //setSourcesFiltered(false);
    //setKeywordsFiltered(false);
    //var f = Object.assign(filters, {keywords:[...filters.keywords,k]})
    //var f = Object.assign(filters, {sources:userSources})
    //setFilters(f);
    //setFiltered(false);
  }

  //console.log(keywords);
  return (
    <Grid container>
      <Grid item xs={12} md={12} lg={12}>
      <Paper className={classes.paper}>
      <Title>Sources</Title>
      <div>
      {reduxSources.map((s,i) => (
        <React.Fragment key={s.name}>
        <Checkbox
         checked={reduxUser.sources.indexOf(s.name)!=-1}
         color="primary"
         onClick={()=>handleSourceChange(s.name)}
        />
        {s.name} - {s.language}
        <br/>
        </React.Fragment>
      ))}
      </div>

      </Paper>
      </Grid>
    </Grid>
  );
}
