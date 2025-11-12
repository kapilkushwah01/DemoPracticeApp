import api from "../api/api";
import {Posts} from '../types/Post'
import axios from "axios";
export const getPost = async() : Promise<Posts[]> => {
    try {
    const response = await api.get<Posts[]>("/posts");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
}