import { APIRequestContext } from '@playwright/test';
import { env } from '../config/env';
import { endpoint } from '../data/endpoint';

export class TokenManager {
  private token: string | null = null;

  constructor(private request: APIRequestContext) {}

  async getToken(): Promise<string> {
    if (this.token) {
      return this.token;
    }

    const response = await this.request.post(endpoint.auth.login, {
      data: {
        username: env.username,
        password: env.password,
      },
    });

    const body = (await response.json()) as { token?: string };

    if (!body.token) {
      throw new Error('Authentication failed: token missing in response');
    }

    this.token = body.token;
    return this.token;
  }
}