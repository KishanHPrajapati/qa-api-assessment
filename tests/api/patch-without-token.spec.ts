import {expect, test} from '../../fixtures/api-fixture';
import { createBookingData } from '../../data/booking-data';
import { request } from '@playwright/test';

test('should reject PATCH without authentication token', async ({bookingApi, request}) => {
  const booking = createBookingData();
  const createResponse = await bookingApi.createBooking(booking);
  const created = await createResponse.json();
  console.log('Created Booking:', created);
  const response = await request.patch(`/booking/${created.bookingid}`, {
    data: { firstname: 'Unauthorized' },
  });
  console.log('PATCH Response Status:', response.status());
  expect([401, 403]).toContain(response.status());
});