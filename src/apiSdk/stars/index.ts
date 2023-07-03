import axios from 'axios';
import queryString from 'query-string';
import { StarInterface, StarGetQueryInterface } from 'interfaces/star';
import { GetQueryInterface } from '../../interfaces';

export const getStars = async (query?: StarGetQueryInterface) => {
  const response = await axios.get(`/api/stars${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createStar = async (star: StarInterface) => {
  const response = await axios.post('/api/stars', star);
  return response.data;
};

export const updateStarById = async (id: string, star: StarInterface) => {
  const response = await axios.put(`/api/stars/${id}`, star);
  return response.data;
};

export const getStarById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/stars/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteStarById = async (id: string) => {
  const response = await axios.delete(`/api/stars/${id}`);
  return response.data;
};
