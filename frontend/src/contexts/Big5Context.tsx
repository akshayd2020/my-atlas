import { createContext, useContext, useState } from 'react';
import { IPersonalityScore } from '../interfaces/IPersonalityScore';

type Big5ContextData = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  big5State: any;
  setBig5State: React.Dispatch<React.SetStateAction<any>>;
  big5Flow: Object;
  handleChange: (name: number, value: any) => void;
  calculateScore: () => IPersonalityScore;
};

type SignUpProviderProps = {
  children?: React.ReactNode;
};

const Big5Context = createContext<Big5ContextData>({} as Big5ContextData);

const Big5Provider: React.FC<SignUpProviderProps> = ({ children }) => {
  const [page, setPage] = useState(0);
  const [big5State, setBig5State] = useState<string[]>(Array.apply(null, Array(50)).map(function () {}));
  const big5Flow = [
    {
      page: 'Big 5 Intro Screen',
      props: {},
    },
    {
      page: 'Big 5 Start Screen',
      props: {},
    },
    {
      page: 'Big 5 Selection Screen',
      props: {
        progress: 20,
        questions: [
          {
            question: 'I am the life of the party',
            stateName: 0,
          },
          {
            question: 'I feel little concern for others',
            stateName: 1,
          },
          {
            question: 'I am always prepared',
            stateName: 2,
          },
          {
            question: 'I get stressed out easily',
            stateName: 3,
          },
          {
            question: 'I have a rich vocabulary',
            stateName: 4,
          },
          {
            question: "I don't talk a lot",
            stateName: 5,
          },
          {
            question: 'I am interested in people',
            stateName: 6,
          },
          {
            question: 'I leave my belongings around',
            stateName: 7,
          },
          {
            question: 'I am relaxed most of the time',
            stateName: 8,
          },
          {
            question: 'I have difficulty understanding abstract ideas',
            stateName: 9,
          },
        ],
      },
    },
    {
      page: 'Big 5 Selection Screen',
      props: {
        progress: 40,
        questions: [
          {
            question: 'I feel comfortable around people',
            stateName: 10,
          },
          {
            question: 'I insult people',
            stateName: 11,
          },
          {
            question: 'I pay attention to details',
            stateName: 12,
          },
          {
            question: 'I worry about things',
            stateName: 13,
          },
          {
            question: 'I have a vivid imagination',
            stateName: 14,
          },
          {
            question: 'I keep in the background',
            stateName: 15,
          },
          {
            question: "I sympathize with others' feelings",
            stateName: 16,
          },
          {
            question: 'I make a mess of things',
            stateName: 17,
          },
          {
            question: 'I seldom feel blue',
            stateName: 18,
          },
          {
            question: 'I am not interested in abstract ideas',
            stateName: 19,
          },
        ],
      },
    },
    {
      page: 'Big 5 Selection Screen',
      props: {
        progress: 60,
        questions: [
          {
            question: 'I start conversations',
            stateName: 20,
          },
          {
            question: "I am not interested in other people's problems",
            stateName: 21,
          },
          {
            question: 'I get chores done right away',
            stateName: 22,
          },
          {
            question: 'I am easily disturbed',
            stateName: 23,
          },
          {
            question: 'I have excellent ideas',
            stateName: 24,
          },
          {
            question: 'I have little to say',
            stateName: 25,
          },
          {
            question: 'I have a soft heart',
            stateName: 26,
          },
          {
            question: 'I often forget to put things back in their proper place',
            stateName: 27,
          },
          {
            question: 'I get upset easily',
            stateName: 28,
          },
          {
            question: 'I do not have a good imagination',
            stateName: 29,
          },
        ],
      },
    },
    {
      page: 'Big 5 Selection Screen',
      props: {
        progress: 80,
        questions: [
          {
            question: 'I talk to a lot of different people at parties',
            stateName: 30,
          },
          {
            question: 'I am not really interested in others',
            stateName: 31,
          },
          {
            question: 'I like order',
            stateName: 32,
          },
          {
            question: 'I change my mood a lot',
            stateName: 33,
          },
          {
            question: 'I am quick to understand things',
            stateName: 34,
          },
          {
            question: "I don't like to draw attention to myself",
            stateName: 35,
          },
          {
            question: 'I take time out for others',
            stateName: 36,
          },
          {
            question: 'I shirk my duties',
            stateName: 37,
          },
          {
            question: 'I have frequent mood swings',
            stateName: 38,
          },
          {
            question: 'I use difficult words',
            stateName: 39,
          },
        ],
      },
    },
    {
      page: 'Big 5 Selection Screen',
      props: {
        progress: 100,
        questions: [
          {
            question: "I don't mind being the center of attention",
            stateName: 40,
          },
          {
            question: "I feel others' emotions",
            stateName: 41,
          },
          {
            question: 'I follow a schedule',
            stateName: 42,
          },
          {
            question: 'I get irritated easily',
            stateName: 43,
          },
          {
            question: 'I spend time reflecting on things',
            stateName: 44,
          },
          {
            question: 'I am quiet around strangers',
            stateName: 45,
          },
          {
            question: 'I make people feel at ease',
            stateName: 46,
          },
          {
            question: 'I am exacting in my work',
            stateName: 47,
          },
          {
            question: 'I often feel blue',
            stateName: 48,
          },
          {
            question: 'I am full of ideas',
            stateName: 49,
          },
        ],
      },
    },
  ];

  const handleChange = (index: number, value: any) => {
    setBig5State(prevData => [
        ...prevData.slice(0,index),
        value,
        ...prevData.slice(index + 1)
    ]);
  };

  const calculateScore = () : IPersonalityScore => {
    const scores : number[] = big5State.map((s : string) => (Number.parseInt(s)))
    const E = 20 + scores[0] - scores[5] + scores[10] - scores[15] + scores[20] - scores[25] + scores[30] - scores[35] + scores[40] - scores[45]
    const A = 14 - scores[1] + scores[6] - scores[11] + scores[16] - scores[21] + scores[26] - scores[31] + scores[36] + scores[41] + scores[46]
    const C = 14 + scores[2] - scores[7] + scores[12] - scores[17] + scores[22] - scores[27] + scores[32] - scores[37] + scores[42] + scores[47]
    const N = 38 - scores[3] + scores[8] - scores[13] + scores[18] - scores[23] - scores[28] - scores[33] - scores[38] - scores[43] - scores[48]
    const O = 8 + scores[4] - scores[9] + scores[14] - scores[19] + scores[24] - scores[29] + scores[34] + scores[39] + scores[44] + scores[49]
    return {  
      Openness: O,
      Conscientiousness: C,
      Extraversion: E,
      Agreeableness: A,
      Neuroticism: N
    }
  }

  return (
    <Big5Context.Provider
      value={{ page, setPage, big5State, setBig5State, big5Flow, handleChange, calculateScore }}>
      {children}
    </Big5Context.Provider>
  );
};

const useBig5 = (): Big5ContextData => {
  const context = useContext(Big5Context);

  if (!context) {
    throw new Error('useBig5 must be used within an Big5Provider');
  }
  return context;
};

export { Big5Context, Big5Provider, useBig5};
