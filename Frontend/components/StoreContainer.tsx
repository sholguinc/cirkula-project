import React, { useEffect, useState } from "react";
import { Text, ActivityIndicator, StyleSheet, View } from "react-native";
import * as Location from 'expo-location';

import StoreList from "../components/StoreList";
import StoreService from "../services/StoreService";
import { Store } from "../models/Store";
import { Coordinates } from "../models/Coordinates";

const storeService = new StoreService();

const HARCODED_LATITUDE = -12.0464;
const HARCODED_LONGITUDE = -77.0282;
const HARCODED_LOCATION = { latitude: HARCODED_LATITUDE, longitude: HARCODED_LONGITUDE };

const StoreContainer = () => {
  const [, setLocation] = useState<Coordinates>(HARCODED_LOCATION);
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      const currentLocation: Coordinates = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      };

      setLocation(currentLocation);

      return currentLocation;
    }
    
    const fetchStores = async () => {
      try {
        const currentLocation = await getLocation() as Coordinates;
        const data = await storeService.getStores(currentLocation);
        setStores(data);
      } catch (err: any) {
        setError(err.message || "Error fetching stores");
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading stores...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View >
    );
  }

  return (
    <StoreList stores={stores} />
  );
};

export default StoreContainer;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
