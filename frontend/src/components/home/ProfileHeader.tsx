import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Avatar, Icon, IconButton, Text, View } from 'native-base';
import { AtlasLogo } from '../../img';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type HeaderProps = {
  userName: string;
  onPress: any;
};

const ProfileHeader = (props: HeaderProps) => {
  return (
    <View flexDirection={'row'} marginX={wp('7%')} marginTop={hp('3%')}>
      <View justifyContent={'center'}>
        <Avatar source={AtlasLogo}></Avatar>
      </View>

      <View marginLeft={wp('0.5%')}>
        <Text fontSize={hp('2.75%')} color={'midnight'} fontFamily="heading"
            fontWeight={'700'}
            fontStyle={'normal'}
            letterSpacing={wp('0.1%')}>
          Hello, {props.userName}
        </Text>
        <Text fontSize={'lg'} color={'lightGray'} marginTop={hp('-0.5%')}>
          {new Date().toDateString()}
        </Text>
      </View>
      <View marginLeft={'auto'}>
        <IconButton
          onPress={props.onPress}
          icon={<Icon as={MaterialCommunityIcons} name="logout" />}
          _icon={{
            color: 'midnight',
            size: 'xl',
          }}
        />
      </View>
    </View>
  );
};

export default ProfileHeader;
