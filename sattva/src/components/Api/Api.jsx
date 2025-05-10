import axios from 'axios';

const API_URL = 'http://localhost:5000/api/checkout';

export const placeOrder = async (orderData) => {
    try {
        const response = await axios.post(API_URL, orderData);
        return response.data;
    } catch (error) {
        console.error("Order Error:", error);
        throw error;
    }
};
