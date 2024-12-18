import actionType from "../actions/actionType"

const initState = {
    isLoggedIn : false,
    token : null,
    msg :'',
    update : false
}
const authReducer = (state = initState, acction)=>{
    switch (acction.type){
        case actionType.RESGISTER_SUCCESS:
        case actionType.LOGIN_SUCCESS:
            return{
                ...state,
                isLoggedIn : true,
                token : acction.data,
                msg:''
            }
        case actionType.RESGISTER_FAIL:
        case actionType.LOGIN_FAIL:
            return{
                ...state,
                isLoggedIn : false,
                msg : acction.data, 
                token :null,
                update : !state.update
            }
        case  actionType.LOGOUT:
            return{
                ...state,
                isLoggedIn: false,
                token :null,
                msg:''
            }
        default : 
            return state
    }
}
export default authReducer