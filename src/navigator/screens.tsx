import React from 'react';
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  I18nManager,
  Platform,
  StatusBar,
} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {StackNavigationProp} from '@react-navigation/stack';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import RNRestart from 'react-native-restart';

import {MenuItem, SettingsSwitch} from '../components';

import SimpleNativeStack from '../screens/tutorial-react-native-screen/SimpleNativeStack';
import StackPresentation from '../screens/tutorial-react-native-screen/StackPresentation';
import HeaderOptions from '../screens/tutorial-react-native-screen/HeaderOptions';
import StatusBarExample from '../screens/tutorial-react-native-screen/StatusBar';
import Animations from '../screens/tutorial-react-native-screen/Animations';
import BottomTabsAndStack from '../screens/tutorial-react-native-screen/BottomTabsAndStack';
import StackReactNavigation4 from '../screens/tutorial-react-native-screen/StackReactNavigation4';
import Modals from '../screens/tutorial-react-native-screen/Modals';
import Orientation from '../screens/tutorial-react-native-screen/Orientation';

type reigsterPages = {
  title: string;
  component: () => JSX.Element;
  type: 'example' | 'playground';
};

enableScreens();

if (Platform.OS === 'android') {
  StatusBar.setTranslucent(true);
}

const SCREENS: Record<string, reigsterPages> = {
  SimpleNativeStack: {
    title: 'Simple Native Stack',
    component: SimpleNativeStack,
    type: 'example',
  },
  StackPresentation: {
    title: 'Stack Presentation',
    component: StackPresentation,
    type: 'example',
  },
  BottomTabsAndStack: {
    title: 'Bottom tabs and native stack',
    component: BottomTabsAndStack,
    type: 'example',
  },
  Modals: {
    title: 'Modals',
    component: Modals,
    type: 'example',
  },
  StackReactNavigation4: {
    title: 'Stack react-navigation v4',
    // @ts-ignore react-navigation v4 AppNavigator type
    component: StackReactNavigation4,
    type: 'example',
  },
  HeaderOptions: {
    title: 'Header Options',
    component: HeaderOptions,
    type: 'playground',
  },
  StatusBar: {
    title: 'Status bar (iOS)',
    component: StatusBarExample,
    type: 'playground',
  },
  Animations: {
    title: 'Animations',
    component: Animations,
    type: 'playground',
  },
  Orientation: {
    title: 'Orientation',
    component: Orientation,
    type: 'playground',
  },
};

type RootStackParamList = {Main: undefined} & {
  [P in keyof typeof SCREENS]: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

interface MainScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Main'>;
}

const MainScreen = ({navigation}: MainScreenProps): JSX.Element => (
  <ScrollView>
    <SafeAreaView>
      <SettingsSwitch
        style={styles.switch}
        label="Right to left"
        value={I18nManager.isRTL}
        onValueChange={() => {
          I18nManager.forceRTL(!I18nManager.isRTL);
          RNRestart.Restart();
        }}
      />
      <Text style={styles.label}>Examples</Text>
      {Object.keys(SCREENS)
        .filter((name) => SCREENS[name].type === 'example')
        .map((name) => (
          <MenuItem
            key={name}
            title={SCREENS[name].title}
            onPress={() => navigation.navigate(name)}
          />
        ))}
      <Text style={styles.label}>Playgrounds</Text>
      {Object.keys(SCREENS)
        .filter((name) => SCREENS[name].type === 'playground')
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

const navigation = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{
        direction: I18nManager.isRTL ? 'rtl' : 'ltr',
      }}>
      <Stack.Screen
        name="Main"
        options={{
          title: '📱 React Native Screens Examples',
        }}
        component={MainScreen}
      />
      {Object.keys(SCREENS).map((name) => (
        <Stack.Screen
          key={name}
          name={name}
          getComponent={() => SCREENS[name].component}
          options={{headerShown: false}}
        />
      ))}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    color: 'black',
    margin: 10,
    marginTop: 15,
  },
  switch: {
    marginTop: 15,
  },
});

export default navigation;
