import { Fragment, ReactNode, useEffect } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { Box, Text, Center, Input, Progress, VStack, View, Pressable } from 'native-base';
import ScreenWideInput from './ScreenWideInput';
// The library used above is how we make our frontend responsive. Responsive means
// being able to adapt our code to whatever screen size/format we like.

// This is how we declare what type of props our component expects.
// Here, it is declared that the question compared can take in children if given
// (Notice the question mark). As well as a string for the question itself.
type DateSelector = {
  children?: ReactNode;
  text: string;
  inputName: string;
  onChangeText: (name, value) => void;
};

const DateSelector = (props: DateSelector) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();


  return (
    <>
      <ScreenWideInput
        name="dob"
        onChangeText={(name, value) => void(0)}
        placeholderText={props.inputName}
        text={props.text}
        onPressIn={() => setOpen(true)}></ScreenWideInput>
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        title={null}
        maximumDate={new Date()}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          props.onChangeText('dob', date.toLocaleDateString())
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );

  return (
    <Center w="100%" color={'black'}>
      <DatePicker
        date={date}
        maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 12))}
        onDateChange={setDate}
        mode="date"
        androidVariant="nativeAndroid"
      />
    </Center>
  );
  // This is how you can style a Nativebase component. For now we are going to inline them
  // just for ease of customization but we will later extract some things out for repeitiveness
  return (
    <Fragment>
      <Text
        fontSize={hp('3%')}
        ml={wp('10%')}
        mr={wp('20%')}
        mt={hp('3%')}
        color={'midnight'}
        fontWeight="semibold"
        lineHeight={hp('3.2%')}
        letterSpacing={wp('0.23%')}></Text>
      {props.children}
    </Fragment>
  );
};

export default DateSelector;
