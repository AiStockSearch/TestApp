import AsyncStorage from '@react-native-async-storage/async-storage';

export class AsyncStorageManger {
  private storage: typeof AsyncStorage = AsyncStorage;

  constructor(storage: typeof AsyncStorage) {
    this.storage = storage;
  }

  public async getItem(
    key: string,
  ): Promise<string | null> {
    return await this.storage.getItem(key);
  }

  public async setItem(
    key: string,
    value: string,
  ): Promise<void> {
    await this.storage.setItem(key, value);
  }
  public async removeItem(key: string): Promise<void> {
    await this.storage.removeItem(key);
  }
  public async clearAllItems(): Promise<void> {
    await this.storage.clear();
  }
}
