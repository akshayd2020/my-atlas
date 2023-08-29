import { StatusBar } from 'expo-status-bar';
import { extendTheme, NativeBaseProvider } from 'native-base';
import { StyleSheet } from 'react-native';
import AppleHealthKit, { HealthValue, HealthKitPermissions } from 'react-native-health';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext';
import Router from './src/navigation/Router';
import ScreenWideButton from './src/components/question/ScreenWideButton';
import { setupPermissions } from './src/services/healthServices/healthKitService';
import {
  useFonts,
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light_Italic,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold_Italic,
  Montserrat_900Black_Italic,
} from '@expo-google-fonts/montserrat';

let options = {
  date: new Date().toISOString(), // optional; default now
  includeManuallyAdded: false, // optional: default true
};

var steps;

AppleHealthKit.getStepCount(options, (err: Object, results: HealthValue) => {
  if (err) {
    return;
  }
  steps = results.value;
  console.log(results);
});

export default function App() {
   
  let [fontsLoaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light_Italic,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black_Italic,
  });

  if (!fontsLoaded) {
    return null // Prevent app from rendering until fonts are loaded. Nothing special here
  }
  setupPermissions();

  // colors used in our app
  const theme = extendTheme({
    fontConfig: {
      Montseratt: {
        100: {
          normal: 'Montserrat_100Thin',
          italic: 'Montserrat_100Thin_Italic',
        },
        200: {
          normal: 'Montserrat_200ExtraLight',
          italic: 'Montserrat_200ExtraLight_Italic',
        },
        300: {
          normal: 'Montserrat_300Light',
          italic: 'Montserrat_300Light_Italic',
        },
        400: {
          normal: 'Montserrat_400Regular',
          italic: 'Montserrat_400Regular_Italic',
        },
        500: {
          normal: 'Montserrat_500Medium',
          italic: 'Montserrat_500Medium_Italic',
        },
        600: {
          normal: 'Montserrat_600SemiBold',
          italic: 'Montserrat_600SemiBold_Italic',
        },
        700: {
          normal: 'Montserrat_700Bold',
          italic: 'Montserrat_700Bold_Italic',
        },
        800: {
          normal: 'Montserrat_800ExtraBold',
          italic: 'Montserrat_800ExtraBold_Italic',
        },
        900: {
          normal: 'Montserrat_900Black',
          italic: 'Montserrat_900Black_Italic',
        },
      },
    },
    colors: {
      midnight: '#271E41',
      miniPeach: '#FAF4F0',
      cream: '#E5E5E5',
      coal: '#8F8F8F',
      nectarine: '#F1C3A9',
      nectarineDark: '#ED9E72',
      terra: '#C55415',
      gray: '#666666',
      lilac: '#F5F6FF',
      lightPurple: '#E8EAF6',
      lightGray: '#808080',
      lavender: '#D5D8FC',
      stone: '#FFFCFA',
    },
    fonts: {
      heading: 'Montseratt'
    }
  });

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <NativeBaseProvider theme={theme}>
          <Router />
        </NativeBaseProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
}