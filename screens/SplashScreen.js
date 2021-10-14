import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  Text
} from 'react-native';

import Fonts from '../constants/Fonts';


const SplashScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      navigation.replace('AuthenticationScreen');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <View style={styles.loadingTextContainer}>
          <Text style={styles.loadingText}>
                Now Loading, Please Wait...
          </Text>
      </View>
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  loadingText: {
      textAlign: 'center',
      color: 'white',
      fontFamily: Fonts.primaryFont,
      fontWeight: 'bold',
      fontSize: 20
  },
  loadingTextContainer: {
      width: '80%'
  }
});