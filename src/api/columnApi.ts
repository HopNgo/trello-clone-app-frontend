import axios from "axios";
import { API_ROOT } from "utilities/constants";

export const createColumnApi = async (data: {
  title: string;
  boardId: string;
}) => {
  const request = await axios.post(`${API_ROOT}/v1/columns/addColumn`, data);
  console.log(request.data);
  return request.data;
};

export const updateColumnApi = async (id: string, data: any) => {
  const request = await axios.put(
    `${API_ROOT}/v1/columns/updateColumn/${id}`,
    data
  );
  console.log(request.data);
  return request.data;
};

export const deleteColumnApi = async (id: string) => {
  const request = await axios.delete(
    `${API_ROOT}/v1/columns/deleteColumn/${id}`
  );
  console.log(request.data);
  return request.data;
};


