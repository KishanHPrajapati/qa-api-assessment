export const endpoint = {
  auth: {
    login: '/auth',
  },
  bookings: {
    getAll: '/booking',
    getById: (id: number) => `/booking/${id}`,
    create: '/booking',
    update: (id: number) => `/booking/${id}`,
    patch: (id: number) => `/booking/${id}`,
    delete: (id: number) => `/booking/${id}`,
  },
};