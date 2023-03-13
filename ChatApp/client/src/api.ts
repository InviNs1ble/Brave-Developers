import axios from 'axios';
import {
  CreateMessageParams,
  FetchMessagePayload,
  UserCredentialsParams,
} from './types';

const API_URL = 'http://localhost:5000';

const axiosClient = axios.create({ 
  withCredentials: true,
  baseURL: API_URL 
});

export const postRegisterUser = (data: UserCredentialsParams) =>
  axiosClient.post(`/auth/register`, data);

export const postLoginUser = (data: UserCredentialsParams) =>
  axiosClient.post(`/auth/login`, data);

export const getMessages = () =>
  axiosClient.get<FetchMessagePayload>(
    `/messages`
  );

export const createMessage = (data: CreateMessageParams) => {
  const url = `/messages`;
  return axiosClient.post(url, data);
};