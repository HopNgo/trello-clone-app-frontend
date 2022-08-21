import axios from "axios";
import { API_ROOT } from "utilities/constants";


export const createCardApi = async (data: {
    title: string;
    boardId: string;
    columnId: string;
    cover?: string;
  }) => {
    const request = await axios.post(`${API_ROOT}/v1/cards/addCard`, data);
    console.log(request.data);
    return request.data;
  };