import React, { useState } from 'react';
import { Input, InputGroup, InputLeftAddon } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type ScreenWideInputProps = {
  text: string;
  name: string;
  onChangeText: (name, value, other?) => void;
  placeholderText: string;
  marginBottom?: string;
  editable?: boolean;
  onPressIn?: () => void;
  isOther?: boolean;
  pw?: true;
};

const ScreenWideInput = (props: ScreenWideInputProps) => {
  return (
    <Input
      size="xl"
      marginTop={hp('1%')}
      py={hp('1.5%')}
      paddingLeft={wp('5%')}
      marginBottom={props.marginBottom ? hp(props.marginBottom) : hp('1%)')}
      placeholder={props.placeholderText}
      variant="outline"
      mx={wp('8%')}
      placeholderTextColor={'midnight'}
      borderRadius="10px"
      borderColor={'nectarine'}
      value={props.text}
      editable={props.editable}
      onChangeText={value =>
        props.isOther
          ? props.onChangeText(props.name, value, true)
          : props.onChangeText(props.name, value)
      }
      onPressIn={props.onPressIn}
      secureTextEntry={props.pw}
    />
  );
};

export default ScreenWideInput;
