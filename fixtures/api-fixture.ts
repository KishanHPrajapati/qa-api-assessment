import { test as base, APIRequestContext } from '@playwright/test';
import { TokenManager } from '../utils/token-manager';
import { BookingApi } from '../api-services/booking-api';

type ApiFixtures = {
  tokenManager: TokenManager;
  bookingApi: BookingApi;
};

export const test = base.extend<ApiFixtures>({
  
  tokenManager: async ({ request }, use) => {
    const tokenManager = new TokenManager(request);
    await use(tokenManager);
  },

  bookingApi: async ({ request, tokenManager }, use) => {
    const bookingApi = new BookingApi(request, tokenManager);
    await use(bookingApi);
  },
});

export { expect } from '@playwright/test';