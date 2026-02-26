import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const StoreDetailScreen = () => {
  return (
    <SafeAreaView style={styles.center}>
      <Text> Store Details </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, backgroundColor: "#F9F9F9" }
});

export default StoreDetailScreen;
