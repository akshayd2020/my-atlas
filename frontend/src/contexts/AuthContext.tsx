import { createContext, useContext, useEffect, useState } from 'react';
import { AuthData, authService } from '../services/authService';
import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';

type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut(): void;
  signUp(): any;
  setAuthData: (value: React.SetStateAction<AuthData>) => void;
};

type AuthProviderProps = {
  children?: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      const authDataSerialized = await getItemAsync('AuthData');
      if (authDataSerialized) {
        const _authData: AuthData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const signUp = async () => {
    try {
      const _authData = await authService.signUp({
        name: 'Test User',
        email: 'test@email.com',
        password: 'test',
        phoneNumber: 'test',
        dob: '06/24/2002'
      });
      setAuthData(_authData);
      setItemAsync('AuthData', JSON.stringify(_authData));
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const signIn = async (email:string, password:string) => {
    try {
      const _authData = await authService.signIn(email, password);
      setAuthData(_authData);
      setItemAsync('AuthData', JSON.stringify(_authData));
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const signOut = async () => {
    setAuthData(undefined);
    await deleteItemAsync('AuthData');
  };

  return (
    <AuthContext.Provider value={{ authData, loading, signIn, signOut, signUp, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { AuthContext, AuthProvider, useAuth };
