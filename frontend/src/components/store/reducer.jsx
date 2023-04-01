 const reducer=(state,action)=>{

    switch(action.type){
        case "login_start":
            return{
                user: null,
                isFetching: true,
                error: false,
            };
        case "login_success":
            return{
                user: action.payload,
                isFetching: false,
                error: false,
            }; 
        case "loagin_fail":
            return{
                user: null,
                isFetching: false,
                error: true,
            };
            case "UPDATE_START":
                return {
                  ...state,
                  isFetching:true
                };
              case "UPDATE_SUCCESS":
                return {
                  user: action.payload,
                  isFetching: false,
                  error: false,
                };
              case "UPDATE_FAILURE":
                return {
                  user: state.user,
                  isFetching: false,
                  error: true,
                };
            case "LOGOUT":
              return {
                user: null,
                isFetching: false,
                error: false,
              };
            default:
              return state;
    }
}

export default reducer