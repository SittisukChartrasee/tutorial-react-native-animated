import * as React from 'react';
import {
  StatusBar,
  Image,
  Animated,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {imageCarousel} from '../__mock__/data';

const {width} = Dimensions.get('screen');

const imageW = width * 0.7;
const imageH = imageW * 1.54;

export default () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <StatusBar hidden />
      <View style={StyleSheet.absoluteFillObject}>
        {imageCarousel.map((image, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          // inputRange faPrint
          // [-414, 0, 414]
          // [0, 414, 828]
          // [414, 828, 1242]
          // [828, 1242, 1656]
          // [1242, 1656, 2070]
          // [1656, 2070, 2484]
          // [2070, 2484, 2898]
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });
          return (
            <Animated.Image
              key={`image-${index}`}
              source={{uri: image}}
              style={[StyleSheet.absoluteFillObject, {opacity}]}
              blurRadius={80}
            />
          );
        })}
      </View>
      <Animated.FlatList
        data={imageCarousel}
        horizontal
        pagingEnabled
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {x: scrollX},
              },
            },
          ],
          {useNativeDriver: true},
        )}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <View
              style={{
                width,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowRadius: 20,
                shadowOpacity: 0.5,
                elevation: 5,
              }}>
              <Image
                source={{uri: item}}
                style={{
                  width: imageW,
                  height: imageH,
                  resizeMode: 'cover',
                  borderRadius: 16,
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};
