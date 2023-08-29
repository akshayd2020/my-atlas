import { Container, Text, View } from 'native-base';
import { SafeAreaView } from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import { useAuth } from '../../contexts/AuthContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Big5Card from '../../components/home/Big5Card';
import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';

const Big5Results = ({ route, navigation }) => {
  const auth = useAuth();
  const userId = auth.authData.user._id;
  const token = auth.authData.token;

  const [{ data, loading, error }, refetch] = useAxios({
    url: 'http://localhost:3000/api/onboarding/getOnboarding/' + userId,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const back = async () => {
    navigation.pop();
  };

  const [expanded, setExpanded] = useState('');

  const descriptions = {
    Extraversion:
      'Individuals score highly are often described as "the life of the party". They are outgoing, friendly, easy to get on with, and talkative. Individuals score lowly tend to be a bit more reserved. They have a small, tight-knit, circle of close friends, and prefer not to be the centre of attention.',
    Agreeableness:
      'Individuals score highly tend to be loyal and trustworthy. They enjoy helping others, are sincere, and prefer to avoid confrontations. Individuals score lowly tend to be more practical than altruistic. They can be critical of others and are not concerned with what others think of them.',
    Conscientiousness:
      'Individuals score highly are highly organised, dependable, driven, and have a high level of self-discipline. Individuals who score lowly are impulsive, spontaneous, and may be prone to procrastination.',
    Neuroticism:
      "Individuals who score highly tend to be sensitive, apprehensive and prone to worrying. They may be impulsive, pessimistic, or struggle to cope with stress. Individuals who score lowly tend to be cool under pressure. They are slow to anger, are not stressed by others' opinions of them, and tend to not sweat the small stuff.",
    Openness:
      'Individuals who score highly to experience enjoy variety and trying new things. Individuals who score lowly to experience prefer routine to novelty.',
  };

  useEffect(() => {}, [expanded, data]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFCFA' }}>
      <Container h={'full'} w={'full'} maxWidth="100%" maxHeight="100%">
        <ProgressBar hasSkip={false} hasProgress={false} backFunction={back} />
        <View marginX={wp('9%')}>
          <Text
            fontSize={hp('3%')}
            color={'midnight'}
            lineHeight={hp('3.2%')}
            fontFamily="heading"
            fontWeight={'700'}
            fontStyle={'normal'}
            letterSpacing={wp('0.1%')}>
            My Personality Type
          </Text>
          <Text fontSize={'md'} fontWeight="medium" color={'coal'} marginTop={hp('0.5%')}>
            Tap on each section to learn more about your personality type. Final scores are between 0 and 40.
          </Text>
        </View>
        {loading ? (
          <></>
        ) : (
          <View w={'full'}>
            <Big5Card
              title="Extraversion"
              score={data.onboarding.personalityTestScore.Extraversion}
              description={descriptions.Extraversion}
              expanded={expanded === 'Extraversion'}
              updateExpanded={() => setExpanded('Extraversion')}
            />
            <Big5Card
              title="Agreeableness"
              score={data.onboarding.personalityTestScore.Agreeableness}
              description={descriptions.Agreeableness}
              expanded={expanded === 'Agreeableness'}
              updateExpanded={() => setExpanded('Agreeableness')}
            />
            <Big5Card
              title="Conscientiousness"
              score={data.onboarding.personalityTestScore.Conscientiousness}
              description={descriptions.Conscientiousness}
              expanded={expanded === 'Conscientiousness'}
              updateExpanded={() => setExpanded('Conscientiousness')}
            />
            <Big5Card
              title="Neuroticism"
              score={data.onboarding.personalityTestScore.Neuroticism}
              description={descriptions.Neuroticism}
              expanded={expanded === 'Neuroticism'}
              updateExpanded={() => setExpanded('Neuroticism')}
            />
            <Big5Card
              title="Openness"
              score={data.onboarding.personalityTestScore.Openness}
              description={descriptions.Openness}
              expanded={expanded === 'Openness'}
              updateExpanded={() => setExpanded('Openness')}
            />
          </View>
        )}
      </Container>
    </SafeAreaView>
  );
};

export default Big5Results;
