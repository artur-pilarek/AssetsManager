import { IAssignmentHistory } from '../models';
import { ApiClient } from './ApiClient';

export class AssignmentHistoryService {
  private api: ApiClient;

  constructor(apiClient: ApiClient) {
    this.api = apiClient;
  }

  async get(query?: string): Promise<IAssignmentHistory[]> {
    const q = query ? query : '?$orderby=assetTag';
    return await this.api.get<IAssignmentHistory[]>(`/odata/AssignmentHistory${q}`);
  }

  async getByAssetId(assetId: number): Promise<IAssignmentHistory[]> {
    return await this.get(`?$filter=assetId eq ${assetId}`);
  }
}