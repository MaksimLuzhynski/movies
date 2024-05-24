import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialStateMovies = {
    movies: [],
    genres: [],
    filterOptions: {
        page: '1',
        language: 'en-US',
        sort_by: 'popularity.desc',
    },
    movieDetails: {},
    totalPages: 1,
    isLoading: false,
    isChangeRating: false
} as any;

const moviesReducer = createSlice({
    name: "movies",
    initialState: initialStateMovies,
    reducers: {
        setMoviesAC: (state, action: PayloadAction<{ moviesData: Array<any> }>) => {
            state.movies = action.payload.moviesData;
        },
        setGenresAC: (state, action: PayloadAction<{ genresData: Array<any> }>) => {
            state.genres = action.payload.genresData;
        },
        setTotalPagesAC: (state, action: PayloadAction<{ totalPagesData: number }>) => {
            state.totalPages = action.payload.totalPagesData;
        },
        resetFilterOptionsAC(state) {
            delete state.filterOptions.with_genres
            delete state.filterOptions.primary_release_year
            delete state.filterOptions['vote_average.gte']
            delete state.filterOptions['vote_average.lte']
            state.filterOptions.page = 1
        },
        changeFilterOptionsAC: (state, action: PayloadAction<{ value: any; typeSelector: string }>) => {
            if (action.payload.typeSelector === 'genres') {
                state.filterOptions.with_genres = action.payload.value.with_genres;
                state.filterOptions.page = 1
            }
            if (action.payload.typeSelector === 'release_year') {
                state.filterOptions.primary_release_year = action.payload.value.primary_release_year;
                state.filterOptions.page = 1
            }
            if (action.payload.typeSelector === 'vote_average_from') {
                state.filterOptions['vote_average.gte'] = action.payload.value['vote_average.gte'];
                state.filterOptions.page = 1
            }
            if (action.payload.typeSelector === 'vote_average_to') {
                state.filterOptions['vote_average.lte'] = action.payload.value['vote_average.lte'];
                state.filterOptions.page = 1
            }
            if (action.payload.typeSelector === 'sort_by') {
                state.filterOptions.sort_by = action.payload.value.value;
                state.filterOptions.page = 1
            }
            if (action.payload.typeSelector === 'page_number') {
                state.filterOptions.page = action.payload.value.page;
            }
        },
        setMovieDetailsAC: (state, action: PayloadAction<{ movieDetailsData: Array<any> }>) => {
            state.movieDetails = action.payload.movieDetailsData;
        },

        setLoadingAC: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        changeRatingAC: (state, action: PayloadAction<boolean>) => {
            state.isChangeRating = action.payload;
        },
    },
});

export default moviesReducer.reducer;

export const {
    setMoviesAC,
    changeFilterOptionsAC,
    setGenresAC,
    setTotalPagesAC,
    resetFilterOptionsAC,
    setMovieDetailsAC,
    setLoadingAC,
    changeRatingAC
} = moviesReducer.actions;