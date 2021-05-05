import React, {ComponentType} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {
  I18nManager,
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';
import {MenuItem} from '../components';
import animated from './animated';
import screens from './screens';
import tutorial from './tutorial';

type reigsterPages = {
  title: string;
  screens: ComponentType;
  type: 'example' | 'tutorial';
};

const SCREENS: Record<string, reigsterPages> = {
  animated: {
    title: 'animated',
    screens: animated,
    type: 'example',
  },
  playground: {
    title: 'playground',
    screens: screens,
    type: 'example',
  },
  tutorial: {
    title: 'tutorial',
    screens: tutorial,
    type: 'tutorial',
  },
};

const Stack = createNativeStackNavigator();

interface MainScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Main'>;
}
type RootStackParamList = {Main: undefined} & {
  [P in keyof typeof SCREENS]: undefined;
};

const MainScreen = ({navigation}: MainScreenProps): JSX.Element => (
  <ScrollView>
    <SafeAreaView>
      <Text style={styles.label}>{'Examples'}</Text>
      {Object.keys(SCREENS)
        .filter((val) => SCREENS[val].type === 'example')
        .map((name) => (
          <MenuItem
            key={name}
            title={SCREENS[name].title}
            onPress={() => navigation.navigate(name)}
          />
        ))}
      <Text style={styles.label}>{'Tutorial'}</Text>
      {Object.keys(SCREENS)
        .filter((val) => SCREENS[val].type === 'tutorial')
        .map((name) => (
          <MenuItem
            key={name}
            title={SCREENS[name].title}
            onPress={() => navigation.navigate(name)}
          />
        ))}
    </SafeAreaView>
  </ScrollView>
);

const navigation = (): JSX.Element => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        direction: I18nManager.isRTL ? 'rtl' : 'ltr',
      }}>
      <Stack.Screen
        name="Main"
        options={{title: '📱 React Native Screens'}}
        component={MainScreen}
      />
      {Object.keys(SCREENS).map((name) => (
        <Stack.Screen
          key={name}
          name={name}
          component={SCREENS[name].screens}
        />
      ))}
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    color: 'black',
    margin: 10,
    marginTop: 15,
  },
});

export default navigation;
