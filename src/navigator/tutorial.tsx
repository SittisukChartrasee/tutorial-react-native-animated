import React, {ComponentType} from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import todolist from '../screens/tutorial1/todolist';
import animated from '../screens/tutorial1';
import tutorial2 from '../screens/tutorial2';
import pager from '../screens/tutorial2/pager';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

declare let SCREENS: Record<
  string,
  {
    title: string;
    screens: ComponentType;
  }
>;

SCREENS = {
  tutoPager: {
    title: 'pager',
    screens: pager,
  },
  tutoCarousel: {
    title: 'carousel',
    screens: tutorial2,
  },
  tutoAnimated: {
    title: 'animated',
    screens: animated,
  },
  tutoTodolist: {
    title: 'todolist',
    screens: todolist,
  },
};

const tutorialNavigator = (): JSX.Element => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    {Object.keys(SCREENS).map((name) => (
      <Stack.Screen
        key={name}
        name={name}
        component={SCREENS[name].screens}
        initialParams={{
          token: 'we have token',
        }}
      />
    ))}
  </Stack.Navigator>
);

export const tutorialContainer = () => (
  <NavigationContainer>{tutorialNavigator()}</NavigationContainer>
);

export default tutorialNavigator;
