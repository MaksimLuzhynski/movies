import style from "./MovieDetailsCard.module.css";
import moment from "moment";
import NoPoster from './../../assets/img/No_poster.svg';
import { Image } from "@mantine/core"
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { posterURL } from "../../api/moviesApi";
import { IconStarFilled } from "@tabler/icons-react";
import { voteCountFormat } from "../../utils/voteCountFormat";
import { getTimeFromMins } from "../../utils/getTimeFromMins";

export const MovieDetailsCard = () => {

    const { poster_path, title, release_date, vote_average, vote_count, budget, revenue, genres, runtime, rating } = useSelector<RootState, any>((state) => state.moviesReducer.movieDetails);
    const moviesBudget = new Intl.NumberFormat('ja-JP').format(budget)
    const moviesRevenue = new Intl.NumberFormat('ja-JP').format(revenue)

    return (
        <div className={style.wrapper}>
            <Image
                className={style.poster}
                src={poster_path ? `${posterURL}${poster_path}` : NoPoster}
                alt="poster"
            />
            <div className={style.description}>
                <div className={style.header}>
                    <div className={style.title}>{title}</div>
                    <div className={style.releaseDate}> {release_date?.slice(0, 4)}</div>
                    <div className={style.rating}>
                        <div className={style.mark}>
                            <IconStarFilled size={28} color={'#FAB005'} />
                            <div className={style.average}>{vote_average?.toFixed(1)}</div>
                        </div>
                        <div className={style.voteCount}> {voteCountFormat(vote_count)}  </div>
                    </div>
                </div>
                <div className={style.details}>
                    {runtime !== 0
                        && <div className={style.detailsItem}>
                            <div className={style.detailsName}>Duration</div>
                            <span className={style.detailsValue}>{getTimeFromMins(runtime)}</span>
                        </div>}
                    {release_date !== 0
                        && <div className={style.detailsItem}>
                            <div className={style.detailsName}>Premiere</div>
                            <span className={style.detailsValue}>{moment(release_date).format('ll')}</span>
                        </div>}
                    {budget !== 0
                        && <div className={style.detailsItem}>
                            <div className={style.detailsName}>Budget</div>
                            <span className={style.detailsValue}>{`$${moviesBudget}`}</span>
                        </div>}
                    {revenue !== 0
                        && <div className={style.detailsItem}>
                            <div className={style.detailsName}>Gross worldwide</div>
                            <span className={style.detailsValue}>{`$${moviesRevenue}`}</span>
                        </div>}
                    {genres?.length > 0
                        && <div className={style.detailsItem}>
                            <div className={style.detailsName}>Genres</div>
                            <span className={style.detailsValue}>{genres?.map((item: any) => item.name).join(", ")}</span>
                        </div>}
                </div>
            </div>
            <div className={style.userOwnRating}>
                <IconStarFilled size={28} color={rating ? "#9854F6" : '#D5D6DC'} />
                {rating && <span>{rating}</span>}
            </div>
        </div>
    )
}