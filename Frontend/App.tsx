import { View, StyleSheet } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useFonts } from "expo-font";
import {
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato";

import LoadingScreen from "./screens/LoadingScreen";
import Navigation from "./Navigation";

import { Sizes } from "./styles/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <View style={styles.appContainer}>
        <LoadingScreen>
          <Navigation/>
        </LoadingScreen>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    width: '100%',
    maxWidth: Sizes.maxWidth, 
    backgroundColor: '#F9F9F9'
  },
});
