import { IIssueReport } from '../models';
import { ApiClient } from './ApiClient';

export class IssueReportService {
  private api: ApiClient;

  constructor(apiClient: ApiClient) {
    this.api = apiClient;
  }

  async getIssue(query?: string): Promise<IIssueReport[]> {
    const q = query ? query : '?$orderby=assetTag';
    return await this.api.get<IIssueReport[]>(`/odata/IssueReport${q}`);
  }

  async getByAssetId(assetId: number): Promise<IIssueReport[]> {
    return await this.getIssue(`?$filter=assetId eq ${assetId}`);
  }
  
  async create(issue: IIssueReport): Promise<IIssueReport> {
    return await this.api.post<IIssueReport>('/api/IssueReportApi', issue);
  }
}