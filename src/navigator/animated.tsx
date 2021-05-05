import React from 'react';
import {FlatList, StyleSheet, Text, View, LogBox} from 'react-native';

import {RectButton, ScrollView} from 'react-native-gesture-handler';

import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import Reanimated1 from '../screens/reanimated1/App';

import ExtrapolationExample from '../screens/tutorial-react-native-animation/ExtrapolationExample';
import AnimatedStyleUpdateExample from '../screens/tutorial-react-native-animation/AnimatedStyleUpdateExample';
import WobbleExample from '../screens/tutorial-react-native-animation/WobbleExample';
import DragAndSnapExample from '../screens/tutorial-react-native-animation/DragAndSnapExample';
import ScrollEventExample from '../screens/tutorial-react-native-animation/ScrollEventExample';
import ChatHeadsExample from '../screens/tutorial-react-native-animation/ChatHeadsExample';
import MeasureExample from '../screens/tutorial-react-native-animation/MeasureExample';
import SwipeableListExample from '../screens/tutorial-react-native-animation/SwipeableListExample';
import ScrollableViewExample from '../screens/tutorial-react-native-animation/ScrollableViewExample';
import ScrollToExample from '../screens/tutorial-react-native-animation/ScrollToExample';
import AnimatedTabBarExample from '../screens/tutorial-react-native-animation/AnimatedTabBarExample';
import LightboxExample from '../screens/tutorial-react-native-animation/LightboxExample';
import LiquidSwipe from '../screens/tutorial-react-native-animation/LiquidSwipe';
import ScrollExample from '../screens/tutorial-react-native-animation/AnimatedScrollExample';
LogBox.ignoreLogs(['Calling `getNode()`']);

type Screens = Record<string, {screen: React.ComponentType; title?: string}>;

const SCREENS: Screens = {
  AnimatedStyleUpdate: {
    screen: AnimatedStyleUpdateExample,
    title: '🆕 Animated Style Update',
  },
  WobbleExample: {
    screen: WobbleExample,
    title: '🆕 Animation Modifiers (Wobble Effect)',
  },
  DragAndSnapExample: {
    screen: DragAndSnapExample,
    title: '🆕 Drag and Snap',
  },
  MeasureExample: {
    screen: MeasureExample,
    title: '🆕 Synchronous Measure',
  },
  ScrollEventExample: {
    screen: ScrollEventExample,
    title: '🆕 Scroll Events',
  },
  ChatHeadsExample: {
    screen: ChatHeadsExample,
    title: '🆕 Chat Heads',
  },
  ScrollableToExample: {
    screen: ScrollToExample,
    title: '🆕 scrollTo',
  },
  SwipeableListExample: {
    screen: SwipeableListExample,
    title: '🆕 (advanced) Swipeable List',
  },
  LightboxExample: {
    screen: LightboxExample,
    title: '🆕 (advanced) Lightbox',
  },
  ScrollableViewExample: {
    screen: ScrollableViewExample,
    title: '🆕 (advanced) ScrollView imitation',
  },
  AnimatedTabBarExample: {
    screen: AnimatedTabBarExample,
    title: '🆕 (advanced) Tab Bar Example',
  },
  LiquidSwipe: {
    screen: LiquidSwipe,
    title: '🆕 Liquid Swipe Example',
  },
  ExtrapolationExample: {
    screen: ExtrapolationExample,
    title: '🆕 Extrapolation Example',
  },
  ScrollExample: {
    screen: ScrollExample,
    title: '🆕 Scroll Example',
  },
};

type RootStackParams = {Home: undefined} & {[key: string]: undefined};
type MainScreenProps = {
  navigation: StackNavigationProp<RootStackParams, 'Home'>;
  setUseRea2: (useRea2: boolean) => void;
};

function MainScreen({navigation, setUseRea2}: MainScreenProps) {
  const data = Object.keys(SCREENS).map((key) => ({key}));
  return (
    <FlatList
      style={styles.list}
      data={data}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={(props) => (
        <MainScreenItem
          {...props}
          screens={SCREENS}
          onPressItem={({key}) => navigation.navigate(key)}
        />
      )}
      renderScrollComponent={(props) => <ScrollView {...props} />}
      ListFooterComponent={() => <LaunchReanimated1 setUseRea2={setUseRea2} />}
    />
  );
}

export function ItemSeparator(): React.ReactElement {
  return <View style={styles.separator} />;
}

type Item = {key: string};
type MainScreenItemProps = {
  item: Item;
  onPressItem: ({key}: Item) => void;
  screens: Screens;
};
export function MainScreenItem({
  item,
  onPressItem,
  screens,
}: MainScreenItemProps): React.ReactElement {
  const {key} = item;
  return (
    <RectButton style={styles.button} onPress={() => onPressItem(item)}>
      <Text style={styles.buttonText}>{screens[key].title || key}</Text>
    </RectButton>
  );
}

function LaunchReanimated1({
  setUseRea2,
}: {
  setUseRea2: (useRea2: boolean) => void;
}) {
  return (
    <>
      <ItemSeparator />
      <RectButton style={styles.button} onPress={() => setUseRea2?.(false)}>
        <Text style={styles.buttonText}>👵 Reanimated 1.x Examples</Text>
      </RectButton>
    </>
  );
}

const Stack = createStackNavigator();

const Reanimated2 = (setUseRea2: (useRea2: boolean) => void) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      options={{title: '🎬 Reanimated 2.x Examples'}}
      children={(props) => <MainScreen {...props} setUseRea2={setUseRea2} />}
    />
    {Object.keys(SCREENS).map((name) => (
      <Stack.Screen
        key={name}
        name={name}
        getComponent={() => SCREENS[name].screen}
        options={{title: SCREENS[name].title || name}}
      />
    ))}
  </Stack.Navigator>
);

function App(): React.ReactElement {
  const [useRea2, setUseRea2] = React.useState(true);
  return useRea2 ? Reanimated2(setUseRea2) : Reanimated1(setUseRea2);
}

export const styles = StyleSheet.create({
  list: {
    backgroundColor: '#EFEFF4',
  },
  separator: {
    height: 1,
    backgroundColor: '#DBDBE0',
  },
  buttonText: {
    backgroundColor: 'transparent',
  },
  button: {
    flex: 1,
    height: 60,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default App;
