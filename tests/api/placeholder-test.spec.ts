import {expect, test} from '../../fixtures/api-fixture';
import { createBookingData } from '../../data/booking-data';
import { isPlaceholderPrice } from '../../utils/base-api';

test('should flag 9999 as placeholder price', async ({bookingApi}) => {
  const booking = createBookingData();
  booking.totalprice = 9999;
  const response = await bookingApi.createBooking(booking);
  expect(response.status()).toBe(200);
  const created = await response.json();
  console.log('Created Booking:', created);
  const getResponse = await bookingApi.getBooking(created.bookingid);
  const actual = await getResponse.json();
  console.log('Retrieved Booking:', actual);
  expect(actual.totalprice).toBe(9999);
  expect(typeof actual.totalprice).toBe('number');
  expect(isPlaceholderPrice(actual.totalprice)).toBe(true);
});