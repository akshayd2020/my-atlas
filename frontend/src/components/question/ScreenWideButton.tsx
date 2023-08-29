import React from 'react';
import { Button } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type ScreenWideButtonProps = {
    text: string,
    state: string,
    onPress: () => void
}

const ScreenWideButton = (props: ScreenWideButtonProps) => {
  return (
    <Button
      onPress={props.onPress}
      justifyContent="flex-start"
      borderRadius="10px"
      mx={wp('8%')}
      my={hp('1%')}
      paddingLeft={wp('5%')}
      _text={{
        fontSize: 'xl',
        fontWeight: 'semibold',
        color: 'midnight',
        letterSpacing: 'lg',
        textAlign: 'left',
      }}
      _pressed={{
        backgroundColor: 'terra',
        _text: { color: 'white' },
      }}
      bg={'nectarine'}
      isPressed={props.state == props.text}>
      {props.text}
    </Button>
  );
};

export default ScreenWideButton;
