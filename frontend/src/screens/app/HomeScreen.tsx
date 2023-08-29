import React, { useEffect, useState } from 'react';
import { Button, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import Question from '../../components/Question';
import { addMany } from '../../services/healthServices/healthServices';
import { getUser } from '../../services/userService';
import { addHealthLocally } from '../../services/healthServices/healthServices';
import { getLocalData } from '../../services/healthServices/healthServices';
import ProfileHeader from '../../components/home/ProfileHeader';
import Big5Redirect from '../../components/home/Big5Redirect';
import useAxios from 'axios-hooks';
import ActivityStats from '../../components/home/ActivityStats';
import { getItemAsync } from 'expo-secure-store';
import HomeScreenButton from '../../components/home/HomeScreenButton';
import { View } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const HomeScreen = ({ navigation, route }) => {
  const auth = useAuth();
  const userID = auth.authData.user._id;
  const token = auth.authData.token;
  const [callCount, setCallCount] = useState(0);
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [heartRate, setHeartRate] = useState(0);
  const [restingHeartRate, setRestingHeartRate] = useState(0);
  const [sleep, setSleep] = useState(0);
  const signOut = async () => {
    await auth.signOut();
  };

  const [{ data, loading, error }, refetch] = useAxios({
    url: 'http://localhost:3000/api/onboarding/getPersonalityTestCompleted/' + userID,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const big5Redirect = () => {
    navigation.push('Big 5 Results Screen');
  };

  const big5TestRedirect = () => {
    navigation.push('Big 5 Stack', { screen: 'Big 5 Intro Screen' });
  };

  const updateFields = async () => {
    const activity: any = JSON.parse(await getItemAsync('Activity'));
    const heartRate: any = JSON.parse(await getItemAsync('HeartRateSample'));
    const restingHeartRate: any = JSON.parse(await getItemAsync('RestingHeartRate'));
    const deepSleep: any = JSON.parse(await getItemAsync('DeepSleepSamples'));
    const coreSleep: any = JSON.parse(await getItemAsync('CoreSleepSamples'));
    const remSleep: any = JSON.parse(await getItemAsync('RemSleepSamples'));
    const deepSleepValue = deepSleep.duration == null ? deepSleep.duration / 3600000 : 0;
    const coreSleepValue = coreSleep.duration ? coreSleep.duration / 3600000 : 0;
    const remSleepValue = remSleep.duration ? remSleep.duration / 3600000 : 0;
  
    if (activity.dailyStepCountSamples) setSteps(activity.dailyStepCountSamples);
    if (activity.dailyDistanceWalkingRunningSamples)
      setDistance(activity.dailyDistanceWalkingRunningSamples / 1609.344);
    if (activity.activeEnergyBurned) setEnergy(activity.activeEnergyBurned);
    if (heartRate.bpm) setHeartRate(heartRate.bpm);
    if (restingHeartRate.bpm) setRestingHeartRate(restingHeartRate.bpm);
    setSleep(deepSleepValue + coreSleepValue + remSleepValue);
  };

  useEffect(() => {
    setTimeout(updateFields, 250);
  }, [callCount]);

  function doStuff() {
    addMany(userID, token);
  }

  function getUserStuff() {
    try {
      getUser(token);
    } catch (error) {
      console.log(error);
    }
  }

  function addDataLocally() {
    addHealthLocally(userID);
    setCallCount(prevCount => (prevCount += 1));
  }
  function getLocallyData() {
    getLocalData();
  }

  const pressableRetrieval = () => {
    return data ? (
      <Big5Redirect
        onPress={big5Redirect}
        titleText={'See Big 5 Personality Test Results'}
        subtitleText={'Quiz to measure 5 Personality Traits'}
      />
    ) : (
      <Big5Redirect
        onPress={big5TestRedirect}
        titleText={'Complete Big 5 Personality Test'}
        subtitleText={'Quiz to measure 5 Personality Traits'}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFCFA' }}>
      <ProfileHeader userName={auth.authData.user.name} onPress={signOut} />
      {loading ? <></> : error ? <Text>Failed to get Onboarding Info</Text> : pressableRetrieval()}
      <View flexDirection={'row'} maxWidth={'100%'} justifyContent="space-between" marginX={wp('7%')}>
        <HomeScreenButton titleText="Add To Backend" onPress={doStuff} />
        <HomeScreenButton titleText="Add To Local" onPress={addDataLocally} />
      </View>
      <ActivityStats
        userID={userID}
        token={token}
        daySteps={steps}
        dayDistance={distance}
        dayEnergy={energy}
        dayHeartRate={heartRate}
        dayRestingHeartRate={restingHeartRate}
        daySleepTime={sleep}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
