import { api } from "../../../api/moviesApi";
import { setGenresAC, setLoadingAC, setMovieDetailsAC, setMoviesAC, setTotalPagesAC } from "./moviesReducer";


export const getMoviesThunk = (filterOptions: any) => {
    return (dispatch: any) => {
        dispatch(setLoadingAC(true))
        api
            .getMovies(filterOptions)
            .then((res) => {

                let arrKeys: any = []
                for (let i = 0; i < localStorage.length; i++) {
                    let key = localStorage.key(i);
                    arrKeys.push(Number(key))
                }

                const moviesWithRating = res.data.results.map((item: any) => {
                    if (arrKeys.includes(item.id)) {
                        return ({ ...item, rating: JSON.parse(`${localStorage.getItem(`${item.id}`)}`).rating })
                    }
                    else {
                        return item
                    }
                });
                dispatch(setLoadingAC(false))
                dispatch(setMoviesAC({ moviesData: moviesWithRating }));
                dispatch(setTotalPagesAC({ totalPagesData: res.data.total_pages }));
            })
            .catch((error) => {
                console.error("Don't get movies!!!", error);
            })
            .finally(() => {
                dispatch(setLoadingAC(false))
            });
    };
};


export const getGenresThunk = () => {
    return (dispatch: any) => {
        api
            .getGenres()
            .then((res) => {
                dispatch(setGenresAC({ genresData: res.data.genres }))
            })
            .catch((error) => {
                console.error("Don't get genders!!!", error);
            });
    };
};


export const getMovieDetailsThunk = (id: number) => {
    return (dispatch: any) => {
        dispatch(setLoadingAC(true))
        api
            .getMovieDetails(id)
            .then((res) => {
                function checkRating() {
                    let arrKeys: any = []
                    let movieWithRating = {}

                    for (let i = 0; i < localStorage.length; i++) {
                        let key = localStorage.key(i);
                        arrKeys.push(Number(key))
                    }

                    if (arrKeys.includes(res.data.id)) {
                        return (movieWithRating = { ...res.data, rating: JSON.parse(`${localStorage.getItem(`${res.data.id}`)}`).rating })
                    }
                    else {
                        return movieWithRating = { ...res.data }
                    }
                }

                dispatch(setMovieDetailsAC({ movieDetailsData: checkRating() }))
            })
            .catch((error) => {
                console.error("Don't get details about movie!!!", error);
            })
            .finally(() => {
                dispatch(setLoadingAC(false))
            });
    };
}; 