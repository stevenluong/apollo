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

export default function Analytics() {
  const classes = useStyles();

  //REDUX
  const dispatch = useDispatch()
  //const selectNews = state => state.news;
  //const reduxNews = useSelector(selectNews);
  //const selectSources = state => state.sources;
  //const reduxSources = useSelector(selectSources);
  const selectUser = state => state.user;
  const reduxUser = useSelector(selectUser);

  //var keywords = {}
  //var userSources = user.sources;
  //if(sources)
  //console.log(user)
  //var topics = {"test":3};
  //var allInterests = []
  var sortedInterests = []
  //Object.keys(reduxUser.interests).forEach(i=>{
  //  allInterests.push({
  //    interest:i,
  //    count:reduxUser.interests[i]
  //  })
  //})
  sortedInterests = reduxUser.interests.sort((a,b) => (b.count-a.count))
  //topics = user.topics;
  //var sortedTopics = []

  //console.log(topics);
  //console.log(Object.keys(topics));
  sortedInterests = sortedInterests.slice(0,100);
  return (
    <Grid container>
      <Grid item xs={12} md={12} lg={12}>
      <Paper className={classes.paper}>
      <Title>Analytics</Title>
      <div>
      {sortedInterests.map(i => (
        <React.Fragment key={i.word}>
        {i.word} - {i.count}
        <br/>
        </React.Fragment>
      ))}
      </div>

      </Paper>
      </Grid>
    </Grid>
  );
}
