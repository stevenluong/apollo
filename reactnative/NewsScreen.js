import React from 'react';
//REDUX
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import {
  //SafeAreaView,
  //StyleSheet,
  ScrollView,
  RefreshControl,
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

import data from './data';

export default function NewsScreen({navigation}) {
  const dispatch = useDispatch()
  const [refreshing, setRefreshing] = React.useState(false);
  //REDUX
  const selectNews = state => state.news;
  const reduxNews = useSelector(selectNews);
  const selectUser = state => state.user;
  const reduxUser = useSelector(selectUser);
  const filteredNews = useSelector(state =>
    state.news.filter(n=>{
      return reduxUser.sources.indexOf(n.source)!==-1
    })
  );
  var sortedNews = filteredNews.slice().sort((a,b)=>(new Date(b.datetime))-(new Date(a.datetime)))

  const handleNewsOpen = function(link){
    console.log(link);
    //Linking.openURL(link);
    navigation.navigate('Link',{link:link})
  }

  const handleNewsRefresh = function(){
    console.log("Refresh");
    setRefreshing(true);
    //Linking.openURL(link);
    //navigation.navigate('Link',{link:link})
    data.getNews(news=>{
      console.log(news.length);
      dispatch({type:'news/newsRetrieved',payload:news})
      setRefreshing(false);
    })
  }

  //var news = reduxNews.sort((a,b)=>(new Date(b.datetime))-(new Date(a.datetime))).slice(0,40);
  //console.log(news);
  return (
    <ScrollView>
      <RefreshControl refreshing={refreshing} onRefresh={handleNewsRefresh} />
      {sortedNews.map((n,i)=>(
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
