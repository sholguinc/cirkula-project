import React, { useEffect, useState } from "react";
import { Text, ActivityIndicator } from "react-native";
import * as Location from 'expo-location';

import StoreList from "../components/StoreList";
import StoreService from "../services/StoreService";
import { Store } from "../models/Store";
import { Location as ILocation } from "../models/Location";

const storeService = new StoreService();

const HARCODED_LATITUDE = -12.0464;
const HARCODED_LONGITUDE = -77.0282;
const HARCODED_LOCATION = { latitude: HARCODED_LATITUDE, longitude: HARCODED_LONGITUDE };

const StoreContainer = () => {
  const [location, setLocation] = useState<ILocation>(HARCODED_LOCATION);
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    }
    
    const fetchStores = async () => {
      try {
        getLocation();
        const data = await storeService.getStores(location.latitude, location.longitude);
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
      <>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading stores...</Text>
      </>
    );
  }

  if (error) {
    return (
      <Text style={{ color: "red" }}>{error}</Text>
    );
  }

  return (
    <StoreList stores={stores} />
  );
};

export default StoreContainer;
