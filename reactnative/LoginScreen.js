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


import helpers from './Common/helpers';

//Okta
//import { OktaAuth } from '@okta/okta-auth-js'
import config from './Base/app.config.js'
import { createConfig, signIn, signOut, getAccessToken, getAuthClient, getUser, authenticate} from '@okta/okta-react-native';

async function okta(){
  await createConfig({
    //issuer: config.issuer, // optional
    clientId: config.clientId,
    redirectUri: config.redirectUri,
    endSessionRedirectUri: "com.slapps.apollo.app:/",
    discoveryUri: config.url,
    scopes: ["openid", "profile", "offline_access"],
    requireHardwareBackedKeyStore: true
  });
}

export default function LoginScreen({navigation}){

  const [email,setEmail] = React.useState('')
  const [password,setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const styles = StyleSheet.create({
    centered:{
      //justifyContent: 'center',
      alignItems: 'center'
    }
  })
  //REDUX
  const dispatch = useDispatch()
  //Okta
  okta();
  //const oktaAuth = new OktaAuth({config})
  //console.log(authClient);

  const handleEmailChange = (value) => {
    //dispatch({type:"user/userLogin", payload:s})
    setEmail(value);
  }
  const handlePasswordChange = (value) => {
    //dispatch({type:"user/userLogin", payload:s})
    setPassword(value);
  }

  const handleLogin = () => {
    setLoading(true);
    //
    //var test =
    //console.log(email)
    //console.log(password)
    const authClient = getAuthClient()
      //authClient.signIn({ username: "ste.luong@gmail.com", password: "Orld1234" })
      authClient.signIn({ username: email, password: password })
    .then(token=>{
      authenticate({sessionToken: token.sessionToken}).then(()=>{
        getUser().then(user=>{
          console.log(user)
          helpers.getUser(user,u=>{
            //TODO GET USER
            //console.log(u)
            dispatch({type:'user/retrieved', payload:u})
            navigation.navigate('News');
          })
        })
      })

      //console.log("IN")

      //console.log(token)
      //helpers.getUser(token,u=>{
        //TODO GET USER

      //  dispatch({type:'user/retrieved', payload:u})
      //  navigation.navigate('News');
      //})
      //dispatch({type:"user/userLogin", payload:token});
    }).catch(error=>{
      console.log(error);
    })
    /*
    oktaAuth.signIn({
      username: email,
      password: password
    })
    .then(function(transaction) {
      if (transaction.status === 'SUCCESS') {
        authClient.session.setCookieAndRedirect(transaction.sessionToken); // Sets a cookie on redirect
        console.log("SUCCESS");

      } else {
        throw 'We cannot handle the ' + transaction.status + ' status';
      }
    })
    .catch(function(err) {
      console.error(err);
    });
    */
    //handleLogin()
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
        onChangeText={value=>handlePasswordChange(value)}
        secureTextEntry={true}
      />
      <Button

      title="Sign In"
      type="solid"
      onPress={handleLogin}
      loading={loading}
      />
    </Card>
    </View>
  );
}
