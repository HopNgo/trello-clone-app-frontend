import axios from "axios";
import { API_ROOT } from "utilities/constants";

export const createCardApi = async (data: any) => {
  const request = await axios.post(`${API_ROOT}/v1/cards/addCard`, data);
  console.log(request.data);
  return request.data;
};

export const updateCardApi = async (id: string, data: any) => {
  const request = await axios.put(
    `${API_ROOT}/v1/cards/updateCard/${id}`,
    data
  );
  console.log(request.data);
  return request.data;
};

export const updateDestroyCardsApi = async (data: {
  columnId: string;
  _destroy: boolean;
}) => {
  const request = await axios.put(
    `${API_ROOT}/v1/cards/updateDestroyCards`,
    data
  );
  console.log(request.data);
  return request.data;
};
