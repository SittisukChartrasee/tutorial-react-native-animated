import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as React from 'react';
import {
  StatusBar,
  Image,
  Animated,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {imageCarousel} from '../__mock__/data';

const {width} = Dimensions.get('screen');

const imageW = width * 0.7;
const imageH = imageW * 1.54;

export default ({navigation}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  const onScrollEnd = (event: {
    nativeEvent: {
      contentOffset: {x: number; y: number};
      layoutMeasurement: {width: number; height: number};
    };
  }) => {
    let contentOffset = event.nativeEvent.contentOffset;
    let viewSize = event.nativeEvent.layoutMeasurement;
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    console.log('scrolled to page ', pageNum);

    if (pageNum === 6) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={StyleSheet.absoluteFillObject}>
        {imageCarousel.map((image, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
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
        onMomentumScrollEnd={onScrollEnd}
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
            <View style={[styles.containerCard, styles.shadow]}>
              <Image source={{uri: item}} style={styles.imageCard} />
            </View>
          );
        }}
      />
      <Animated.View style={[styles.shadow, {opacity}]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('tutoAnimated')}
          style={styles.nextBtn}>
          <FontAwesomeIcon icon={faArrowRight} color={'white'} size={50} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  containerCard: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCard: {
    width: imageW,
    height: imageH,
    resizeMode: 'cover',
    borderRadius: 16,
  },
  nextBtn: {
    marginBottom: 42,
    borderRadius: 50,
    padding: 20,
    backgroundColor: '#ffffff10',
  },
  shadow: {
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
    shadowOpacity: 0.5,
    elevation: 5,
  },
});

// inputRange faPrint
// [-414, 0, 414]
// [0, 414, 828]
// [414, 828, 1242]
// [828, 1242, 1656]
// [1242, 1656, 2070]
// [1656, 2070, 2484]
// [2070, 2484, 2898]
