import React, { Fragment, ReactNode } from 'react';
import { Box, Text, Center, Progress, VStack, View, Pressable } from 'native-base';
import { Alert, Button, GestureResponderEvent,StyleSheet,TextStyle,ViewStyle } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Question from './Question';
// The library used above is how we make our frontend responsive. Responsive means
// being able to adapt our code to whatever screen size/format we like.

// This is how we declare what type of props our component expects.
// Here, it is declared that the question compared can take in children if given
// (Notice the question mark). As well as a string for the question itself.
type YesNoProps = {
  yesFunction: any;
  noFunction: any;
  question: string;
  clicked : any;
};

const YesNo = (props: YesNoProps) => {
  function onPressYes(event: GestureResponderEvent): void {
    props.yesFunction();
  }

  function onPressNo(event: GestureResponderEvent): void {
    props.noFunction();
  }

  return (
    <Center>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Pressable
          style={props.clicked == true ? styles.buttonClicked : styles.button}
          onPress={onPressYes}>
          <Text style={props.clicked == true ? styles.textClicked : styles.text}>{'Yes'}</Text>
        </Pressable>
        <Pressable
          style={props.clicked == false ? styles.buttonClicked : styles.button}
          onPress={onPressNo}>
          <Text style={props.clicked == false ? styles.textClicked : styles.text}>{'No'}</Text>
        </Pressable>
      </View>
    </Center>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(241, 195, 169, 1)',
    marginHorizontal: 15,
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
    marginHorizontal: 15,
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

export default YesNo;
