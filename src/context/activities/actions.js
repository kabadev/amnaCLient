import axios from "axios";
export const fetchActivities = async (dispatch, query) => {
  dispatch({ type: "FETCH_ACTIVITIES_REQUEST" });
  try {
    const response = await axios.get(`activities${query ? "?" + query : ""}`);
    dispatch({ type: "FETCH_ACTIVITIES_SUCCESS", payload: response.data.data });
  } catch (error) {
    dispatch({ type: "FETCH_ACTIVITIES_FAILURE", payload: error });
  }
};

export const fetchActivity = async (dispatch, id) => {
  dispatch({ type: "FETCH_ACTIVITY_REQUEST" });
  try {
    const response = await axios.get("activities/" + id);
    dispatch({ type: "FETCH_ACTIVITY_SUCCESS", payload: response.data.data });
  } catch (error) {
    dispatch({ type: "FETCH_ACTIVITY_FAILURE", payload: error });
  }
};

export const addActivity = async (dispatch, data, options) => {
  dispatch({ type: "ADD_ACTIVITY_REQUEST" });
  try {
    const response = await axios.post("activities", data, options);
    const event = await response.json();
    dispatch({ type: "ADD_ACTIVITY_SUCCESS", payload: event });
  } catch (error) {
    dispatch({ type: "ADD_ACTIVITY_FAILURE", payload: error });
  }
};

export const activitySearch = async (dispatch, term) => {
  const response = await axios.get("activitySearch?search=" + term);
  dispatch({ type: "ACTIVITY_SEARCH_SUCCESS", payload: response.data.data });
};
