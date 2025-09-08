import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from "react-hot-toast";
// import jQuery from "jquery";
import { authHeader, commonCatchBlock } from "../utils/helpers";
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'

const initialState = {
    isLoading: false
}
// const MySwal = withReactContent(Swal)
const baseUrl = "http://localhost:3000/api/v1/client/" //process.env.REACT_APP_BASE_URL_API

//get all client lists
export const getclientListAction = createAsyncThunk('client/getclientListAction', async (postData) => {
    let url;
    if (postData?.queryUrl) {
        url = baseUrl + postData.queryUrl
    } else {
        url = baseUrl
    }


    return axios.get(url, {
        headers: authHeader()
    })
        .then((res) => {
            return res
        })
        .catch((err) => {
            commonCatchBlock(err,)
        }
        )
})

//get c,lient profile

export const getclientEditAction = createAsyncThunk('client/getclientEditAction', async (postData) => {

    let url = baseUrl + postData?.id;
    return axios.get(url, {
        headers: authHeader()
    })
        .then((res) => {
            return res
        })
        .catch((err) => {
            commonCatchBlock(err,)
        }
        )
})

//add client
export const clientSaveAction = createAsyncThunk('client/clientSaveAction', async (postData) => {

    let postUrl = postData?.id ? (baseUrl + postData.id) : baseUrl
    return axios({
        method: postData?.actionMethod,
        url: postUrl,
        data: postData?.fd,
        headers: authHeader()
    }).then((res) => {
        toast.success(res?.data?.message, {
            duration: 2000,
            position: 'top-right',
        })
        setTimeout(() => {
            postData?.navigate("/client/list", { replace: true });
        }, 1000)
        return res
    }).catch((err) => {
        commonCatchBlock(err, postData, 'clientSaveAction', postData?.formName, true)
    }
    )
})
//delete

export const clientDeleteAction = createAsyncThunk('client/clientDeleteAction', async (postData) => {
    return MySwal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete!'
    }).then((result) => {
        if (result.isConfirmed) {
            let client_id = postData?.client_id
            let queryUrl = postData?.queryUrl
            let dispatch = postData?.dispatch
            postData.dispatch(clientDeleteApiAction({ client_id, queryUrl, dispatch }));
        }

    }
    )
})

export const clientDeleteApiAction = createAsyncThunk('client/clientDeleteApiAction', async (postData) => {

    let url = baseUrl + '/client/delete/' + postData?.client_id
    return axios.delete(url, {
        headers: authHeader(),
    })
        .then((res) => {
            toast.success(res.data.message, {
                duration: 2000,
                position: 'top-right',
            })
            let queryUrl = postData?.queryUrl
            setTimeout(() => {
                postData.dispatch(getclientListAction({ queryUrl }));
            }, 1000)
        })
        .catch((err) => {
            commonCatchBlock(err)
        }
        )
})


const clientSlice = createSlice({
    name: "client",
    initialState,
    reducers: {
        getclientList(state, action) {
            state.isSuccess = false
        },
        setLoadingTrue(state) {
            state.isLoading = true
        }

    },
    extraReducers: builder => {
        builder.addCase(getclientListAction.pending, (state) => {
            state.isLoading = true
        }),
            builder.addCase(getclientListAction.fulfilled, (state, action) => {
                state.isLoading = false
                state.clients = action.payload?.data?.data
                state.currentPage = action.payload?.data?.currentPage
                state.totalPage = action.payload?.data?.totalPages
                state.client = ""
            }),

            builder.addCase(clientSaveAction.pending, (state) => {
                state.isLoading = true
            }),

            builder.addCase(clientSaveAction.fulfilled, (state, action) => {
                console.log("fullfilled ot not")
                state.isLoading = false;
                if (action?.payload?.status === 200) {
                    state.isSuccess = true;
                }
            }),

            builder.addCase(clientDeleteApiAction.pending, (state) => {
                state.isLoading = true;
            }),
            builder.addCase(clientDeleteApiAction.fulfilled, (state) => {
                state.isLoading = false;
            }),
            builder.addCase(getclientEditAction.pending, (state) => {
                state.isLoading = true;
            }),
            builder.addCase(getclientEditAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.client = action.payload?.data?.data
            })
    }
});


export default clientSlice.reducer
export const { getClientList } = clientSlice.actions

