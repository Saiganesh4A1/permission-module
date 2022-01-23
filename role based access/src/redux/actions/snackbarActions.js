export const showSuccessSnackbar = (message, severity) => {
    return dispatch => {
      dispatch({ type: "SNACKBAR_SUCCESS", message , severity});
    };
  };
  
  export const clearSnackbar = () => {
    return dispatch => {
      dispatch({ type: "SNACKBAR_CLEAR" });
    };
  };