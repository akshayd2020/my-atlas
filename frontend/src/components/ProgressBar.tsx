import React, { Fragment, ReactNode } from 'react';
import { Box, Text, Center, Progress, VStack, View, Pressable } from 'native-base';
import { Alert, GestureResponderEvent } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// The library used above is how we make our frontend responsive. Responsive means
// being able to adapt our code to whatever screen size/format we like.

// This is how we declare what type of props our component expects.
// Here, it is declared that the question compared can take in children if given
// (Notice the question mark). As well as a string for the question itself.
type ProgressBarProps = {
  // determines progress value
  progress?: number;
  // checks if the page will display a skip button
  hasSkip: boolean;
  hasProgress: boolean;
  backFunction?: any;
  skipFunction?: any;
};

const ProgressBar = (props: ProgressBarProps) => {
    function onPressBack(event: GestureResponderEvent): void {
      // callback function implementation TBD
      props.backFunction()
    }

    function onPressSkip(event: GestureResponderEvent): void {
      // callback function implementation TBD
      props.skipFunction()
    }

  return (
    <Center w="100%" paddingBottom={hp("1%")}>
      <Box w="90%" maxW="400">
        <VStack>
          <VStack mx="4" space="2xs">
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Pressable onPress={onPressBack}>
                <Text color={'gray'} fontWeight="semibold" textAlign="left">
                  Back
                </Text>
              </Pressable>
              <Pressable onPress={onPressSkip}>
                {props.hasSkip ? (
                  <Text color={'gray'} fontWeight="semibold" textAlign="right">
                    Skip
                  </Text>
                ) : (
                  <Text></Text>
                )}
              </Pressable>
            </View>
            {props.hasProgress ? (
              <Progress
                colorScheme="background: rgba(39, 30, 65, 1);"
                value={props.progress}
              />
            ) : (
              <Text></Text>
            )}
          </VStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default ProgressBar;
