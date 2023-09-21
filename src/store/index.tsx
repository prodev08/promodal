import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import dataReducer, { DataState } from "../reducers"; // Import your dataReducer and state type
import { composeWithDevTools } from "redux-devtools-extension";

// Define the root state type
export interface RootState {
  contacts: DataState;
}

const rootReducer = combineReducers({
  contacts: dataReducer,
});

// Create the Redux store with middleware
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware)
    // Other store enhancers (if any) can be added here
  )
);

export default store;
