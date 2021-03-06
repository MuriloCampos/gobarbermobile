import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import SelectProvider from './pages/New/SelectProvider';
import SelectDateTime from './pages/New/SelectDateTime';
import Confirm from './pages/New/Confirm';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function newSchedule({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#FFF',
        headerLeftContainerStyle: { marginLeft: 20 },
      }}
    >
      <Stack.Screen
        name="Selecione o Provedor"
        component={SelectProvider}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Agendamentos');
              }}
            >
              <Icon name="chevron-left" size={20} color="#FFF" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Selecione o horario"
        component={SelectDateTime}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon name="chevron-left" size={20} color="#FFF" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="Confirmar Agendamento" component={Confirm} />
    </Stack.Navigator>
  );
}

export default function Routes({ isLoggedIn }) {
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: '#fff',
            inactiveTintColor: 'rgba(255,255,255,0.6)',
            activeBackgroundColor: '#8d41a8',
            inactiveBackgroundColor: '#8d41a8',
            keyboardHidesTabBar: true,
          }}
        >
          <Tab.Screen
            name="Agendamentos"
            component={Dashboard}
            options={{
              tabBarLabel: 'Agendamentos',
              tabBarIcon: ({ color, size }) => (
                <Icon name="event" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Agendar"
            component={newSchedule}
            options={{
              unmountOnBlur: true,
              tabBarLabel: 'Agendar',
              tabBarVisible: false,
              tabBarIcon: ({ color, size }) => (
                <Icon
                  name="add-circle-outline"
                  color="rgba(255,255,255,0.6)"
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Meu perfil"
            component={Profile}
            options={{
              tabBarLabel: 'Meu perfil',
              tabBarIcon: ({ color, size }) => (
                <Icon name="person" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
