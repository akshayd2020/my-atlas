import { Container, Heading } from 'native-base';
import { useEffect } from 'react';
import { Keyboard, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useBig5 } from '../../contexts/Big5Context';

const Big5IntroScreen = ({ route, navigation }) => {
  const { page, setPage, big5State, setBig5State, big5Flow, handleChange } = useBig5();

  const skip = async () => {
    const nextPage = big5Flow[page + 1];
    setPage(page + 1);
    navigation.push(nextPage.page, { props: nextPage.props });
  };

  useEffect(() => {
    setTimeout(skip, 2000);
  }, []);
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F6FF' }}>
        <Container h={'full'} w={'full'} maxWidth="100%" maxHeight="100%" alignItems={'center'}>
          <Heading
            size="3xl"
            marginTop={hp('5%')}
            marginBottom={hp('3%')}
            ml={wp('10%')}
            marginX={wp('10%')} fontFamily="heading"
            fontWeight={'700'}
            fontStyle={'normal'}
            letterSpacing={wp('0.1%')}>
            Just one more thing and we're done...
          </Heading>
        </Container>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Big5IntroScreen;
