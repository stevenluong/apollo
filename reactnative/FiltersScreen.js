import React from 'react';

//REDUX
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import {
  //SafeAreaView,
  //StyleSheet,
  ScrollView,
  Text,
  StatusBar,
  Linking
} from 'react-native';

import {
  Button,
  ListItem,
  Header,
  Icon,
  Card,
  CheckBox
  } from 'react-native-elements';


export default function FiltersScreen() {
  //const dispatch = useDispatch()

  //REDUX
  //const dispatch = useDispatch()
  const selectNews = state => state.news;
  const reduxNews = useSelector(selectNews);
  const selectSources = state => state.sources;
  const reduxSources = useSelector(selectSources).sort((a,b)=>a.name.localeCompare(b.name));
  const selectUser = state => state.user;
  const reduxUser = useSelector(selectUser);

  const handleSourceChange = (s) => {
    dispatch({type:"user/sourceToggled", payload:s})
  }
  //var news = reduxNews.slice(0,20).sort((a,b)=>(new Date(b.datetime))-(new Date(a.datetime)));
  //console.log(reduxSources);

  //<Card>
  //  <Card.Title>Search</Card.Title>
  //  <Card.Divider/>
  //</Card>
  //<Card>
  //  <Card.Title>Keywords</Card.Title>
  //  <Card.Divider/>
  //</Card>
  return (
    <ScrollView>

      <Card>
        <Card.Title>Sources</Card.Title>
        <Card.Divider/>
        {reduxSources.map(s => (
        <CheckBox
          iconType='material'
          checkedIcon='check-box'
          uncheckedIcon='check-box-outline-blank'
          title={s.name + " - " +s.language}
          checked={reduxUser.sources.indexOf(s.name)!=-1}
          onPress={()=>handleSourceToggle(s.name)}
          key={s._key}
        />
      ))}
      </Card>
    </ScrollView>
  );
}
