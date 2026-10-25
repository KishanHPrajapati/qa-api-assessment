import { Booking } from "../models/booking-model"
import { endpoint } from "../data/endpoint"
import { BaseApi } from "../utils/base-api";

export class BookingApi extends BaseApi {

    async getAllBookings() {
        return await this.request.get(endpoint.bookings.getAll);
    }
    
    async getBooking(bookingId: number) {
        return await this.request.get(endpoint.bookings.getById(bookingId));
    }

    async createBooking(booking: Booking) {
       return await this.request.post(endpoint.bookings.create, {
        data: booking
       })
    }

    async updateBooking(bookingId: number, booking: Booking) {
        return await this.request.put(endpoint.bookings.update(bookingId), {
            data: booking,
            headers: await this.authHeaders()
        })
    }

    async patchBooking(bookingId: number, booking: Partial<Booking>) {
        return await this.request.patch(endpoint.bookings.patch(bookingId), {
            data: booking,
            headers: await this.authHeaders()
        })
    }

    async deleteBooking(bookingId: number) {
        return await this.request.delete(endpoint.bookings.delete(bookingId), {
           headers: await this.authHeaders()
        });
    }
}