import { Container, Heading, Image } from 'native-base';
import { background } from 'native-base/lib/typescript/theme/styled-system';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View, _Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Progress } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { AtlasLogo } from '../../img';
import { useSignUp } from '../../contexts/SignUpContext';
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

const AccessScreen = ({ route, navigation }) => {
  const [loading, isLoading] = useState(false);

  const signUp = async () => {
    isLoading(true);
    navigation.push('Sign Up Stack', { screen: 'Sign Up Screen' });
  };

  const signIn = async () => {
    isLoading(true);
    navigation.navigate('Sign In Screen');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF4F0' }}>
      <Container h={'full'} w={'full'} maxWidth="100%" maxHeight="100%" alignItems={'center'}>
        <Heading
          size="3xl"
          marginTop={hp('12%')}
          marginBottom={hp('7%')}
          fontFamily="heading"
          fontWeight={'700'}
          fontStyle={'normal'}
          letterSpacing={wp('0.1%')}
          >
          My Atlas
        </Heading>
        <Image alt="My Atlas Image" width={hp('20%')} height={hp('20%')} source={AtlasLogo} />
        <Button
          _text={{
            fontSize: 'xl',
            color: 'midnight',
            fontWeight: 'semibold',
            letterSpacing: 'lg',
          }}
          _pressed={{
            backgroundColor: 'terra',
            _text: { color: 'white' },
          }}
          onPress={signUp}
          w={wp('75%')}
          bg={'nectarine'}
          borderRadius="md"
          marginTop={hp('18%')}>
          Create Account
        </Button>
        <Button
          _text={{
            fontSize: 'xl',
            color: 'midnight',
            fontWeight: 'semibold',
            letterSpacing: 'lg',
          }}
          onPress={signIn}
          variant={'unstyled'}>
          Sign in
        </Button>
      </Container>
    </SafeAreaView>
  );
};

export default AccessScreen;
