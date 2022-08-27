const UPDATE_GREETING = 'UPDATE_GREETING';

export const fetchGreeting = () => async (dispatch) => {
  const response = await fetch('http://localhost:3000/api/v1/greetings');
  const greeting = await response.json();
  if (response.ok) {
    dispatch({
      type: UPDATE_GREETING,
      payload: greeting,
    });
  }
};

export const greattingsReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_GREETING:
      return action.payload;
    default:
      return state;
  }
};
