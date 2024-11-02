import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../store"

const getInitialToken = () => {
  const accessToken = localStorage.getItem("accessToken")
  return accessToken ? accessToken : null
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: getInitialToken()
  },
  reducers: {
    setCredential: (state, action) => {
      const { accessToken } = action.payload
      if (accessToken) {
        window.localStorage.setItem("accessToken", accessToken)
        state.accessToken = accessToken
      }
    },
    logout: (state) => {
      window.localStorage.removeItem("accessToken")
      state.accessToken = null
    }
  }
})

export const { setCredential, logout } = authSlice.actions

export const selectCurrenToken = (state: RootState) => state.auth.accessToken

export default authSlice.reducer
