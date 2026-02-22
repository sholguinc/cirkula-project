import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { Store } from "../models/Store";

type StoreListProps = {
  stores: Store[];
};

export default function StoreList({ stores }: StoreListProps) {
  let noStores = !stores || stores.length === 0;

  if (noStores) {
    return (
      <View style={styles.center}>
        <Text>No stores available</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={stores}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <View style={styles.storeCard}>
          <Image source={{ uri: item.bannerUrl }} style={styles.banner} />
          <Text style={styles.name}>{item.name}</Text>
          <Text>{item.distanceKm.toFixed(2)} km away</Text>
          <Text>
            Hours: {item.openTime} - {item.closeTime}
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  storeCard: {
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  banner: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
});