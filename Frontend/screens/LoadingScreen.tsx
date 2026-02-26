import React, { ReactNode, useState, useEffect } from 'react';

import { Loading } from '../components/Loading';
import { Colors } from '../styles/theme';

type LoadingScreenProps = {
  children: ReactNode;
};

const LoadingScreen = ({ children }: LoadingScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);

  // Fake loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return (
    <Loading 
      backgroundColor={Colors.primary} 
      imageSource={require('../assets/cirkula_logo.png')} 
      text='Cirkula' 
      textColor={Colors.secondary} />
    )
  }

  return (
    children
  );
}

export default LoadingScreen;
