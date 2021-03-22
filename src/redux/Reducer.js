function reducer(state = {token: ''}, action) {
  switch (action.type) {
    case 'USER_DATA':
      return {...state, ...action.payload};
  }
  return state;
}
export default reducer;
