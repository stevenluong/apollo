import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';
import Title from '../Common/Title';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import usersHelpers from './helpers';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(5),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));



export default function Profile({user,setUser}) {
  const classes = useStyles();

  const [edit, setEdit] = React.useState(false);
  //console.log(fetch);
  //const handleEmailChange = (e) => {
  //  setUser({...user, email:e.target.value});
  //};
  const handleBirthdateChange = (e) => {
    setUser({...user, birthdate:e.target.value});
  };
  const handleCountryChange = (e) => {
    setUser({...user, country:e.target.value});
  };
  const handleCurrencyChange = (e) => {
    setUser({...user, currency:e.target.value});
  };
  const handleSalaryChange = (e) => {
    setUser({...user, salary:e.target.value});
  };


  const handleEdit = () => {
    setEdit(true);
    //removeAsset(asset)
  };
  const handleSave = () => {
    usersHelpers.editUser(user,setUser)
    setEdit(false);
  };
  return (
        <Grid container>
          <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Title>Profile</Title>
            <div>Email : {user.email} </div><br/>
            <div>
            {edit?
            <TextField
                id="birthdate"
                label="Birthdate"
                variant="outlined"
                onChange={handleBirthdateChange}
                value={user.birthdate}
                component="span"
              />
              : <span>Birthdate : {user.birthdate}</span>}
            </div><br/>
              <div>
            {edit?
              <TextField
                  id="salary"
                  label="Salary"
                  variant="outlined"
                  onChange={handleSalaryChange}
                  value={user.salary}
                  component="span"
                />
                : <span>Salary : {user.salary}</span>}
              </div><br/>
              <div>
            {edit?
                <TextField
                    id="currency"
                    label="Currency"
                    variant="outlined"
                    onChange={handleCurrencyChange}
                    value={user.currency}
                    component="span"
                  />
                  : <span>Currency : {user.currency}</span>}
          </div><br/>
          <div>
          {edit?
            <TextField
                id="country"
                label="Country"
                variant="outlined"
                onChange={handleCountryChange}
                value={user.country}
                component="span"
              />
              : <span>Country : {user.country}</span>}
          </div><br/>

        {edit?
            <Button
          variant="contained"
          color="primary"
          onClick = {handleSave}
          className={classes.button}
          size="small"
          >
            Save
          </Button>
          :
          <Button
        variant="contained"
        color="primary"
        onClick = {handleEdit}
        className={classes.button}
        size="small"
        >
          Edit
        </Button>
      }

          </Paper>
          </Grid>
        </Grid>
  );
}
