import axios from 'axios';
import axiosInstance from './axiosInstance';

export function login(email, password) {
  return axiosInstance.post('/login', { email, password });
}
