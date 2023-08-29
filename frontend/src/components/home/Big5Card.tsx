import { Pressable, Text, View } from 'native-base';
import { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Collapsible from 'react-native-collapsible';

type Big5CardProps = {
  title: string;
  description: string;
  score: number;
  expanded: boolean;
  updateExpanded: any;
};

const Big5Card = (props: Big5CardProps) => {
  const convertScore = score => {
    if (score <= 8) {
      return 'Low';
    } else if (score <= 16) {
      return 'Below Average';
    } else if (score <= 24) {
      return 'Average';
    } else if (score <= 34) {
      return 'Above Average';
    } else {
      return 'High';
    }
  };
  const [rating, setRating] = useState<String>(convertScore(props.score));

  return (
    <Pressable
      backgroundColor={'white'}
      marginX={wp('7%')}
      paddingX={wp('5%')}
      paddingY={hp('2%')}
      borderRadius={10}
      marginTop={hp('2%')}
      onPress={props.updateExpanded}
      shadow="2">
      <View flexDirection={'row'}>
        <View>
          <Text fontSize={'lg'} color={'midnight'} fontFamily="heading"
            fontWeight={'600'}
            fontStyle={'normal'}
            letterSpacing={wp('0.1%')}>
            {props.title}
          </Text>
          <Text fontSize={'sm'} color={'nectarineDark'} fontWeight="medium" marginTop={hp('-0.1%')}>
            {rating}
          </Text>
        </View>
        <View justifyContent={'center'} marginLeft={'auto'} marginRight={hp('2%')}>
          <Text color={'terra'} fontSize={'3xl'} fontWeight="bold">
            {props.score}
          </Text>
        </View>
      </View>
      <Collapsible collapsed={!props.expanded}>
        <Text fontWeight={'medium'} color={'midnight'}>
          {props.description}
        </Text>
      </Collapsible>
    </Pressable>
  );
};

export default Big5Card;
