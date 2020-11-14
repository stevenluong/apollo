import React from 'react';
import Title from './Common/Title';
import TextField from '@material-ui/core/TextField';
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

export default function Search() {

  const dispatch = useDispatch()
  //const selectUser = state => state.user;
  //const reduxUser = useSelector(selectUser);
  const selectFilters = state => state.filters;
  const reduxFilters = useSelector(selectFilters);

  //var search = {}
  const handleSearchChange = (search) => {
    //var f = {}
    //if(search!=="")
    //  f = Object.assign(filters, {keywords:[search],noKeywords:[]})
    //else
    //  f = Object.assign(filters, {keywords:[],noKeywords:[]})
    //console.log(f)
    console.log(search)
    //setFilters(f);
    //setKeywordsFiltered(false);
    dispatch({type:'filters/filtersReset'})
    dispatch({type:'filters/keywordToggled', payload:search.split(' ')})

  }

  //console.log(keywords);
  return (
    <React.Fragment>
      <div>
        <TextField id="outlined-basic" label="Search" variant="outlined" onChange={(e)=>handleSearchChange(e.target.value)}/>
      </div>
    </React.Fragment>
  );
}
