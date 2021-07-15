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


export default function SettingsScreen({navigation}) {
  //const dispatch = useDispatch()

  //REDUX
  const dispatch = useDispatch()
  const selectUser = state => state.user;
  const reduxUser = useSelector(selectUser);

  const handleLogout = () => {
    //dispatch({type:"user/userLoggedOut"})
    navigation.navigate('Login')
  }
  //var news = reduxNews.slice(0,20).sort((a,b)=>(new Date(b.datetime))-(new Date(a.datetime)));
  //console.log(reduxSources);
  return (
    <ScrollView>
      <Card>
        <Card.Title>Profile</Card.Title>
        <Card.Divider/>
        <Button
        title="Logout"
        type="outline"
        icon={<Icon type='material' name='exit-to-app'/>}
        onPress={handleLogout}/>
      </Card>
    </ScrollView>
  );
}
