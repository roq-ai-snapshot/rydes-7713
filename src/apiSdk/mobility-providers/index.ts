import axios from 'axios';
import queryString from 'query-string';
import { MobilityProviderInterface } from 'interfaces/mobility-provider';
import { GetQueryInterface } from '../../interfaces';

export const getMobilityProviders = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/mobility-providers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMobilityProvider = async (mobilityProvider: MobilityProviderInterface) => {
  const response = await axios.post('/api/mobility-providers', mobilityProvider);
  return response.data;
};

export const updateMobilityProviderById = async (id: string, mobilityProvider: MobilityProviderInterface) => {
  const response = await axios.put(`/api/mobility-providers/${id}`, mobilityProvider);
  return response.data;
};

export const getMobilityProviderById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/mobility-providers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMobilityProviderById = async (id: string) => {
  const response = await axios.delete(`/api/mobility-providers/${id}`);
  return response.data;
};
