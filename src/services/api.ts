import axios, { AxiosInstance, AxiosError } from 'axios';
import type { ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

class ClinicApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        console.error('API Error:', error.message);
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get<ApiResponse<T>>(url);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async post<T>(url: string, data: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async put<T>(url: string, data: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete<ApiResponse<T>>(url);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}

export const apiClient = new ClinicApiClient();

// Appointment Services
export const appointmentService = {
  bookAppointment: (data: unknown) => apiClient.post('/appointments', data),
  getAppointments: () => apiClient.get('/appointments'),
  getAppointmentById: (id: string) => apiClient.get(`/appointments/${id}`),
  cancelAppointment: (id: string) => apiClient.delete(`/appointments/${id}`),
};

// Contact Services
export const contactService = {
  sendContactForm: (data: unknown) => apiClient.post('/contact', data),
};

// Doctor Services
export const doctorService = {
  getDoctors: () => apiClient.get('/doctors'),
  getDoctorById: (id: string) => apiClient.get(`/doctors/${id}`),
  getAvailableSlots: (doctorId: string, date: string) =>
    apiClient.get(`/doctors/${doctorId}/slots?date=${date}`),
};

// Service Services
export const serviceService = {
  getServices: () => apiClient.get('/services'),
  getServiceById: (id: string) => apiClient.get(`/services/${id}`),
};

// Review/Testimonial Services
export const reviewService = {
  getReviews: () => apiClient.get('/reviews'),
  submitReview: (data: unknown) => apiClient.post('/reviews', data),
};
