import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {bg, dataUser, config} from './__mock__/data';

const {AVATAR_SIZE, SPACING} = config;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3.148;

export default () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <Image
        source={{uri: bg}}
        style={StyleSheet.absoluteFillObject}
        blurRadius={80}
      />
      <Animated.FlatList
        data={dataUser}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {y: scrollY},
              },
            },
          ],
          {useNativeDriver: true},
        )}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        renderItem={({item, index}) => {
          const scale = scrollY.interpolate({
            inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)],
            outputRange: [1, 1, 1, 0],
          });

          const opacity = scrollY.interpolate({
            inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 0.5)],
            outputRange: [1, 1, 1, 0],
          });
          return (
            <TouchableOpacity>
              <Animated.View
                style={[
                  styles.shadow,
                  styles.card,
                  {
                    transform: [
                      {
                        scale,
                      },
                    ],
                    opacity,
                  },
                ]}>
                <Image
                  source={{uri: item.image}}
                  style={{
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE,
                    borderRadius: AVATAR_SIZE,
                    marginRight: SPACING / 2,
                  }}
                />
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 22, fontWeight: '700'}}>
                    {item.name}
                  </Text>
                  <Text style={{fontSize: 18, opacity: 0.7}}>
                    {item.jobTitle}
                  </Text>
                  <Text style={{fontSize: 14, opacity: 0.8, color: '#0099cc'}}>
                    {item.email}
                  </Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    padding: SPACING,
    marginBottom: SPACING,
    borderRadius: 12,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    backgroundColor: '#fff',
  },
});
