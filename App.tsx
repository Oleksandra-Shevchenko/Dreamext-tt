import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {LoginScreen} from './src/views/login';
import {HomeScreen} from './src/views/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NetInfo from '@react-native-community/netinfo';
import {ConnectionComponent} from './src/components/connectionComponent';
import {PermissionsAndroid} from 'react-native';

const {Navigator, Screen} = createNativeStackNavigator();
const App = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);

      console.log(granted);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);

      setIsConnected(state?.isConnected ?? false);
    });

    requestPermission();
  }, []);

  return (
    <NavigationContainer>
      {!isConnected && <ConnectionComponent />}
      <Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
        <Screen name="Login" component={LoginScreen} />
        <Screen name="Home" component={HomeScreen} />
      </Navigator>
    </NavigationContainer>
  );
};

export default App;
