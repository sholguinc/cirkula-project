import ApiService from "./ApiService";
import Logger from "./LogService";

import { Store } from "../models/Store";
import { Coordinates } from "../models/Coordinates";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default class StoreService extends ApiService {
  constructor() {
    super(API_URL);
  }

  async getStores(coordinates: Coordinates): Promise<Store[]> {
    const latitude = coordinates.latitude;
    const longitude = coordinates.longitude;
    
    Logger.debug(`[StoreService] Fetching stores near lat:${latitude}, lon:${longitude}`);

    try {
      const stores = await this.get<object, Store[]>("/api/Stores", { latitude, longitude });
      Logger.debug(`[StoreService] Received ${stores.length} stores`);
      return stores;
    } catch (err) {
      Logger.error("[StoreService] Failed to fetch stores:", err);
      throw err;
    }
  }
}