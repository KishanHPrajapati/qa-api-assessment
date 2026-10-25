import { APIRequestContext } from "@playwright/test";
import { TokenManager } from "./token-manager";

export class BaseApi {

  constructor(
    protected request: APIRequestContext,
    protected tokenManager: TokenManager
  ) {}

  protected async authHeaders() {
    const token = await this.tokenManager.getToken();
    return {
      Cookie: `token=${token}`
    };
  }

}

export function calculateNights(checkin: string, checkout: string): number {
  const start = new Date(checkin);
  const end = new Date(checkout);
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return Math.round(
    (end.getTime() - start.getTime()) / millisecondsPerDay
  );
}

export function calculateTotalPrice(nightlyRate: number, checkin: string, checkout: string): number {
  const nights = calculateNights(checkin, checkout);
  return Math.floor(nightlyRate * nights); 
}

export function isPlaceholderPrice(price: number): boolean {
  return price === 9999;
}
