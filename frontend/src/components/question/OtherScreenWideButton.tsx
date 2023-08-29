import React, { useState } from 'react';
import { Button, Input } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type OtherScreenWideButtonProps = {
  onPress: () => void;
};

const OtherScreenWideButton = (props: OtherScreenWideButtonProps) => {
  const [text, setText] = useState('');

  return (
    <Input
      size="xl"
      placeholder="Other"
      variant="outline"
      mx={wp('5%')}
      my={hp('1%')}
      placeholderTextColor={'midnight'}
      backgroundColor={'cream'}
      borderRadius="10px"
      borderColor={'nectarine'}
      value={text}
      onChangeText={value => setText(value)}
    />
  );
};

export default OtherScreenWideButton;
