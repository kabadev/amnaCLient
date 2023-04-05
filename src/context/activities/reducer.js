function activitieReducer(state, action) {
  switch (action.type) {
    // fetch All ACTIVITIES
    case "FETCH_ACTIVITIES_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_ACTIVITIES_SUCCESS":
      return {
        ...state,
        activities: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_ACTIVITIES_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //  fetch single ACTIVITY
    case "FETCH_ACTIVITY_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_ACTIVITY_SUCCESS":
      return {
        ...state,
        activity: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_ACTIVITY_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //  addd single ACTIVITY
    case "ADD_ACTIVITY_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "ADD_ACTIVITY_SUCCESS":
      return {
        ...state,
        event: action.payload,
        loading: false,
        error: null,
      };
    case "ADD_ACTIVITY_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "ACTIVITY_SEARCH_SUCCESS":
      return {
        ...state,
        ACTIVITIES: action.payload,
        error: null,
      };
    default:
      return state;
  }
}
export default activitieReducer;
