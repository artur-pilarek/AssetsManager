import { IAsset } from '../models';
import { ApiClient } from './ApiClient';

export class AssetService {
  private api: ApiClient;

  constructor(apiClient: ApiClient) {
    this.api = apiClient;
  }

  async getAll(query?: string): Promise<IAsset[]> {
    const q = query ? query : '?$orderby=assetTag';
    return await this.api.get<IAsset[]>(`/odata/AssetsOData${q}`);
  }

  async getById(id: number): Promise<IAsset> {
    return await this.api.get<IAsset>(`/odata/AssetsOData(${id})`);
  }

  async create(asset: IAsset): Promise<IAsset> {
    return await this.api.post<IAsset>('/api/AssetsAPI', asset);
    }

    async update(asset: IAsset): Promise<IAsset> {
    return await this.api.put<IAsset>(`/api/AssetsAPI`, asset);
    }

    async delete(id: number): Promise<void> {
    await this.api.delete(`/api/AssetsAPI/${id}`);
    }

    async changeAssignment(assetId: number, newOwnerEmail: string, newOwnerName: string, assignmentNote: string): Promise<void> {
    await this.api.put<void>(`/api/AssetsAPI/change-assignment/${assetId}`, { newOwnerEmail, newOwnerName, assignmentNote });
    }


}