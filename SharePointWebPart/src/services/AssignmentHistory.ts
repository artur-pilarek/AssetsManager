import { IAssignmentHistory } from '../models';
import { ApiClient } from './ApiClient';

export class AssignmentHistoryService {
  private api: ApiClient;

  constructor(apiClient: ApiClient) {
    this.api = apiClient;
  }

  async getAll(query?: string): Promise<IAssignmentHistory[]> {
    const q = query ? query : '?$orderby=assetTag';
    return await this.api.get<IAssignmentHistory[]>(`/odata/AssignmentHistory${q}`);
  }

  async getById(id: number): Promise<IAssignmentHistory> {
    return await this.api.get<IAssignmentHistory>(`/odata/AssignmentHistory(${id})`);
  }
}