import axios from "axios";

export const posterURL = 'https://image.tmdb.org/t/p/w500'
export const youtubeURL = 'https://www.youtube.com/embed/'

export const Instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjU4MTQ0ODlkNjc0NmE2MmU0YjZkYzVkMjhiNWQzMSIsInN1YiI6IjY2MmU1OGE0YzNhYTNmMDEyM2ZkNWQzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o4Qd3cqW87NJoGmRCT_egQbTnWbHi9jbRs5_LM7S2ws'
    },
});


export const api = {
    getMovies: (filterOptions: any) => Instance.get(`discover/movie?`, { params: filterOptions }),
    getGenres: () => Instance.get(`genre/movie/list?language=en`),
    getMovieDetails: (id: number) => Instance.get(`movie/${id}?append_to_response=videos,images`)
};
