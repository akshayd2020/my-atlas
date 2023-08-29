import { createContext, useContext, useState } from 'react';
import { IOnboardingFlowState } from '../interfaces/IOnboardingFlowState';

type SignUpContextData = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  signUpState: IOnboardingFlowState;
  setSignUpState: React.Dispatch<React.SetStateAction<any>>;
  signUpFlow: Object;
  handleChange: (name: string, value: any) => void;
  handleChangeArray: (name: string, value: any) => void;
  handleOtherChange: (name: string, value: any, other: boolean) => void;
};

type SignUpProviderProps = {
  children?: React.ReactNode;
};
const SignUpContext = createContext<SignUpContextData>({} as SignUpContextData);

const SignUpProvider: React.FC<SignUpProviderProps> = ({ children }) => {
  const [page, setPage] = useState(0);
  const [signUpState, setSignUpState] = useState<IOnboardingFlowState>({
    dob: undefined,
    email: undefined,
    password: undefined,
    name: undefined,
    phoneNumber: undefined,
    pronouns: undefined,
    pronounsOther: undefined,
    zipcode: undefined,
    sexAssignedAtBirth: undefined,
    gender: undefined,
    genderOther: undefined,
    sexualOrientation: undefined,
    ethnicity: undefined,
    religion: undefined,
    religionOther: undefined,
    mentalHealthStance: undefined,
    soughtCare: undefined,
    concerns: [],
    goals: [],
    spirituality: undefined,
  });
  const signUpFlow = [
    {
      page: 'Sign Up Screen',
      props: {},
    },
    {
      page: 'Single Question Screen',
      props: {
        question: "What's your name?",
        inputName: 'Name',
        stateName: 'name',
        progress: 11,
      },
    },
    {
      page: 'Transition Screen',
      props: {},
    },
    {
      page: 'Single Question Screen',
      props: {
        question: "What's your phone number?",
        inputName: '+1',
        stateName: 'phoneNumber',
        progress: 22,
      },
    },
    {
      page: 'Select One Screen',
      props: {
        question: 'What are your pronouns?',
        stateName: 'pronouns',
        sections: [
          {
            answers: ['she/her/hers', 'he/him/his', 'they/them/theirs', 'ze/hir/hirs'],
            other: true,
            stateName: 'pronouns',
          },
        ],
        progress: 33,
        isLong: false,
      },
    },
    {
      page: 'Select Date Screen',
      props: {
        question: "What's your date of birth?",
        inputName: 'Enter date',
        stateName: 'dob',
        progress: 44,
      },
    },
    {
      page: 'Single Question Screen',
      props: {
        question: 'Where do you live?',
        inputName: 'Zip Code',
        stateName: 'zipcode',
        progress: 55,
      },
    },
    {
      page: 'Select One Screen',
      props: {
        question: 'Which best describes you?',
        skipButton: true,
        sections: [
          {
            title: 'Sex Assigned at Birth',
            answers: ['Female', 'Male'],
            other: true,
            stateName: 'sex',
          },
          {
            title: 'Gender Identity',
            answers: [
              'Woman',
              'Man',
              'Transgender woman',
              'Transgender man',
              'Non-binary',
              'Prefer not to say',
            ],
            other: false,
            stateName: 'gender',
          },
          {
            title: 'Sexual Orientation',
            answers: ['Lesbian', 'Gay', 'Bisexual', 'Queer', 'Asexual', 'Straight'],
            other: true,
            stateName: 'sexualOrientation',
          },
          {
            title: 'Ethnicity',
            answers: [
              'Native American',
              'Asian',
              'Black or African American',
              'Hispanic',
              'Pacific Islander',
              'White',
            ],
            other: false,
            stateName: 'ethnicity',
          },
          {
            title: 'Religion',
            answers: [
              'Protestant',
              'Roman Catholic',
              'Mormon',
              'Greek or Russian Orthodox',
              'Jewish',
              'Muslim',
              'Buddhist',
              'Hindu',
              'Athiest',
              'Agnostic',
              'Non-religious',
            ],
            other: false,
            stateName: 'religion',
          },
        ],
        progress: 66,
        isLong: true,
      },
    },
    {
      page: 'Select One Screen',
      props: {
        question: 'When it comes to self-care and wellness, you are…',
        sections: [
          {
            question: '',
            answers: ['Informed', 'Curious', 'Skeptical'],
          },
        ],
        progress: 77,
      },
    },
    {
      page: 'Yes No Screen',
      props: {
        question: 'Have you sought behavioral health or wellness care in the past?',
        progress: 88,
        stateName: 'soughtCare',
      },
    },
    {
      page: 'Wellness Goals Screen',
      props: {
        progress: 88,
        stateName: 'goals'
        // question: 'Choose your behavioral health and wellness goals',
      },
    },
    {
      page: 'Experience Screen',
      props: {
        progress: 88,
        stateName: 'concerns'
      },
    },
    {
      page: 'Yes No Screen',
      props: {
        question: 'Do you consider yourself spiritual?',
        progress: 100,
        stateName: 'spirituality',
      },
    },
  ];

  const handleChange = (name: string, value: any) => {
    setSignUpState(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeArray = (name: string, value: any) => {
    const arr: string[] = signUpState[name];
    if (arr.includes(value)) {
      arr.splice(arr.indexOf(value));
    } else {
      arr.push(value);
    }
    setSignUpState(prevData => ({
      ...prevData,
      [name]: arr,
    }));
    console.log(arr);
  };

  const handleOtherChange = (name: string, value: any, other: boolean) => {
    if (other) {
      setSignUpState(prevData => ({
        ...prevData,
        [name]: 'Other',
        [name + 'Other']: value,
      }));
    } else {
      handleChange(name, value);
    }
    console.log(signUpState);
  };

  return (
    <SignUpContext.Provider
      value={{
        page,
        setPage,
        signUpState,
        setSignUpState,
        signUpFlow,
        handleChange,
        handleOtherChange,
        handleChangeArray,
      }}>
      {children}
    </SignUpContext.Provider>
  );
};

const useSignUp = (): SignUpContextData => {
  const context = useContext(SignUpContext);

  if (!context) {
    throw new Error('useSignUp must be used within an AuthProvider');
  }

  return context;
};

export { SignUpContext, SignUpProvider, useSignUp };
