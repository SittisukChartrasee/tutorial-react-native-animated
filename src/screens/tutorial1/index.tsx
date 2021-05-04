import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  Platform,
  Animated,
} from 'react-native';
const img =
  'https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg';
export default () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Image
        source={{uri: img}}
        style={StyleSheet.absoluteFillObject}
        blurRadius={Platform.select({android: 25, ios: 50})}
      />
      <Animated.View>
        <Text>App</Text>
      </Animated.View>
    </SafeAreaView>
  );
};
