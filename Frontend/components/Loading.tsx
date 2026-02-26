import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, ImageSourcePropType } from 'react-native';

import { Fonts } from '../styles/theme';

type LoadingProps = {
  backgroundColor: string;
  imageSource: ImageSourcePropType;
  text: string;
  textColor: string;
};


export const Loading = ({ backgroundColor, imageSource, text, textColor }: LoadingProps) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1, 
        duration: 2000, 
        easing: Easing.linear, 
        useNativeDriver: true,
      })
    ).start(); 
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={[styles.container, { backgroundColor}]}>
      <Animated.Image
        source={imageSource}
        style={[styles.loadingImage, { transform: [{ rotate: spin }] }]}
      />
      <Text style={[styles.loadingText, { color: textColor }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  loadingImage: {
    width: 100, 
    height: 100, 
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: Fonts.bold
  },
});
