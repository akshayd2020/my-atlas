import { ActivityIndicator, Alert, Pressable, SafeAreaView, Text} from "react-native";
import ProgressBar from "../../components/ProgressBar";
import YesNo from "../../components/YesNo";
import HelloAgain from "../../components/HelloAgain";
import { useSignUp } from "../../contexts/SignUpContext";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";


const SignInScreen = ({route, navigation}) => {
  const { authData, loading, signIn, signOut } = useAuth();
  const { page, setPage, signUpState, setSignUpState, signUpFlow, handleChange } = useSignUp();
  const [error, setError] = useState('');


  const back = async () => {
    navigation.navigate("Access Screen");
  };


  const signInFunction = async (email, password) => {
    console.log(email, password);
    signIn(email, password)
      .catch(error => {
        console.log(error);
        setError("Invalid email and password");
      });
  };

  const googleFunction = async () => {
    Alert.alert('no function');
  };

  const appleFunction = async () => {
    Alert.alert('no function');
  };

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF4F0' }}>
        <ProgressBar
          progress={20}
          hasSkip={false}
          hasProgress={false}
          backFunction={back}></ProgressBar>
        <HelloAgain
          signInFunction={signInFunction}
          googleFunction={googleFunction}
          appleFunction={appleFunction}
          errorMsg = {error}
          ></HelloAgain>
      </SafeAreaView>
    );
}

export default SignInScreen;