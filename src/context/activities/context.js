import { createContext, useReducer } from "react";
import activitieReducer from "./reducer";

const INITIAL_STATE = {
  activities: [],
  activity: "",
  loading: false,
  error: null,
};
export const activitiesContext = createContext(INITIAL_STATE);
export const ActivitiesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(activitieReducer, INITIAL_STATE);

  return (
    <activitiesContext.Provider
      value={{
        activities: state.activities,
        activity: state.activity,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </activitiesContext.Provider>
  );
};
