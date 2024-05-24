import style from "./MovieTrailerCard.module.css";
import NoPoster from './../../assets/img/No_poster.svg';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { posterURL, youtubeURL } from "../../api/moviesApi";

export const MovieTrailerCard = () => {

    const trailer = useSelector<RootState, any>((state) => state.moviesReducer.movieDetails.videos?.results[0]?.key);
    const description = useSelector<RootState, any>((state) => state.moviesReducer.movieDetails.overview);
    const production = useSelector<RootState, any>((state) => state.moviesReducer.movieDetails.production_companies);

    return (
        <div className={style.wrapper}>
            <div className={style.trailer}>
                <div className={style.title}>Trailer</div>
                <iframe className={style.movie} src={`${youtubeURL}${trailer}`} />
            </div>
            <div className={style.border}></div>
            <div className={style.description}>
                <div className={style.title}>Description</div>
                <div className={style.descriptionText}>{description}</div>
            </div>
            <div className={style.border}></div>
            <div className={style.production}>
                <div className={style.title}>Production</div>
                <div className={style.companies}>
                    {production?.map((item: any) =>
                        <div className={style.companyItem}>
                            <img className={style.companyLogo} src={item.logo_path ? `${posterURL}${item.logo_path}` : NoPoster} />
                            <div className={style.companyName}>{item.name}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}