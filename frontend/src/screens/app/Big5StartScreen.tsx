import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import Big5Start from '../../components/Big5Start';
import { useBig5 } from '../../contexts/Big5Context';

const Big5StartScreen = ({route, navigation}) => {
    const { page, setPage, big5State, setBig5State, big5Flow, handleChange } = useBig5();

    const back = async () => {
        navigation.navigate("Home Screen");
    };

    const skip = async () => {
        const nextPage = big5Flow[page + 1];
        setPage(page + 1);
        navigation.push(nextPage.page, { props: nextPage.props });
    };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F6FF' }}>
      <ProgressBar
        progress={20}
        hasSkip={false}
        hasProgress={false}
        backFunction={back}
        skipFunction={skip}></ProgressBar>
      <Big5Start startFunction={skip}></Big5Start>
    </SafeAreaView>
  );
};

export default Big5StartScreen;
