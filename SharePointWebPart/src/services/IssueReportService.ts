import { IIssueReport } from '../models';
import { ApiClient } from './ApiClient';

export class IssueReportService {
  private api: ApiClient;

  constructor(apiClient: ApiClient) {
    this.api = apiClient;
  }

  async getAll(query?: string): Promise<IIssueReport[]> {
    const q = query ? query : '?$orderby=assetTag';
    return await this.api.get<IIssueReport[]>(`/odata/IIssueReport${q}`);
  }

  async getById(id: number): Promise<IIssueReport> {
    return await this.api.get<IIssueReport>(`/odata/IIssueReport(${id})`);
  }
}