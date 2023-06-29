import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        add: (state, action) => {
            if(state.length===25) return;
            const { author, country, language, link, pages, title, year, id } = action.payload;
            state.push({ author, country, language, link, pages, title, year, id });
        },
        edit: (state, action) => {
            const { id, author, country, language, link, pages, title, year } = action.payload;
            const itemIndex = state.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
                state[itemIndex] = {
                    id,
                    author,
                    country,
                    language,
                    link,
                    pages,
                    title,
                    year
                };
            }
        },
        deleteBook: (state) => {
            return initialState;
          },
    }
})

export const { add, edit ,deleteBook } = bookSlice.actions;
export default bookSlice.reducer;