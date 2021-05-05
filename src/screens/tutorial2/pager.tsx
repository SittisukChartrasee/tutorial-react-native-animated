import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import {
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Animated,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {quotes} from '../__mock__/data';
const {width} = Dimensions.get('window');

const DURATION = 1000;
const TEXT_DURATION = DURATION * 0.8;

const Circle = ({onPress, index, quotes, animatedValue, animatedValue2}) => {
  const {initialBgColor, nextBgColor, bgColor} = colors[index];
  const inputRange = [0, 0.001, 0.5, 0.501, 1];
  const backgroundColor = animatedValue2.interpolate({
    inputRange,
    outputRange: [
      initialBgColor,
      initialBgColor,
      initialBgColor,
      bgColor,
      bgColor,
    ],
  });
  const dotBgColor = animatedValue2.interpolate({
    inputRange: [0, 0.001, 0.5, 0.501, 0.9, 1],
    outputRange: [
      bgColor,
      bgColor,
      bgColor,
      initialBgColor,
      initialBgColor,
      nextBgColor,
    ],
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.container,
        {backgroundColor},
      ]}>
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: dotBgColor,
            transform: [
              {perspective: 200},
              {
                rotateY: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ['0deg', '-90deg', '-180deg'],
                }),
              },

              {
                scale: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 6, 1],
                }),
              },

              {
                translateX: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ['0%', '50%', '0%'],
                }),
              },
            ],
          },
        ]}>
        <TouchableOpacity
          onPress={onPress}
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <Animated.View
            style={[
              styles.button,
              {
                transform: [
                  {
                    scale: animatedValue.interpolate({
                      inputRange: [0, 0.05, 0.5, 1],
                      outputRange: [1, 0, 0, 1],
                      // extrapolate: 'clamp',
                    }),
                  },
                  {
                    rotateY: animatedValue.interpolate({
                      inputRange: [0, 0.5, 0.9, 1],
                      outputRange: ['0deg', '180deg', '180deg', '180deg'],
                    }),
                  },
                ],
                opacity: animatedValue.interpolate({
                  inputRange: [0, 0.05, 0.9, 1],
                  outputRange: [1, 0, 0, 1],
                }),
              },
            ]}>
            <FontAwesomeIcon icon={faArrowRight} color={'white'} size={50} />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const colors = [
  {
    initialBgColor: 'goldenrod',
    bgColor: '#222',
    nextBgColor: '#ccc',
  },
  {
    initialBgColor: 'goldenrod',
    bgColor: '#222',
    nextBgColor: 'yellowgreen',
  },
  {
    initialBgColor: '#222',
    bgColor: 'yellowgreen',
    nextBgColor: 'midnightblue',
  },
  {
    initialBgColor: 'yellowgreen',
    bgColor: 'midnightblue',
    nextBgColor: 'turquoise',
  },
  {
    initialBgColor: 'midnightblue',
    bgColor: 'turquoise',
    nextBgColor: 'goldenrod',
  },
  {
    initialBgColor: 'turquoise',
    bgColor: 'goldenrod',
    nextBgColor: '#222',
  },
];

type RootStackParamList = {Main: undefined};
interface PagerScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Main'>;
}

export default ({
  navigation,
}: {
  title: string;
  navigation: any;
  screens: React.ComponentType<{}>;
}) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const animatedValue2 = React.useRef(new Animated.Value(0)).current;
  const sliderAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const inputRange = [...Array(quotes.length).keys()];
  const [index, setIndex] = React.useState(0);

  const animate = (i: number) =>
    Animated.parallel([
      Animated.timing(sliderAnimatedValue, {
        toValue: i,
        duration: TEXT_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue2, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: false,
      }),
    ]);

  const onPress = () => {
    const lastIndex = quotes.length - 4;

    if (lastIndex === index) {
      navigation.navigate('tutoCarousel');
    }
    animatedValue.setValue(0);
    animatedValue2.setValue(0);
    animate((index + 1) % colors.length).start();
    setIndex((index + 1) % colors.length);
  };

  return (
    <View style={{flex: 1, justifyContent: 'flex-start', paddingTop: 100}}>
      <StatusBar hidden />
      <Circle
        index={index}
        onPress={onPress}
        quotes={quotes}
        animatedValue={animatedValue}
        animatedValue2={animatedValue2}
      />
      <Animated.View
        style={{
          flexDirection: 'row',
          transform: [
            {
              translateX: sliderAnimatedValue.interpolate({
                inputRange,
                outputRange: quotes.map((_, i) => -i * width * 2),
              }),
            },
          ],
          opacity: sliderAnimatedValue.interpolate({
            inputRange: [...Array(quotes.length * 2 + 1).keys()].map(
              (i) => i / 2,
            ),
            outputRange: [...Array(quotes.length * 2 + 1).keys()].map((i) =>
              i % 2 === 0 ? 1 : 0,
            ),
          }),
        }}>
        {quotes.slice(0, colors.length).map(({quote, author}, i) => {
          return (
            <View style={{paddingRight: width, width: width * 2}} key={i}>
              <Text style={[styles.paragraph, {color: colors[i].nextBgColor}]}>
                {quote}
              </Text>
              <Text
                style={[
                  styles.paragraph,
                  {
                    color: colors[i].nextBgColor,
                    fontSize: 10,
                    fontWeight: 'normal',
                    textAlign: 'right',
                    opacity: 0.8,
                  },
                ]}>
                ______ {author}
              </Text>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
    padding: 8,
    paddingBottom: 50,
  },
  paragraph: {
    margin: 12,
    fontSize: 24,
    // fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Menlo',
    color: 'white',
  },
  button: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: 'turquoise',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
