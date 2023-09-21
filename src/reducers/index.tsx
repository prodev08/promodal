import { ContactDetailState, ActionTypes } from "../types";

// Define the state type for this reducer
export interface DataState {
  data: [];
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
};

// Define the reducer function
const dataReducer = (
  state: DataState = initialState,
  action: DataAction
): DataState => {
  switch (action.type) {
    case ActionTypes.FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case ActionTypes.FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// Define the action creators
interface FetchDataRequestAction {
  type: ActionTypes.FETCH_DATA_REQUEST;
}

interface FetchDataSuccessAction {
  type: ActionTypes.FETCH_DATA_SUCCESS;
  payload: any;
}

interface FetchDataFailureAction {
  type: ActionTypes.FETCH_DATA_FAILURE;
  payload: string;
}

interface AddDataSuccessAction {
  type: ActionTypes.ADD_DATA_SUCCESS;
  payload: any;
}

type DataAction =
  | FetchDataRequestAction
  | FetchDataSuccessAction
  | FetchDataFailureAction;

export default dataReducer;
