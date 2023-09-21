import axios from "axios";
import { ActionTypes } from "../types";
import { Dispatch } from "redux";
import { RootState } from "../store";

interface Params {
  cId: string;
  name: string;
  page: number;
  isAdd: boolean;
}

const axiosInstance = axios.create({
  baseURL: "https://api.dev.pastorsline.com/api/", // Replace with your API URL
  headers: {
    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNzI2NTY3MTc5LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjk1MDMxMTc5fQ.0y7NtuVDCvcPvmWbliMs1q02sov2oFC6u2Hi6H4A2W4`,
  },
});

export const fetchDataRequest = () => ({
  type: ActionTypes.FETCH_DATA_REQUEST,
});

export const fetchDataSuccess = (data: any) => ({
  type: ActionTypes.FETCH_DATA_SUCCESS,
  payload: data,
});

export const fetchDataFailure = (error: any) => ({
  type: ActionTypes.FETCH_DATA_FAILURE,
  payload: error,
});

export const fetchData = ({ cId, name, page, isAdd }: Params) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(fetchDataRequest());
    try {
      const response = await axiosInstance.get(
        `contacts.json?companyId=560&countryId=${cId}&query=${name}&page=${page}`
      );

      response.data.page = page;

      if (isAdd) {
        // Assuming you have an addDataSuccess action
        dispatch(addDataSuccess(response.data));
      } else {
        dispatch(fetchDataSuccess(response.data));
      }
    } catch (error) {
      dispatch(fetchDataFailure(error));
    }
  };
};

export const addDataSuccess = (data: any) => ({
  type: ActionTypes.ADD_DATA_SUCCESS,
  payload: data,
});
