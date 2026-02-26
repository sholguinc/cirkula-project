import React from "react";
import { View, Text, FlatList, Image, StyleSheet, ListRenderItem } from "react-native";
import { Store } from "../models/Store";

import { Colors, Fonts, FontSizes } from "../styles/theme";

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
      contentContainerStyle={styles.container}
      renderItem={StoreItem}
    />
  );
}

const StoreItem: ListRenderItem<Store> = ({ item }) => {
  const distance = item.distanceInKm.toFixed(1);


  return (
    <View style={styles.storeCard}>
      <Image source={{ uri: item.bannerUrl }} style={styles.banner} />
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoContent}>
            <Image source={require('../assets/location_outline.png')} style={styles.icon}/>
            <Text style={styles.infoText}>
              {distance} km
            </Text>
          </View>
          <View style={styles.infoContent}>
            <Image source={require('../assets/alarm.png')} style={styles.icon}/>
            <Text style={styles.infoText}>
              {item.openTime} / {item.closeTime}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "stretch",
    paddingVertical: 20,
    marginHorizontal: 'auto',
    width: '90%',
    maxWidth: 400,
  },
  storeCard: {
    padding: 16,
    marginBottom: 15,
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    width: '100%',

    // Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0, 
    },
    shadowOpacity: 0.15, 
    shadowRadius: 20,
  },
  banner: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  name: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.body,
    marginBottom: 4,
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  infoContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 6
  },
  infoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoText: {
    color: Colors.details,
    fontFamily: Fonts.bold,
    textTransform: "lowercase"
  },
  icon: {
    marginRight: 4
  }
});