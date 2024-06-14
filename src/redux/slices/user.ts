import { createSlice, createAsyncThunk, PayloadAction, current } from "@reduxjs/toolkit"
import { Request } from "../requests"
import { toast } from "react-toastify"

export interface IUser {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    role: string,
    createdAt: string,
}

type State = {
    user: IUser | null,
    users: IUser[],
    autocomplete: IUser[] | [],
    limit: number,
    page: number,
    pageCount: number,
    isLoading: boolean,
    id: string,
}

const initialState: State = {
    user: null,
    users: [],
    autocomplete: [],
    limit: 8,
    page: 1,
    pageCount: 1,
    isLoading: false,
    id: '',
}

export const createUser = createAsyncThunk(
    "/user/create",
    async (payload: any, { rejectWithValue }) => {
      try {
          const response = await Request.post('users', payload)
          toast('created', { type: 'success' })
          return response
      } catch (error: any) {
        toast('some error', { type: 'error' })
        return rejectWithValue(error);
      }
    }
)

export const updateUser = createAsyncThunk(
    "/user/update",
    async ({ id, payload }: any, { rejectWithValue }) => {
      try {
          const response = await Request.post(`users/${id}`, payload)
          return response
      } catch (error: any) {
        return rejectWithValue(error);
      }
    }
)

export const getUsers = createAsyncThunk(
    "/user/getAll",
    async (_, { getState, rejectWithValue }: any) => {
      try {
          const { page, limit } = getState().user as State
          const response = await Request.get(`users?page=${page}&limit=${limit}`)
          return response
      } catch (error: any) {
        return rejectWithValue(error);
      }
    }
)

export const autocompleteUsers = createAsyncThunk(
    "/users/autocomplete",
    async (text: string, { getState, rejectWithValue }: any) => {
      try {
            const { page, limit } = getState().user as State
          const response = await Request.get(`users/autocomplete?text=${text}&page=${page}&limit=${limit}`)
          return response
      } catch (error: any) {
        return rejectWithValue(error);
      }
    }
)

export const getUser = createAsyncThunk(
    "/user/get",
    async (_, { getState, rejectWithValue }: any) => {
      try {
          const { id } = getState().user as State
          const response = await Request.get(`users/${id}`)
          return response
      } catch (error: any) {
        return rejectWithValue(error);
      }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUsers: (state) => {
            state.users = []
            state.page = 1
        },
        clearUser: (state) => {
            state.user = null
        },
        setId: (state, action) => {
            state.id = action.payload
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
        clearPages: (state) => {
            state.page = 1
        },
        clearId: (state) => {
            state.id = ''
        },
        clearAutocomplete: (state) => {
            state.autocomplete = []
        }
    },
    extraReducers: (builder) => {
        builder
            //create
            .addMatcher(
                (action) => action.type === createUser.pending.type,
                (state) => {
                    state.isLoading = true
                }
            )
            .addMatcher(
                (action) => action.type === createUser.fulfilled.type,
                (state, action: PayloadAction<{user: IUser}>) => {
                    state.users = [...current(state.users), action.payload.user]
                    state.isLoading = false
                }
            )
            .addMatcher(
                (action) => action.type === createUser.rejected.type,
                (state) => {
                    state.isLoading = false
                }
            )
            // update
            .addMatcher(
                (action) => action.type === updateUser.pending.type,
                (state) => {
                state.isLoading = true;
                }
            )
            .addMatcher(
                (action) => action.type === updateUser.fulfilled.type,
                (state, action: PayloadAction<{user: IUser}>) => {
                    state.users = current(state).users.map(user => user.id === action.payload.user.id ? action.payload.user : user)
                    state.isLoading = false;
                }
            )
            .addMatcher(
                (action) => action.type === updateUser.rejected.type,
                (state) => {
                state.isLoading = false;
                }
            )
            // get all
            .addMatcher(
                (action) => action.type === getUsers.pending.type,
                (state) => {
                state.isLoading = true;
                }
            )
            .addMatcher(
                (action) => action.type === getUsers.fulfilled.type,
                (state, action: PayloadAction<{users: IUser[], pagesCount: number}>) => {
                    state.users = [...action.payload.users]
                    state.pageCount = Math.ceil(action.payload.pagesCount / state.limit)
                    state.isLoading = false;
                }
            )
            .addMatcher(
                (action) => action.type === getUsers.rejected.type,
                (state, action: any) => {
                state.isLoading = false;
                }
            )
            // get
            .addMatcher(
                (action) => action.type === getUser.pending.type,
                (state) => {
                    state.isLoading = true;
                }
            )
            .addMatcher(
                (action) => action.type === getUser.fulfilled.type,
                (state, action: PayloadAction<{user: IUser}>) => {
                    state.user = action.payload.user
                    state.isLoading = false;
                }
            )
            .addMatcher(
                (action) => action.type === getUser.rejected.type,
                (state, action: any) => {
                    state.isLoading = false;
                }
            )
            // autocomplete
            .addMatcher(
                (action) => action.type === autocompleteUsers.pending.type,
                (state) => {
                // state.isLoading = true;
                }
            )
            .addMatcher(
                (action) => action.type === autocompleteUsers.fulfilled.type,
                (state, action: PayloadAction<{users: IUser[] | [], pagesCount: number}>) => {
                    state.autocomplete = action.payload.users
                    state.pageCount = Math.ceil(action.payload.pagesCount / state.limit)
                }
            )
            .addMatcher(
                (action) => action.type === autocompleteUsers.rejected.type,
                (state, action: any) => {
                // state.isLoading = false;
                }
            )
    }
})

export const { clearUsers, clearUser, setId, clearId, clearAutocomplete, setPage, clearPages } = userSlice.actions;

export default userSlice.reducer;