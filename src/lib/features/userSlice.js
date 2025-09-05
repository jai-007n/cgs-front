import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import {Axios as axios} from "axios";
import axios from 'axios';
import toast from "react-hot-toast";
import jQuery from "jquery";
import { authHeader, commonCatchBlock, destroyTokenDetails } from "../utils/helpers";
const storedUser = localStorage?.getItem('currentUser');

const initialState = {
    isLoading: false,
    user: storedUser ? JSON.parse(storedUser) : null,
    isAuthenticated: !!storedUser
}
const baseUrl = "http://localhost:3000/api/v1" //process.env.REACT_APP_BASE_URL_API
// const navigate = useNavigate();
export const loginUserAction = createAsyncThunk('user/loginUserAction', async (postData) => {
    let frm = jQuery(postData?.frm);
    let url = baseUrl + '/auth/login'

    return axios.post(url, postData?.values)
        .then((res) => {
            localStorage.setItem('currentUser', JSON.stringify(res.data.user))
            localStorage.setItem('currentToken', JSON.stringify(res.data.token))
            toast.success('login Successfully.', {
                duration: 2000,
                position: 'top-right',
            })
            setTimeout(() => {
                postData.navigate("/dashboard", { replace: true })
            }, 2000)
            return res
        })
        .catch((err) => {
            commonCatchBlock(err, frm, true)
        }
        )
})

// export const signUpUserAction = createAsyncThunk('user/signUpUserAction', async (postData) => {
//     let frm = jQuery(postData?.frm);
//     let url = baseUrl + '/auth/register'
//
//     return axios.post(url, postData?.values)
//         .then((res) => {
//             localStorage.setItem('currentUser', JSON.stringify(res?.data.data))
//             localStorage.setItem('currentToken', JSON.stringify(res?.data?.accessToken))
//             localStorage.setItem('refreshToken', JSON.stringify(res?.data?.refreshToken))
//             toast.success('login Successfully.', {
//                 duration: 2000,
//                 position: 'top-right',
//             })
//             setTimeout(() => {
//                 postData.navigate("/dashboard")
//             }, 2000)
//             return res
//         })
//         .catch((err) => {
//                 commonCatchBlock(err, frm, true)
//             }
//         )
// })

// export const forgotPasswordUserAction = createAsyncThunk('user/forgotPasswordUserAction', async (postData) => {
//     let frm = jQuery(postData?.frm);
//     let url = baseUrl + '/auth/forgot-password'
//
//     return axios.post(url, postData?.values)
//         .then((res) => {
//             toast.success('Mail sent Successfully.', {
//                 duration: 2000,
//                 position: 'top-right',
//             })
//             setTimeout(() => {
//                 postData.navigate("/login")
//             }, 2000)
//             return res
//         })
//         .catch((err) => {
//                 commonCatchBlock(err, frm, true)
//             }
//         )
// })

// export const resetPasswordUserAction = createAsyncThunk('user/resetPasswordUserAction', async (postData) => {
//     let frm = jQuery(postData?.frm);
//     let url = baseUrl + '/auth/reset-password'
//
//     return axios.post(url, postData?.values, {
//         headers: {
//             "x-auth-token": postData?.token
//         }
//     })
//         .then((res) => {
//             toast.success(res.data.message, {
//                 duration: 2000,
//                 position: 'top-right',
//             })
//             setTimeout(() => {
//                 postData.navigate("/login")
//             }, 2000)
//             return res
//         })
//         .catch((err) => {
//                 commonCatchBlock(err, frm, true)
//             }
//         )
// })

export const logoutUserAction = createAsyncThunk('user/logoutUserAction', async (postData) => {
    let url = baseUrl + '/auth/logout'
    return axios.get(url, {
        headers: authHeader(url)
    })
        .then((res) => {
            toast.success('Logout Successfully.', {
                duration: 2000,
                position: 'top-right',
            })
            destroyTokenDetails()
            setTimeout(() => {
                postData.navigate("/login",{replace:true})
            }, 1000)
            return res
        })
        .catch((err) => {
            commonCatchBlock(err)
        }
        )
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser(state, action) {
        },
        forgotUser(state, action) {
        },
        resetUser(state, action) {
        },
    },
    extraReducers: builder => {
        builder.addCase(loginUserAction.pending, (state) => {
            state.isLoading = true
        }),
            builder.addCase(loginUserAction.fulfilled, (state) => {
                state.isLoading = false
            }),
            builder.addCase(logoutUserAction.pending, (state) => {
                state.isLoading = true
            }),
            builder.addCase(logoutUserAction.fulfilled, (state) => {
                state.isLoading = false
            })
        // [signUpUserAction.pending]: (state) => {
        //     state.isLoading = true
        // },
        // [signUpUserAction.fulfilled]: (state) => {
        //     state.isLoading = false
        // },
        // [forgotPasswordUserAction.pending]: (state) => {
        //     state.isLoading = true
        // },
        // [forgotPasswordUserAction.fulfilled]: (state) => {
        //     state.isLoading = false
        // },
        // [resetPasswordUserAction.pending]: (state) => {
        //     state.isLoading = true
        // },
        // [resetPasswordUserAction.fulfilled]: (state) => {
        //     state.isLoading = false
        // }
    }
});


export default userSlice.reducer
export const { loginUser, forgotUser, resetUser } = userSlice.actions