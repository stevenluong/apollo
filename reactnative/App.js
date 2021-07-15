/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  Button,
  Icon,
  } from 'react-native-elements';

//REDUX
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import data from './data';

import NewsScreen from './NewsScreen'
import FiltersScreen from './FiltersScreen'
import SettingsScreen from './SettingsScreen'
import LoginScreen from './LoginScreen'


const Stack = createStackNavigator();

const App: () => React$Node = () => {

  const dispatch = useDispatch()
  const selectNews = state => state.news;
  const reduxNews = useSelector(selectNews);
  const selectSources = state => state.sources;
  const reduxSources = useSelector(selectSources);

  //var news = [];
  reduxNews.length==0 && data.getNews(news=>{
    console.log(news.length);
    dispatch({type:'news/newsRetrieved',payload:news})
  })
  reduxSources.length==0 && data.getSources(sources=>{
    console.log(sources.length);
    dispatch({type:'sources/sourcesRetrieved',payload:sources})
  })


  return (
    <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={({navigation})=>({
        headerStyle:{
          backgroundColor:'#2da6f7'//'blue'
        },
        headerTitle: 'Apollo',
        })}
      />
      <Stack.Screen
        name="News"
        component={NewsScreen}
        options={({navigation})=>({
          //title: 'Apollo - List',
          headerStyle:{
            backgroundColor:'#2da6f7'//'blue'
          },
          headerTitle: 'News',
          headerRight: () => (
            <Button icon={<Icon type='material' name='filter-alt'/>} type='clear' onPress={()=>{
              //navigation.setOptions({
              //  gestureDirection: 'horizontal-inverted'
              //    })
              navigation.navigate('Filters')
            }}/>
          ),
          //headerLeft: () => (
          //  <Text></Text>
          //  ),
          //headerRight: () => (
          //  <Button icon={<Icon type='material' name='settings'/>} type='clear' onPress={()=>navigation.navigate('Settings')}/>
          //)
          })}
        />
      <Stack.Screen
        name="Filters"
        component={FiltersScreen}
        options={({navigation})=>({
          //title: 'Apollo - List',
          headerTitle: 'Filters',
          headerRight: () => (
            <Button icon={<Icon type='material' name='settings'/>} type='clear' onPress={()=>{
              //navigation.setOptions({
              //  gestureDirection: 'horizontal-inverted'
              //    })
              navigation.navigate('Settings')
            }}/>
          ),
          //headerLeft: () => (
          //  <Button icon={<Icon type='material' name='filter-alt'/>} onPress={handleFilterPressed}/>
          //),
          //...TransitionPresets.SlideFromRightIOS,
          //headerRight: () => (
          //  <Button icon={<Icon type='material' name='list'/>} onPress={()=>navigation.navigate('News')}/>
          //)
          })}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={({navigation})=>({
            //title: 'Apollo - List',
            headerTitle: 'Settings',
            })}
          />
    </Stack.Navigator>
  );
};





export default App;
