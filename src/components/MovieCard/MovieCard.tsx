import style from "./MovieCard.module.css";
import NoPoster from './../../assets/img/No_poster.svg';
import { Image } from "@mantine/core"
import { IconStarFilled } from '@tabler/icons-react';
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { posterURL } from "../../api/moviesApi";
import { voteCountFormat } from "../../utils/voteCountFormat";
import { useDisclosure } from "@mantine/hooks";
import { ModalRating } from "../ModalRating/ModalRating";

type Props = {
    movies: any;
};

export const MovieCard = ({ movies }: Props) => {

    const { id, title, poster_path, release_date, vote_average, vote_count, genre_ids, rating } = movies
    const genres = useSelector<RootState, any>((state) => state.moviesReducer.genres);
    const arrayGendesForCard = genres.filter((item: any) => genre_ids.includes(item.id));
    const navigate = useNavigate();
    const [opened, { open, close }] = useDisclosure(false);

    const viewMovieDetails = (id: number) => {
        navigate(`/movie/${id}`)
    }

    return (
        <div className={style.wrapper}>
            <div className={style.content}>
                <Image
                    alt="poster"
                    className={style.poster}
                    src={poster_path ? `${posterURL}${poster_path}` : NoPoster}
                    onClick={() => viewMovieDetails(id)}
                />
                <div className={style.description}>
                    <div className={style.headerDescription}>
                        <div className={style.title} onClick={() => viewMovieDetails(id)}>{title}</div>
                        <div className={style.releaseDate}>{release_date.slice(0, 4)}</div>
                        <div className={style.ratingBlock}>
                            <div className={style.ratingAndStar}>
                                <IconStarFilled size={28} color={'#FAB005'} />
                                <div className={style.rating}>{vote_average?.toFixed(1)}</div>
                            </div>
                            <div className={style.voteCount}>{voteCountFormat(vote_count)}</div>
                        </div>
                    </div>
                    <div className={style.genresBlockWrapper}>
                        <div className={style.genresBlock}>
                            <div className={style.genreTitle}> Genres</div>
                            <div className={style.genres}>
                                {arrayGendesForCard.map((item: any) => item.name).slice(0, 5).join(', ')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.star}>
                <IconStarFilled
                    size={28}
                    color={rating ? "#9854F6" : "#D5D6DC"}
                    onClick={open} />
                {rating && <span>{rating}</span>}
            </div>
            <ModalRating opened={opened} onClose={close} close={close} movie={movies} />
        </div>
    )
}