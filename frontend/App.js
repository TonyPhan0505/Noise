/////////////////////////////////// Import dependencies //////////////////////////////////////
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

import SignUpScreen from "./screens/authentication/SignUp.screen";
import LoginScreen from "./screens/authentication/Login.screen";
import VerificationScreen from "./screens/authentication/Verification.screen";
//////////////////////////////////////////////////////////////////////////////////

////////////////////////////////// Set up ////////////////////////////////
const Stack = createNativeStackNavigator();
/////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////// Main component ////////////////////////////////
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Verification"
              component={VerificationScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>           
  );
}
///////////////////////////////////////////////////////////////////////