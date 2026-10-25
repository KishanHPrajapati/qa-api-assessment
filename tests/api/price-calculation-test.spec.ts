import {expect, test} from '../../fixtures/api-fixture';
import { createBookingData } from '../../data/booking-data';
import { calculateTotalPrice, calculateNights } from '../../utils/base-api';

test('should calculate booking price based on nightly rate and nights', async ({bookingApi}) => {
  const nightlyRate = 89.95;
  const checkin = '2026-10-01';
  const checkout = '2026-10-05';
  const expectedTotal = calculateTotalPrice(nightlyRate, checkin, checkout);
  const booking = createBookingData(nightlyRate, checkin, checkout);
  const createResponse = await bookingApi.createBooking(booking);
  expect(createResponse.status()).toBe(200);
  const created = await createResponse.json();
  console.log('Created Booking:', created);
  const getResponse = await bookingApi.getBooking(created.bookingid);
  const actual = await getResponse.json();
  console.log('Retrieved Booking:', actual);
  expect(actual.totalprice).toBe(expectedTotal);
  expect(typeof actual.totalprice).toBe('number');
  expect(actual.totalprice).toBe(expectedTotal);
});