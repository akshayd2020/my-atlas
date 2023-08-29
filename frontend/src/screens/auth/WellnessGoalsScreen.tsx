import { KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';
import {Text, View} from 'native-base'
import ProgressBar from '../../components/ProgressBar';
import { useSignUp } from '../../contexts/SignUpContext';
import NextButton from '../../components/NextButton';
import { Container } from 'native-base';
import Question from '../../components/Question';
import SelectMultipleButtons from '../../components/SelectMultiple'
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const WellnessGoalsScreen = ({ route, navigation }) => {
  const { props } = route.params;
  const { page, setPage, signUpState, setSignUpState, signUpFlow, handleChange, handleChangeArray } = useSignUp();

  const styles = StyleSheet.create({
    text: {
      fontStyle: 'normal',
      fontWeight: '300',
      lineHeight: hp('3.2%'),
      letterSpacing: wp('0.23%'),
      color: '#271E41',
      marginLeft: wp('8%'),
      marginRight: wp('20%'),
      marginTop: wp('5%'),
      marginBottom: wp('3%'),
      fontSize: hp('3%'),
    },
  });

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

const wellnessGoals = [
  'Anxiety',
  'Improving Mood',
  'Mindfulness',
  'Practicing Gratitude',
  'Self-love',
  'Self-worth',
  'Setting boundaries',
  'Sleep',
  'Stress',
];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF4F0' }}>
      <Container h={'full'} w={'full'} maxWidth="100%" maxHeight="100%" alignItems={'center'}>
        <ProgressBar
          progress={props.progress}
          hasSkip={false}
          hasProgress={true}
          backFunction={back}
          skipFunction={skip}></ProgressBar>
        <KeyboardAvoidingView behavior="height" height={'100%'} w={'full'} maxWidth="100%">
          <ScrollView
            keyboardShouldPersistTaps="never"
            contentContainerStyle={{ flexGrow: 1 }}
            width={'100%'}>
            <Question question={'Choose your behavioral health and wellness goals'}>
              <View>
                <Text
                  marginTop={wp('-4%')}
                  marginBottom={wp('6%')}
                  marginLeft={wp('8%')}
                  color={'#271E41'}
                  fontSize={16}
                  letterSpacing={0.5}
                  >
                  Select all that apply
                </Text>
                <View marginLeft={wp('5%')}>
                  <SelectMultipleButtons
                    state={signUpState[props.stateName]}
                    handleChange={handleChangeArray}
                    listOfButtonNames={wellnessGoals}
                    subtitle={null}
                    stateName={props.stateName}
                  />
                </View>
              </View>
            </Question>
          </ScrollView>
        </KeyboardAvoidingView>
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

export default WellnessGoalsScreen;