import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import moment from 'moment';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Day({user}) {
  const classes = useStyles();
  //console.log(user)
  //var lastVisit = moment();
  //if(user.visits && user.visits.length>=2)
  //  lastVisit = user.visits[user.visits.length-2];
  return (
    <React.Fragment>
      <Title>{moment().format("DD/MM/YYYY")}</Title>
      <Typography color="textSecondary" className={classes.depositContext}>
        Updated at {moment().format("HH:00")}
      </Typography>
    </React.Fragment>
  );
}
