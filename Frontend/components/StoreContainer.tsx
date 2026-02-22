import React, { useEffect, useState } from "react";
import { Text, ActivityIndicator } from "react-native";

import StoreList from "../components/StoreList";
import StoreService from "../services/StoreService";
import { Store } from "../models/Store";

const storeService = new StoreService();

const HARCODED_LATITUDE = -12.0464;
const HARCODED_LONGITUDE = -77.0282;

const StoreContainer = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await storeService.getStores(HARCODED_LATITUDE, HARCODED_LONGITUDE);
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
