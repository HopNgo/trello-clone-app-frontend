import axios from "axios";
import { API_ROOT } from "utilities/constants";

export const getBoardDetailApi = async (id: string) => {
  const request = await axios.get(`${API_ROOT}/v1/boards/${id}`);
  console.log(request.data);
  return request.data;
};

export const updateBoardApi = async (
  id: string,
  data: { columnOrder: string[] }
) => {
  const request = await axios.put(
    `${API_ROOT}/v1/boards/updateBoard/${id}`,
    data
  );
  console.log(request.data);
  return request.data;
};
