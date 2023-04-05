import React, { useState, createContext, useEffect } from 'react';
import authService from '../services/authService';
import { isPlatform } from '@ionic/react';
import { Filesystem, Directory } from '@capacitor/filesystem';

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  // Store the variables we want to share
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const TOKEN_FILE_NAME = 'authToken.txt';

  const storeToken = async (token) => {
    if (isPlatform('hybrid')) {
      await Filesystem.writeFile({
        path: TOKEN_FILE_NAME,
        data: token,
        directory: Directory.Data,
      });
      console.log('Stored in mobile')
    } else {
      localStorage.setItem('authToken', token);
    }
  };

  const removeToken = async () => {
    if (isPlatform('hybrid')) {
      await Filesystem.deleteFile({
        path: TOKEN_FILE_NAME,
        directory: Directory.Data,
      });
    } else {
      localStorage.removeItem('authToken');
    }
  };

  const getToken = async () => {
    if (isPlatform('hybrid')) {
      try {
        const tokenFile = await Filesystem.readFile({
          path: TOKEN_FILE_NAME,
          directory: Directory.Data,
        });
        return tokenFile.data;
      } catch (error) {
        console.error('Error reading auth token file:', error);
        return null;
      }
    } else {
      return localStorage.getItem('authToken');
    }
  };
  

  // Function to check if the user is already authenticated and update the states, accessible from anywhere
  const authenticateUser = async () => {
    setLoading(true);
    const storedToken = await getToken();
    console.log(`In authenticate token: ${storedToken}`)
    if (storedToken) {
      try {
        const response = await authService.me();
        setIsLoggedIn(true);
        setLoading(false);
        setUser(response);
      } catch (error) {
        setIsLoggedIn(false);
        setLoading(false);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setLoading(false);
      setUser(null);
    }
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  }

  // When the app first renders, let's see if the user's session is still active
  useEffect(() => {
    authenticateUser();
    // eslint-disable-next-line
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isLoading, storeToken, authenticateUser, removeToken, logOutUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext };

