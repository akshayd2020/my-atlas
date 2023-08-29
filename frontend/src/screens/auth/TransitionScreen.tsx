import { Container, Heading } from 'native-base';
import { Keyboard, SafeAreaView, Text, TouchableWithoutFeedback } from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import { useSignUp } from '../../contexts/SignUpContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NextButton from '../../components/NextButton';
import CircleProgressBarBase from '../../components/CircularProgress';
import Svg, { Circle } from 'react-native-svg';
import { useEffect } from 'react';

const TransitionScreen = ({ route, navigation }) => {
  const { page, setPage, signUpState, setSignUpState, signUpFlow, handleChange } = useSignUp();

  const back = async () => {
    const prevPage = signUpFlow[page - 1];
    setPage(page - 1);
    // navigation.navigate(prevPage.page, {props: prevPage.props});
    navigation.pop();
  };

  const skip = async () => {
    const nextPage = signUpFlow[page + 1];
    setPage(page + 1);
    navigation.push(nextPage.page, { props: nextPage.props });
  };

  useEffect(() => {
    setTimeout(skip, 2000);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF4F0' }}>
        <Container h={'full'} w={'full'} maxWidth="100%" maxHeight="100%">
          <ProgressBar
            progress={20}
            hasSkip={false}
            hasProgress={true}
            backFunction={back}
            skipFunction={skip}></ProgressBar>
          <Heading
            size="3xl"
            marginTop={hp('5%')}
            marginBottom={hp('3%')}
            ml={wp('10%')}
            marginX={wp('10%')}
            fontFamily="heading"
            fontWeight={'700'}
            fontStyle={'normal'}
            letterSpacing={wp('0.1%')}>
            Hi {signUpState.name}!
          </Heading>
          <Heading
            size="3xl"
            marginTop={hp('5%')}
            marginBottom={hp('3%')}
            ml={wp('10%')}
            marginX={wp('10%')}
            fontFamily="heading"
            fontWeight={'700'}
            fontStyle={'normal'}
            letterSpacing={wp('0.1%')}>
            Nice to meet you.
          </Heading>
          <Svg height="50%" width="100%" viewBox="-10 -15 38 38">
            <CircleProgressBarBase trailStrokeColor="#F1C3A9" strokeColor="#C55415" />
          </Svg>
        </Container>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default TransitionScreen;
