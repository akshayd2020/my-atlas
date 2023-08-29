import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Big5Provider } from '../contexts/Big5Context';
import Big5IntroScreen from '../screens/app/Big5IntroScreen';
import Big5SelectionScreen from '../screens/app/Big5SelectionScreen';
import Big5StartScreen from '../screens/app/Big5StartScreen';

const Stack = createNativeStackNavigator();

const Big5Stack = () => {
  return (
    <Big5Provider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Big 5 Intro Screen" component={Big5IntroScreen} />
        <Stack.Screen name="Big 5 Start Screen" component={Big5StartScreen} />
        <Stack.Screen name="Big 5 Selection Screen" component={Big5SelectionScreen} />
      </Stack.Navigator>
    </Big5Provider>
  );
};

export default Big5Stack;
