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

const HomeScreenButton = (props: Big5RedirectProps) => {
  return (
    <Pressable
      backgroundColor={'nectarine'}
      paddingX={wp('5%')}
      paddingY={hp('1.5%')}
      borderRadius={10}
      marginTop={hp('2%')}
      onPress={props.onPress}
      shadow="2">
      <Text fontSize={'lg'} color={'midnight'} fontWeight="semibold">
        {props.titleText}
      </Text>
      {props.subtitleText ? (
        <Text fontSize={'sm'} color={'white'} fontWeight="medium" marginTop={hp('-0.1%')}>
          {props.subtitleText}
        </Text>
      ) : (
        <></>
      )}
    </Pressable>
  );
};

export default HomeScreenButton;
