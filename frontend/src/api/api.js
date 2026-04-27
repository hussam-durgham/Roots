import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Products API
export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  addReview: (id, data) => api.post(`/products/${id}/review`, data),
};

// Orders API
export const ordersAPI = {
  create: (data) => api.post('/orders', data),
  getMyOrders: () => api.get('/orders/my-orders'),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, data) => api.put(`/orders/${id}/status`, data),
  getAll: () => api.get('/orders'),
};

// Cart API
export const cartAPI = {
  addItem: (data) => api.post('/cart/add', data),
  getCart: () => api.get('/cart'),
  removeItem: (productId) => api.delete(`/cart/remove/${productId}`),
  clear: () => api.delete('/cart/clear'),
};

// Users API
export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  addToWishlist: (productId) => api.post(`/users/wishlist/add/${productId}`),
  removeFromWishlist: (productId) => api.delete(`/users/wishlist/remove/${productId}`),
  getWishlist: () => api.get('/users/wishlist'),
  getAll: () => api.get('/users'),
};

export default api;