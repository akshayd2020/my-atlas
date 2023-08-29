import { SafeAreaView, Text } from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import YesNo from '../../components/YesNo';
import { Alert } from 'react-native';
import { useSignUp } from '../../contexts/SignUpContext';
import NextButton from '../../components/NextButton';
import { Container } from 'native-base';
import Question from '../../components/Question';
import { onboardingService } from '../../services/onboardingService';
import { IOnboardingDTO } from '../../interfaces/IOnboardingDTO';
import { IOnboardingFlowState } from '../../interfaces/IOnboardingFlowState';
import { authService } from '../../services/authService';
import { IUserInputDTO } from '../../interfaces/IUser';
import { useAuth } from '../../contexts/AuthContext';
import { setItemAsync } from 'expo-secure-store';

const YesNoScreen = ({ route, navigation }) => {
  const { props } = route.params;
  const { page, setPage, signUpState, setSignUpState, signUpFlow, handleChange } = useSignUp();

  const auth = useAuth()
  const setAuth = auth.setAuthData;

  const back = async () => {
    const prevPage = signUpFlow[page - 1];
    setPage(page - 1);
    // navigation.navigate(prevPage.page, {props: prevPage.props});
    navigation.pop();
  };

  const skip = async () => {
    if (page > 11) {
      const data : IOnboardingFlowState = signUpState;

      const onboardingLoad : IOnboardingDTO = {
        zipcode : data.zipcode,
        religion : data.religion,
        religionOther : data.religion,
        ethnicity : data.ethnicity,
        sexualOrientation : data.sexualOrientation,
        sexAssignedAtBirth : data.sexAssignedAtBirth,
        mentalHealthCare : data.mentalHealthStance,
        haveSoughtCare : data.soughtCare,
        spiritual : data.spirituality,
        gender : data.gender,
        genderOther : data.genderOther,
        pronouns : data.pronouns,
        pronounsOther : data.pronounsOther,
        concerns : data.concerns,
        goals : data.goals
      }
      const userData : IUserInputDTO = {
        name : data.name,
        email : data.email,
        password : data.password,
        phoneNumber : data.phoneNumber,
        dob : data.dob
      }
      const authData = await authService.signUp(userData)
      await onboardingService.addOnboarding(onboardingLoad, authData.user._id, authData.token)
      setAuth(authData)
      setItemAsync('AuthData', JSON.stringify(authData))
    } else {
      const nextPage = signUpFlow[page + 1];
      setPage(page + 1);
      navigation.push(nextPage.page, { props: nextPage.props });
    }
  };

  const yesFunction = async () => {
    handleChange(props.stateName, true);

    // Alert.alert('yes function');
  };

  const noFunction = async () => {
    handleChange(props.stateName, false);
    // Alert.alert('no function');
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
          <YesNo
          question={props.question}
          yesFunction={yesFunction}
          noFunction={noFunction}
          clicked={signUpState[props.stateName]}></YesNo>
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

export default YesNoScreen;
