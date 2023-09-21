import { ContactDetailState, ActionTypes } from "../types";

interface ContactState {
  contacts_ids: string[];
  contacts: ContactDetailState[];
}

interface AddedDataState extends ContactState {
  page: number;
}

// Define the state type for this reducer
export interface DataState {
  data: ContactState;
  loading: boolean;
  page: number;
  error: string | null;
}

// Define the initial state
const initialState: DataState = {
  data: { contacts_ids: [], contacts: [] },
  page: 1,
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
        page: action.payload.page,
        loading: false,
        data: action.payload,
      };
    case ActionTypes.FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ActionTypes.ADD_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        page: action.payload.page,
        data: {
          ...state.data,
          contacts_ids: [
            ...state.data.contacts_ids,
            ...action.payload.contacts_ids,
          ],
          contacts: { ...state.data.contacts, ...action.payload.contacts },
        },
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
  payload: AddedDataState;
}

interface FetchDataFailureAction {
  type: ActionTypes.FETCH_DATA_FAILURE;
  payload: string;
}

interface AddDataSuccessAction {
  type: ActionTypes.ADD_DATA_SUCCESS;
  payload: AddedDataState;
}

type DataAction =
  | FetchDataRequestAction
  | FetchDataSuccessAction
  | FetchDataFailureAction
  | AddDataSuccessAction;

export default dataReducer;
