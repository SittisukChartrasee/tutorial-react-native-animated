import React, {ComponentType} from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import todolist from '../screens/tutorial1/todolist';
import animated from '../screens/tutorial1';

type reigsterPages = {
  title: string;
  screens: ComponentType;
};

const SCREENS: Record<string, reigsterPages> = {
  tutoTodolist: {
    title: 'todolist',
    screens: todolist,
  },
  tutoAnimated: {
    title: 'animated',
    screens: animated,
  },
};

type RootStackParamList = {Main: undefined} & {
  [P in keyof typeof SCREENS]: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export default (): JSX.Element => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    {Object.keys(SCREENS).map((name) => (
      <Stack.Screen key={name} name={name} component={SCREENS[name].screens} />
    ))}
  </Stack.Navigator>
);
