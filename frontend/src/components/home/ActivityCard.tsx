import { Box, Text, View } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type ActivityCardProps = {
  title: string;
  currentDayValue: number;
  metric: string;
};
const ActivityCard = (props: ActivityCardProps) => {
  return (
    <Box
      backgroundColor={'white'}
      width={wp('41%')}
      shadow="2"
      borderRadius={10}
      height={hp('15%')}>
      <View height={hp('7%')} paddingTop={hp('1%')}>
        <Text
          fontSize={hp('2.25%')}
          color={'midnight'}
          fontWeight="medium"
          letterSpacing={wp('0.1%')}
          paddingLeft={wp('1%')}
          lineHeight={25}>
          {props.title}
        </Text>
      </View>
      <View flexDirection={'row'}>
        <Text fontSize={hp('4%')} color={'midnight'} fontWeight="medium" paddingLeft={wp('2%')}>
          {props.currentDayValue}
        </Text>
        <View justifyContent={'center'} paddingLeft={wp('0.5%')}>
          <Text>{props.metric}</Text>
        </View>
      </View>
    </Box>
  );
};

export default ActivityCard;
