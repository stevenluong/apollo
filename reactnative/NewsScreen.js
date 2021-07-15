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


export default function NewsScreen({navigation}) {

  //REDUX
  const selectNews = state => state.news;
  const reduxNews = useSelector(selectNews);

  const handleNewsOpen = function(link){
    console.log(link);
    Linking.openURL(link);
  }
  var news = reduxNews.sort((a,b)=>(new Date(b.datetime))-(new Date(a.datetime))).slice(0,20);
  //console.log(news);
  return (
    <ScrollView>
      {news.map((n,i)=>(
        <ListItem key={i} bottomDivider onPress={()=>handleNewsOpen(n.link)}>
          <ListItem.Content>
            <ListItem.Title>{n.title}</ListItem.Title>
            <ListItem.Subtitle style={{fontSize:11}}>{n.source} - {n.time}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </ScrollView>
  );
}
