import { test, expect } from '../../fixtures/api-fixture';
import { createBookingData } from "../../data/booking-data";

test('should create booking and read back the same data', async ({ bookingApi }) => {

  const booking = createBookingData();  
  const createResponse = await bookingApi.createBooking(booking);
  expect(createResponse.status()).toBe(200);
  const createdBooking = await createResponse.json();
  console.log('Created Booking:', createdBooking);
  expect(createdBooking.bookingid).toBeGreaterThan(0);
  const getResponse = await bookingApi.getBooking(
    createdBooking.bookingid
  );
  expect(getResponse.status()).toBe(200);
  const actual = await getResponse.json();
  console.log('Retrieved Booking:', actual);
  expect(actual.firstname).toBe(booking.firstname);
  expect(actual.lastname).toBe(booking.lastname);
  expect(actual.totalprice).toBe(booking.totalprice);
  expect(actual.depositpaid).toBe(booking.depositpaid);
  expect(actual.bookingdates.checkin).toBe(booking.bookingdates.checkin);
  expect(actual.bookingdates.checkout).toBe(booking.bookingdates.checkout);
  expect(actual.additionalneeds).toBe(booking.additionalneeds);
  expect(typeof actual.firstname).toBe('string');
  expect(typeof actual.lastname).toBe('string');
  expect(typeof actual.totalprice).toBe('number');
  expect(typeof actual.depositpaid).toBe('boolean');
  expect(typeof actual.bookingdates.checkin).toBe('string');
  expect(typeof actual.bookingdates.checkout).toBe('string');
  expect(actual.totalprice).toBe(booking.totalprice);
  expect(actual.depositpaid).toBe(booking.depositpaid);
});