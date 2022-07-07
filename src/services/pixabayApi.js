import axios from "axios";
import { toast } from 'react-toastify';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27183497-70bd3599297502793f5a9350a';

const customAxios = axios.create({
    baseURL: BASE_URL,
    params: {
        key: API_KEY,
    },
});

export const searchParams = {
    q: '',
    page: 1,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page: 12,
};

export const getImages = async () => {
    try {
    const { data } = await customAxios.get('', { params: searchParams });
    return data;
    } catch (error) {
      toast.info(`🦄 Something went wrong ${error}`);
    };
};
