import axios from "axios";
import { API_ROOT } from "utilities/constants";

export const getBoardListApi = async () => {
  const request = await axios.get(`${API_ROOT}/v1/boards`);
  console.log(request.data);
  return request.data;
};

export const addBoardApi = async (data: { title: string; cover: string }) => {
  const request = await axios.post(`${API_ROOT}/v1/boards/addBoard`, data);
  console.log(request.data);
  return request.data;
};

export const getBoardDetailApi = async (id: string) => {
  const request = await axios.get(`${API_ROOT}/v1/boards/${id}`);
  console.log(request.data);
  return request.data;
};

export const findBoardByTitleApi = async (title: string) => {
  const request = await axios.get(`${API_ROOT}/v1/boards/findBoard/${title}`);
  console.log(request.data);
  return request.data;
};

export const updateBoardApi = async (id: string, data: any) => {
  const request = await axios.put(
    `${API_ROOT}/v1/boards/updateBoard/${id}`,
    data
  );
  console.log(request.data);
  return request.data;
};
