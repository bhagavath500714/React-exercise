let initialState = {
    user: null,
    setAuth: false,
    checkToken: 'xyz'
};
const User = (state=initialState, action) => {
    switch(action.type) {
      case 'SET_USER':
        console.log('---action value', action.value.data.token)
        return {
          ...state,
          user: action.value,
          setAuth: true,
          checkToken: action.value.data.token
        };
        case 'RESET_USER':
        return {
          ...state,
          user: [],
          setAuth: false
        };
      default:
        return state;
    }
};

export default User;