import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import StoreContainer from "../components/StoreContainer";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.center}>
      <StoreContainer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, backgroundColor: "#F9F9F9" }
});

export default HomeScreen;
