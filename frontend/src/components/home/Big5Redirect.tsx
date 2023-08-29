import { Box, Pressable, Text } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type Big5RedirectProps = {
  onPress: any;
  titleText: string;
  subtitleText?: string;
};

const Big5Redirect = (props: Big5RedirectProps) => {
  return (
    <Pressable
      backgroundColor={'terra'}
      marginX={wp('7%')}
      paddingX={wp('5%')}
      paddingY={hp('1.5%')}
      borderRadius={10}
      marginTop={hp('2%')}
      onPress={props.onPress}
      shadow="2">
      <Text fontSize={'lg'} color={'white'} fontWeight="semibold">
        {props.titleText}
      </Text>
      <Text fontSize={'sm'} color={'white'} fontWeight="medium" marginTop={hp('-0.1%')}>
        {props.subtitleText}
      </Text>
    </Pressable>
  );
};

export default Big5Redirect;
