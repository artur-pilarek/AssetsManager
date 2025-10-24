import { IAsset } from '../models';
import { ApiClient } from './ApiClient';

export class AssetService {
  private api: ApiClient;

  constructor(apiClient: ApiClient) {
    this.api = apiClient;
  }

  async getAll(query?: string): Promise<IAsset[]> {
    const q = query ? query : '?$orderby=assetTag';
    return await this.api.get<IAsset[]>(`/odata/Assets${q}`);
  }

  async getById(id: number): Promise<IAsset> {
    return await this.api.get<IAsset>(`/odata/Assets(${id})`);
  }
}