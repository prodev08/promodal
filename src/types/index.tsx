export interface ContactDetailState {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  country_id: number;
  color: string;
}

// Define the action types
export enum ActionTypes {
  FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST",
  FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS",
  FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE",
  ADD_DATA_REQUEST = "ADD_DATA_REQUEST",
  ADD_DATA_SUCCESS = "ADD_DATA_SUCCESS",
  ADD_DATA_FAILURE = "ADD_DATA_FAILURE",
}
