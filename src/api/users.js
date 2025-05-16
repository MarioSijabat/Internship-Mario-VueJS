// src/api/users.js
import axiosInstance from './axiosInstance';

export function getUsers(page = 1) {
  return axiosInstance.get(`/users?page=${page}`);
}

export function addUser(userData) {
  return axiosInstance.post('/users', userData);
}

export function editUser(id, userData) {
  return axiosInstance.put(`/users/${id}`, userData);
}

export function deleteUser(id) {
  return axiosInstance.delete(`/users/${id}`);
}
