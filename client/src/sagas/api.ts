import axios from 'axios';
import { user } from '../types/user';
import { album } from '../types/album';
import { song } from '../types/song';

const token = localStorage.getItem('accessToken') || null

const axiosInstance = axios.create(
    token ? {
    baseURL: 'http://localhost:8000',
    headers: {
      'Authorization': `Bearer ${token}`,
    }} : {baseURL: 'http://localhost:8000'}
  );

const api = {
    login: async (credentials : user) => {
        try {
          const response = await axiosInstance.post(`/auth`, credentials);
          return response.data;
        } catch (error: any) {
            if (error.response) {
                throw { message: error.response.data.message, status: error.response.status };
              } else {
                throw { message: 'Error setting up the request', status: 500 };
              }
        }
      },

    logout: async () => {
        try {
            const response = await axiosInstance.get(`/auth/logout`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                throw { message: error.response.data.message, status: error.response.status };
              } else {
                throw { message: 'Error setting up the request', status: 500 };
              }
        }
    },

    register: async (credentials : user) => {
        try {
            const response = await axiosInstance.post(`/auth/register`, credentials);
            return response.data;
        } catch (error: any) {
            if (error.response) {
              throw { message: error.response.data.message, status: error.response.status };
            } else {
              throw { message: 'Error setting up the request', status: 500 };
            }
        }
        
    },

    refresh: async () => {
        try {
            const response = await axiosInstance.get(`/auth/refresh`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
            throw { message: error.response.data.message, status: error.response.status };
            } else {
            throw { message: 'Error setting up the request', status: 500 };
            }
        }
    },

    createAlbum: async (credentials : album) => {
        try {
            const response = await axiosInstance.post(`/albums`, credentials);
            return response.data;
        } catch (error: any) {
            if (error.response) {
              throw { message: error.response.data.message, status: error.response.status };
            } else {
              throw { message: 'Error setting up the request', status: 500 };
            }
        }
        
    },

    getUsers: async () => {
        try {
            const response = await axiosInstance.get(`/users`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
              throw { message: error.response.data.message, status: error.response.status };
            } else {
              throw { message: 'Error setting up the request', status: 500 };
            }
        }
        
    },
    getAlbums: async () => {
        try {
            const response = await axiosInstance.get(`/albums`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
              throw { message: error.response.data.message, status: error.response.status };
            } else {
              throw { message: 'Error setting up the request', status: 500 };
            }
        }
        
    },
    getStatistics: async () => {
        try {
            const response = await axiosInstance.get(`/statistics`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
              throw { message: error.response.data.message, status: error.response.status };
            } else {
              throw { message: 'Error setting up the request', status: 500 };
            }
        }
        
    },

    createSong: async (credentials: song) => {
        try {
            const response = await axiosInstance.post(`/songs`, credentials);
            return response.data;
        } catch (error: any) {
            if (error.response) {
              throw { message: error.response.data.message, status: error.response.status };
            } else {
              throw { message: 'Error setting up the request', status: 500 };
            }
        }
        
    },

    updateSong: async (credentials: song) => {
        try {
            const response = await axiosInstance.patch(`/songs`, credentials);
            return response.data;
        } catch (error: any) {
            if (error.response) {
              throw { message: error.response.data.message, status: error.response.status };
            } else {
              throw { message: 'Error setting up the request', status: 500 };
            }
        }
        
    },

    getSongs: async () => {
        try {
            const response = await axiosInstance.get(`/songs`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
              throw { message: error.response.data.message, status: error.response.status };
            } else {
              throw { message: 'Error setting up the request', status: 500 };
            }
        }
        
    },

    deleteSong: async (credentials: { _id: string}) => {
        try {
            const response = await axiosInstance.delete(`/songs/${credentials._id}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
              throw { message: error.response.data.message, status: error.response.status };
            } else {
              throw { message: 'Error setting up the request', status: 500 };
            }
        }
        
    },

};

export default api;