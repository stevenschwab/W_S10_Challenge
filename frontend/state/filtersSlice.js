import { createSlice } from '@reduxjs/toolkit'

export const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        filterBySize: "All",
    },
    reducers: {
        changeFilter: ({ state, size }) => {
            state.filterBySize = size
        },
    }
})

export const {
    changeFilter,
} = filtersSlice.actions

export default filtersSlice.reducer