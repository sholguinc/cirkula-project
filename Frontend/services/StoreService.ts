import ApiService from "./ApiService";
import Logger from "./LogService";

import { Store } from "../models/Store";

const API_URL = "http://192.168.1.10:5016";

export default class StoreService extends ApiService {
  constructor() {
    super(API_URL);
  }

  async getStores(latitude: number, longitude: number): Promise<Store[]> {
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