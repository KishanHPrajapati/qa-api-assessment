import { faker } from '@faker-js/faker';
import { Booking } from '../models/booking-model';
import { calculateTotalPrice } from '../utils/base-api';

export function createBookingData(
  nightlyRate?: number,
  checkin?: string,
  checkout?: string
): Booking {
  const ci = checkin ?? '2026-10-01';
  const co = checkout ?? '2026-10-05';
  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    totalprice: nightlyRate !== undefined
      ? calculateTotalPrice(nightlyRate, ci, co)
      : faker.number.int({ min: 100, max: 5000 }),
    depositpaid: faker.datatype.boolean(),
    bookingdates: { checkin: ci, checkout: co },
    additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner']),
  };
}