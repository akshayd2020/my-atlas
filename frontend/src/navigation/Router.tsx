import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const Router = () => {
  const { authData, loading } = useAuth();

  return (
    <NavigationContainer>
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;