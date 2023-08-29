import { Container, KeyboardAvoidingView, ScrollView } from 'native-base';
import { Keyboard, SafeAreaView, Text, TouchableWithoutFeedback, View } from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import Question from '../../components/Question';
import SelectOne from '../../components/question/SelectOne';
import { useSignUp } from '../../contexts/SignUpContext';
import NextButton from '../../components/NextButton';

const SelectOneScreen = ({ route, navigation }) => {
  const { props } = route.params;
  const { page, setPage, signUpState, setSignUpState, signUpFlow, handleChange, handleOtherChange } = useSignUp();

  const back = async () => {
    const prevPage = signUpFlow[page - 1];
    setPage(page - 1);
    navigation.pop();
  };

  const skip = async () => {
    const nextPage = signUpFlow[page + 1];
    setPage(page + 1);
    navigation.push(nextPage.page, { props: nextPage.props });
  };

  const handlePress = () => {
    console.log('Button pressed!');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF4F0' }}>
        <Container h={'full'} w={'full'} maxWidth="100%" maxHeight="100%" alignItems={'center'}>
          <ProgressBar
            progress={props.progress}
            hasSkip={false}
            hasProgress={true}
            backFunction={back}
            skipFunction={skip}></ProgressBar>
          <KeyboardAvoidingView behavior="height" height={'100%'} w={'full'} maxWidth="100%">
            <ScrollView keyboardShouldPersistTaps="never" contentContainerStyle={{ flexGrow: 1 }} width={'100%'}>
              <View onStartShouldSetResponder={() => true}>
                <Question question={props.question}>
                  {props.sections.map((selectOne, key) => (
                    <SelectOne
                      key={key}
                      title={selectOne.title}
                      onAnswerPress={handleChange}
                      onAnswerPressOther={handleOtherChange}
                      options={selectOne.answers}
                      other={selectOne.other}
                      stateName={selectOne.stateName}
                      state={signUpState[selectOne.stateName]}
                      otherState= {selectOne.other ? signUpState[selectOne.stateName + 'Other'] : undefined}
                    />
                  ))}
                </Question>
                {props.isLong ? (
                  <>
                    <Container margin={30}></Container>
                    <NextButton
                      iconColor="#C55415"
                      bgColor="#F1C3A9"
                      pressedBgColor="#C55415"
                      pressedIconColor="#FFFFFF"
                      onPress={skip}
                    />
                    <Container margin={5}></Container>
                  </>
                ) : (
                  <Text></Text>
                )}
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </Container>
        {!props.isLong ? (
          <>
            <NextButton
              iconColor="#C55415"
              bgColor="#F1C3A9"
              pressedBgColor="#C55415"
              pressedIconColor="#FFFFFF"
              onPress={skip}
            />
          </>
        ) : (
          <Text></Text>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SelectOneScreen;
