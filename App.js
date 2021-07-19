import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider} from '@ui-kitten/components';
import {
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { Provider} from 'react-redux';
import AppNavigator from './src/routes/Route';
import NetInfo from '@react-native-community/netinfo';
import store from './src/store';
import Snackbar from 'react-native-snackbar';


const App = () => {
  const{ dispatch } = store;

  useEffect(() => {
    // TODO added netinfo
    const netInfoUnsubscribe = NetInfo.addEventListener(({isConnected}) => {
      dispatch.settings.updateNetInfo(isConnected);
      !isConnected && Snackbar.show({
        text: "No Internet Connection",
        duration: Snackbar.LENGTH_LONG,
        action: {
          text: 'UNDO',
          textColor: 'red',
          onPress: () => { /* Do something. */ },
        },
      });
    });

    return () => {
      netInfoUnsubscribe();
    }
  }, []);
  
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <View style={styles.container}>
            <AppNavigator/>
            <StatusBar style="auto"/>
          </View>
        </NavigationContainer>
    </ApplicationProvider>
    </Provider>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default App;
