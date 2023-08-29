import React from 'react';
import {View, StyleSheet, SafeAreaView, Pressable, Text} from 'react-native';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

type NextButtonProps = {
    onPress?: any;
    iconColor: string;
    bgColor: string;
    pressedIconColor: string;
    pressedBgColor: string
}

export const NextButton = (props: NextButtonProps) => {

  const styles = StyleSheet.create({
    button: {
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: wp('4%'),
      right: wp('12%')
    },
  });
  
  return(
    <View>
      <Pressable style={({pressed}) => [{backgroundColor: pressed ? props.pressedBgColor : props.bgColor}, styles.button]} onPress={props.onPress} children={({pressed}) => (
        <Icon name='chevron-right' size={52} color={ pressed ? props.pressedIconColor : props.iconColor}/>
      )} />
    </View>
  )
}

export default NextButton;