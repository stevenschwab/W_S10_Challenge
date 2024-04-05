import { createSlice } from '@reduxjs/toolkit'

export const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        size: "All",
    },
    reducers: {
        changeFilter: ({ state, size }) => {
            state.size = size
        },
    }
})

export const {
    changeFilter,
} = filtersSlice.actions

export default filtersSlice.reducer