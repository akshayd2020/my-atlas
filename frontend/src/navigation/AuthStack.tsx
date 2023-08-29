import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccessScreen from '../screens/auth/AccessScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpStack from './SignUpStack';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Access Screen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Access Screen" component={AccessScreen} />
      <Stack.Screen name="Sign In Screen" component={SignInScreen} />
      <Stack.Screen name="Sign Up Stack" component={SignUpStack} />
    </Stack.Navigator>
  );
};

export default AuthStack;
