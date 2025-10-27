import {
  HttpClient,
  HttpClientResponse,
} from '@microsoft/sp-http';

export class ApiClient {
  private httpClient: HttpClient;
  private apiBase: string;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.apiBase = 'https://localhost:7244';
  }

  public async get<T>(endpoint: string): Promise<T> {
    const response: HttpClientResponse = await this.httpClient.get(
      `${this.apiBase}${endpoint}`,
      HttpClient.configurations.v1
    );

    if (!response.ok) {
      throw new Error(`GET ${endpoint} failed: ${response.statusText}`);
    }

    const data = (await response.json()) as unknown;
    return ((data as Record<string, unknown>)?.value ?? data) as T;
  }

  public async post<T>(endpoint: string, body?: unknown): Promise<T> {
    const response = await this.httpClient.post(
      `${this.apiBase}${endpoint}`,
      HttpClient.configurations.v1,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error(`POST ${endpoint} failed: ${response.statusText}`);
    }

    return (await response.json()) as T;
  }

  public async put<T>(endpoint: string, body?: unknown): Promise<T> {
    const response = await this.httpClient.fetch(
      `${this.apiBase}${endpoint}`,
      HttpClient.configurations.v1,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error(`PUT ${endpoint} failed: ${response.statusText}`);
    }

    return (await response.json()) as T;
  }

  public async delete(endpoint: string): Promise<void> {
    const response = await this.httpClient.fetch(
      `${this.apiBase}${endpoint}`,
      HttpClient.configurations.v1,
      { method: 'DELETE' }
    );

    if (!response.ok) {
      throw new Error(`DELETE ${endpoint} failed: ${response.statusText}`);
    }
  }
}