import { createSlice } from '@reduxjs/toolkit'

export const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        size: "All",
    },
    reducers: {
        changeFilterSize: (state, action) => {
            state.size = action.payload
        },
    }
})

export const {
    changeFilterSize,
} = filtersSlice.actions

export default filtersSlice.reducer