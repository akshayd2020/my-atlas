import React, { Fragment } from 'react';
import { Button, Text, View } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Center, Square, Circle } from 'native-base';

type big5ButtonProps = {
  formNumber: number;
  number: number;
  buttonText: string;
  pressed: boolean;
  onAnswerPress: (name: number, value: any) => void;
};

const Big5Button = (props: big5ButtonProps) => {
  return (
    <View>
      <Center>
        <Button
          width={wp('12%')}
          height={wp('12%')}
          borderRadius={wp('10%')}
          _text={{ color: 'midnight', fontSize: 'xl', fontWeight: '700' }}
          mb={hp('0.5%')}
          background={'lavender'}
          _pressed={{
            backgroundColor: 'midnight',
            _text: { color: 'lilac' },
          }}
          isPressed={props.pressed}
          onPress={() => props.onAnswerPress(props.formNumber, props.number)}>
          {props.number}
        </Button>
        <Text fontSize="sm" color={'midnight'} justifyContent="center">
          {props.buttonText}
        </Text>
      </Center>
    </View>
  );
};

export default Big5Button;
