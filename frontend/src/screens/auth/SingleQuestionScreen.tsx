import { SafeAreaView, Text } from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import Question from '../../components/Question';
import ScreenWideInput from '../../components/ScreenWideInput';
import { useSignUp } from '../../contexts/SignUpContext';
import NextButton from '../../components/NextButton';
import { Container } from 'native-base';

const SingleQuestionScreen = ({ route, navigation }) => {
  const { props } = route.params;
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF4F0' }}>
      <Container h={'full'} w={'full'} maxWidth="100%" maxHeight="100%" alignItems={'center'}>
        <ProgressBar
          progress={props.progress}
          hasSkip={false}
          hasProgress={true}
          backFunction={back}
          skipFunction={skip}></ProgressBar>
        <Question question={props.question}>
          <ScreenWideInput
            name={props.stateName}
            onChangeText={handleChange}
            placeholderText={props.inputName}
            text={signUpState[props.stateName]}
          />
        </Question>
      </Container>
      <NextButton
        iconColor="#C55415"
        bgColor="#F1C3A9"
        pressedBgColor="#C55415"
        pressedIconColor="#FFFFFF"
        onPress={skip}
      />
    </SafeAreaView>
  );
};

export default SingleQuestionScreen;
