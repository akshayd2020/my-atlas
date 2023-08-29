import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Center, Text, View, keyboardDismissHandlerManager } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Big5Button from './Big5Button';
import { HStack } from 'native-base';

type big5FormProps = {
  title: string;
  formNumber: number;
  state: any;
  handleChange: (name: number, value: any) => void;
};


const Big5Form = (props: big5FormProps) => {
  const buttonData = [
    { number: 1, buttonText: 'Disagree' },
    { number: 2, buttonText: '' },
    { number: 3, buttonText: 'Neutral ' },
    { number: 4, buttonText: '' },
    { number: 5, buttonText: 'Agree ' },
  ];

  return (
    <View>
      <Text
        font-family="body"
        fontStyle="normal"
        fontWeight="600"
        fontSize="2xl"
        mx={wp('8%')}
        py="5"
        color="#271E41">
        {props.title}
      </Text>

      <View mx={wp('4%')}>
        <HStack style={{ justifyContent: 'space-evenly', marginHorizontal: wp('4%')}}>
          {buttonData.map((buttonData, key) => (
            <Big5Button
              key={key}
              formNumber={props.formNumber}
              number={buttonData.number}
              buttonText={buttonData.buttonText}
              pressed={props.state === buttonData.number}
              onAnswerPress={props.handleChange}
            />
          ))}
        </HStack>
      </View>
    </View>
  );
};

export default Big5Form;
