import actionType from './actionType'
import { apiRegister,apiLogin } from '../../services/auth'

export const resgister = (payload) => async (dispatch) => {
    try {
        const response = await apiRegister(payload)
            if(response?.data.err === 0){
            dispatch({
                type: actionType.RESGISTER_SUCCESS,
                data: response.data.token
            })
        }else{
            dispatch({
                type : actionType.RESGISTER_FAIL,
                data : response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type : actionType.RESGISTER_FAIL,
            data : null
        })
    }
}
export const login = (payload) => async (dispatch) => {
    try {
        const response = await apiLogin(payload)
        if(response?.data.err === 0){
            dispatch({
                type: actionType.LOGIN_SUCCESS,
                data: response.data.token
            })
        }else{
            dispatch({
                type : actionType.LOGIN_FAIL,
                data : response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type : actionType.LOGIN_FAIL,
            data : null
        })
    }
}

export const logout = () =>({
    type : actionType.LOGOUT
})