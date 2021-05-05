import React, {ComponentType} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  I18nManager,
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import RNRestart from 'react-native-restart';
import {MenuItem, SettingsSwitch} from '../components';
import animated from './animated';
import screens from './screens';

type reigsterPages = {
  title: string;
  screens: ComponentType;
};

const SCREENS: Record<string, reigsterPages> = {
  animated: {
    title: 'animated',
    screens: animated,
  },
  playground: {
    title: 'playground',
    screens: screens,
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
      {Object.keys(SCREENS).map((name) => (
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
        options={{title: '📱 React Native Screens Examples'}}
        component={MainScreen}
      />
      {Object.keys(SCREENS).map((name) => (
        <Stack.Screen
          key={name}
          name={name}
          getComponent={() => SCREENS[name].screens}
          options={{headerShown: true}}
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
  switch: {
    marginTop: 15,
  },
});

export default navigation;
