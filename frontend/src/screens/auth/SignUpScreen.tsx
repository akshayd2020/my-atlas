import { Button, Container, Heading, Input } from 'native-base';
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Keyboard,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NextButton from '../../components/NextButton';
import ProgressBar from '../../components/ProgressBar';
import ScreenWideInput from '../../components/ScreenWideInput';
import { useSignUp } from '../../contexts/SignUpContext';

const SignUpScreen = ({ route, navigation }) => {
  const { page, setPage, signUpState, setSignUpState, signUpFlow, handleChange } = useSignUp();

  const back = async () => {
    const prevPage = signUpFlow[page - 1];
    setPage(page - 1);
    navigation.navigate('Access Screen');
  };

  const next = async () => {
    const nextPage = signUpFlow[page + 1];
    setPage(page + 1);
    navigation.push(nextPage.page, { props: nextPage.props });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF4F0' }}>
        <Container h={'full'} w={'full'} maxWidth="100%" maxHeight="100%" alignItems={'center'}>
          <ProgressBar backFunction={back} hasProgress={false} hasSkip={false} />
          <Heading
            size="3xl"
            marginTop={hp('4%')}
            marginBottom={hp('3%')}
            ml={wp('8%')}
            marginX={wp('10%')}
            fontFamily="heading"
            fontWeight={'700'}
            fontStyle={'normal'}
            letterSpacing={wp('0.1%')}>
            Welcome to My Atlas
          </Heading>
          <ScreenWideInput
            name="email"
            onChangeText={handleChange}
            placeholderText="Email"
            text={signUpState.email}
          />
          <ScreenWideInput
            name="password"
            onChangeText={handleChange}
            placeholderText="Password"
            text={signUpState.password}
            pw={true}
          />
        </Container>
        <NextButton
          iconColor="#C55415"
          bgColor="#F1C3A9"
          pressedBgColor="#C55415"
          pressedIconColor="#FFFFFF"
          onPress={next}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;
