import { apiClient } from './api';

// Helper function to get token from localStorage
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('sonder_token');
  }
  return null;
};

export const jammingApi = {
  // Create a new room
  createRoom: async (roomId: string) => {
    console.log(`🔵 Frontend: Creating room ${roomId}`);
    console.log(`🔵 Frontend: Making POST request to /jamming/rooms/${roomId}/create`);
    const response = await apiClient.post(`/jamming/rooms/${roomId}/create`);
    console.log(`🔵 Frontend: Create room response:`, response.data);
    return response.data;
  },

  // Join an existing room
  joinRoom: async (roomId: string) => {
    console.log(`🟡 Frontend: Joining room ${roomId}`);
    console.log(`🟡 Frontend: Making POST request to /jamming/rooms/${roomId}/join`);
    const response = await apiClient.post(`/jamming/rooms/${roomId}/join`);
    console.log(`🟡 Frontend: Join room response:`, response.data);
    return response.data;
  },

  // Leave a room
  leaveRoom: async (roomId: string) => {
    const response = await apiClient.post(`/jamming/rooms/${roomId}/leave`);
    return response.data;
  },

  // Get room info
  getRoom: async (roomId: string) => {
    const response = await apiClient.get(`/jamming/rooms/${roomId}`);
    return response.data;
  },

  // Playback control - call backend endpoints that use Spotify access token
  playTrack: async (roomId: string, trackId?: string, positionMs: number = 0) => {
    const response = await apiClient.post(`/jamming/rooms/${roomId}/play`, { trackId, positionMs });
    return response.data;
  },

  // Playback control - call backend endpoints that use Spotify access token
  pauseTrack: async (roomId: string, positionMs: number = 0) => {
    const response = await apiClient.post(`/jamming/rooms/${roomId}/pause`, { positionMs });
    return response.data;
  },

  // Playback control - call backend endpoints that use Spotify access token
  seekTrack: async (roomId: string, positionMs: number) => {
    const response = await apiClient.post(`/jamming/rooms/${roomId}/seek`, { positionMs });
    return response.data;
  },

  // Search tracks
  searchTracks: async (query: string, limit: number = 20) => {
    const response = await apiClient.get(`/jamming/search/tracks?q=${encodeURIComponent(query)}&limit=${limit}`);
    return response.data;
  },

  // Get devices
  getDevices: async (roomId: string) => {
    const response = await apiClient.get(`/jamming/rooms/${roomId}/devices`);
    return response.data;
  },
};