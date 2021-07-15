import React from 'react';

//REDUX
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import {
  //SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  StatusBar,
  Linking,
  View
} from 'react-native';

import {
  Button,
  ListItem,
  Header,
  Icon,
  Card,
  CheckBox,
  Input
  } from 'react-native-elements';

//import { createConfig, signIn, signOut, getAccessToken } from '@okta/okta-react-native';

export default function LoginScreen({navigation}){

  const [email,setEmail] = React.useState('')
  const [password,setPassword] = React.useState('')
  const styles = StyleSheet.create({
    centered:{
      //justifyContent: 'center',
      alignItems: 'center'
    }
  })
  const selectUser = state => state.user;
  const reduxUser = useSelector(selectUser);

  const handleEmailChange = (value) => {
    //dispatch({type:"user/userLogin", payload:s})
    setEmail(value);
  }
  const handlePasswordChange = (value) => {
    //dispatch({type:"user/userLogin", payload:s})
    setPassword(value);
  }
  const handleLogin = () => {
    //dispatch({type:"user/userLogin", payload:s})
    navigation.navigate('News')

  }
  return (
    <View>
    <Card>
      <Icon
      style={styles.centered}
      name='lock'
      type='material'
      color='red'
      reverse={true}
      />
      <Text h1
      style={styles.centered}
      > Sign In </Text>
      <Input
        placeholder='Email'
        leftIcon={{ type: 'material', name: 'email' }}
        onChangeText={value=>handleEmailChange(value)}
      />
      <Input
        placeholder='Password'
        leftIcon={{ type: 'material', name: 'lock' }}
        onChangeText={value=>handleEmailChange(value)}
        secureTextEntry={true}
      />
      <Button

      title="Sign In"
      type="solid"
      onPress={handleLogin}/>
    </Card>
    </View>
  );
}
