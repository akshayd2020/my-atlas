import React, { Fragment } from 'react';
import { Text, View } from 'native-base';
import ScreenWideButton from './ScreenWideButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ScreenWideInput from '../ScreenWideInput';

type SelectOneProps = {
  title?: string;
  options: string[];
  other: boolean;
  onAnswerPress: (name: string, value: any) => void;
  onAnswerPressOther?: (name: string, value: any, other: boolean) => void;
  stateName: string;
  state: any;
  otherState: any;
};

const SelectOne = (props: SelectOneProps) => {
  return (
    <View marginBottom={hp('2%')}>
      {props.title ? (
        <Text
          font-family="body"
          fontStyle="normal"
          fontWeight="600"
          fontSize="xl"
          fontFamily="heading"
          letterSpacing={wp('0.1%')}
          ml={wp('8%')}
          paddingBottom={hp('1%')}>
          {props.title}
        </Text>
      ) : (
        <Fragment></Fragment>
      )}

      {props.options.map((option, key) => (
        <ScreenWideButton
          key={key}
          text={option}
          state={props.state}
          onPress={() => props.onAnswerPress(props.stateName, option)}
        />
      ))}
      {props.other ? (
        <ScreenWideInput
          name={props.stateName}
          text={props.otherState}
          placeholderText="Other"
          onChangeText={props.onAnswerPressOther}
          isOther
        />
      ) : null}
    </View>
  );
};

export default SelectOne;
