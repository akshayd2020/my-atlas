import { Button, Container, KeyboardAvoidingView, ScrollView } from 'native-base';
import { Keyboard, SafeAreaView, TouchableWithoutFeedback, View } from 'react-native';
import Big5Form from '../../components/Big5Form';
import NextButton from '../../components/NextButton';
import ProgressBar from '../../components/ProgressBar';
import { useBig5 } from '../../contexts/Big5Context';
import { IPersonalityScore } from '../../interfaces/IPersonalityScore';
import { onboardingService } from '../../services/onboardingService';
import { useAuth } from '../../contexts/AuthContext';
import { IOnboardingDTO } from '../../interfaces/IOnboardingDTO'

const Big5SelectionScreen = ({ route, navigation }) => {
  const { props } = route.params;
  const { page, setPage, big5State, setBig5State, big5Flow, handleChange, calculateScore } = useBig5();

  const auth = useAuth();
  const userId = auth.authData.user._id;
  const token = auth.authData.token;

  const back = async () => {
    const prevPage = big5Flow[page - 1];
    setPage(page - 1);
    navigation.pop();
  };

  const skip = async () => {
    if (page == 6) {
      const score : IPersonalityScore = calculateScore();
      const onboardingLoad : IOnboardingDTO = {
        personalityTestScore: score,
        personalityTestCompleted : true
      }
      await onboardingService.updateOnboardingByUserID(onboardingLoad, userId, token)
      navigation.navigate("Home Screen");
      
    } else {
      const nextPage = big5Flow[page + 1];
      setPage(page + 1);
      navigation.push(nextPage.page, { props: nextPage.props });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F6FF' }}>
        <Container h={'full'} w={'full'} maxWidth="100%" maxHeight="100%" alignItems={'center'}>
          <ProgressBar
            progress={props.progress}
            hasSkip={true}
            hasProgress={true}
            backFunction={back}
            skipFunction={skip}></ProgressBar>
          <KeyboardAvoidingView behavior="height" height={'100%'}>
            <ScrollView
              keyboardShouldPersistTaps="never"
              contentContainerStyle={{
                flexGrow: 1,
              }}>
              <View
                style={{ flex: 1, justifyContent: 'flex-start' }}
                onStartShouldSetResponder={() => true}>
                {props.questions.map((selectOne, key) => (
                  <Big5Form key={key} title={selectOne.question} formNumber={selectOne.stateName} state={big5State[selectOne.stateName]} handleChange={handleChange}/>
                ))}
                <>
                  <Container margin={50}></Container>
                  <NextButton
                    iconColor="#D5D8FC"
                    bgColor="#271E41"
                    pressedBgColor="#D5D8FC"
                    pressedIconColor="#271E41"
                    onPress={skip}
                  />
                  <Container margin={5}></Container>
                </>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </Container>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Big5SelectionScreen;
