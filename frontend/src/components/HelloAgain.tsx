import React, { Fragment, ReactNode, useState } from 'react';
import { Box, Text, Center, Progress, VStack, View, Pressable, Heading } from 'native-base';
import {
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ScreenWideInput from './ScreenWideInput';
// The library used above is how we make our frontend responsive. Responsive means
// being able to adapt our code to whatever screen size/format we like.

// This is how we declare what type of props our component expects.
// Here, it is declared that the question compared can take in children if given
// (Notice the question mark). As well as a string for the question itself.
type HelloAgainProps = {
  signInFunction: any;
  googleFunction: any;
  appleFunction: any;
  errorMsg: string;
};

const HelloAgain = (props: HelloAgainProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signIn, setSignIn] = useState(false);

  function onPressSignIn(event: GestureResponderEvent): void {
    props.signInFunction(email, password);
    setSignIn(true);
  }

  function onPressGoogle(event: GestureResponderEvent): void {
    props.googleFunction();
  }

  function onPressApple(event: GestureResponderEvent): void {
    props.appleFunction();
  }

  return (
    <VStack>
      <Center>
        <Heading size="2xl" marginTop={hp('5%')} marginBottom={hp('1%')} fontFamily="heading"
            fontWeight={'700'}
            fontStyle={'normal'}
            letterSpacing={wp('0.1%')}>
          Hello again!
        </Heading>
        <Text style={{ fontSize: 18 }} marginBottom={hp('4%')}>
          You've been missed!
        </Text>
        <ScreenWideInput
          name="email"
          onChangeText={(name, value) => setEmail(value)}
          placeholderText="E-mail"
          text={email}
        />
        <ScreenWideInput
          name="password"
          onChangeText={(name, value) => setPassword(value)}
          placeholderText="Password"
          text={password}
        />
        {props.errorMsg ? (
          <Text color={'red.500'} fontWeight="semibold">
            {props.errorMsg}
          </Text>
        ) : (
          <Text></Text>
        )}
      </Center>
      <Text
        style={{ fontSize: 15, textAlign: 'right' }}
        marginBottom={hp('3%')}
        marginRight={hp('1%')}>
        Forgot password?
      </Text>
      <Center>
        <Pressable
          onPress={onPressSignIn}
          style={signIn == true && props.errorMsg == "" ? styles.buttonClicked : styles.button}>
          <Text style={styles.text}>{'Sign in'}</Text>
        </Pressable>
        <Text style={{ fontSize: 17 }} marginTop={hp('5%')} marginBottom={hp('5%')}>
          ------------- or -------------
        </Text>
        <Pressable marginBottom={hp('3%')} style={styles.button} onPress={onPressGoogle}>
          <Text style={styles.text}>{'Continue with Google'}</Text>
        </Pressable>
        <Pressable marginBottom={hp('1%')} style={styles.button} onPress={onPressApple}>
          <Text style={styles.text}>{'Continue with Apple'}</Text>
        </Pressable>
      </Center>
    </VStack>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(241, 195, 169, 1)',
    shadowColor: '#52006A',
  },
  text: {
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 23,
    letterSpacing: 0.6,
    color: '#271E41',
    fontSize: 20,
  },
  buttonClicked: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(197, 84, 21, 1);',
  },
  textClicked: {
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 23,
    letterSpacing: 0.6,
    color: 'white',
    fontSize: 20,
  },
});

export default HelloAgain;
