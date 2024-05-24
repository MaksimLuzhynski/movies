
import style from "./ModalRating.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Rating } from '@mantine/core';
import { RootState, useAppDispatch } from "../../redux/store";
import { changeRatingAC } from "../../redux/reducers/moviesReducer/moviesReducer";
import { getMoviesThunk } from "../../redux/reducers/moviesReducer/moviesThunk";

type Props = {
    opened: any | boolean;
    close: any | boolean;
    onClose: (close: boolean) => void;
    movieName?: string;
    movie: any
}

export const ModalRating = ({ opened, close, onClose, movie }: Props) => {

    const currentRating = JSON.parse(`${localStorage.getItem(`${movie.id}`)}`)?.rating
    const [rating, setRating] = useState(currentRating ? currentRating : 0);
    const dispatch = useAppDispatch();
    const filterOptions = useSelector<RootState, any>((state) => state.moviesReducer.filterOptions);
    const isChangeRating = useSelector<RootState, any>((state) => state.moviesReducer.isChangeRating);

    const addRating = (item: any, mark: any) => {
        let ratedObj = { ...item, rating: mark }
        localStorage.setItem(`${item.id}`, JSON.stringify(ratedObj));
        dispatch(getMoviesThunk(filterOptions));
        dispatch(changeRatingAC(!isChangeRating));
        onClose(close)
    }

    const removeRating = (id: any) => {
        localStorage.removeItem(`${id}`);
        dispatch(getMoviesThunk(filterOptions));
        setRating(0)
        dispatch(changeRatingAC(!isChangeRating));
        onClose(close)
    }

    return (
        <Modal
            opened={opened}
            onClose={close}
            title={"Your rating"}
            centered
            size={380}
            radius={8}
            padding={16}
            classNames={{
                title: style.title,
                header: style.header,
                close: style.close,
            }} >
            <div className={style.body}>
                <div className={style.movieName}>Coco</div>
                <Rating
                    value={rating}
                    onChange={setRating}
                    count={10}
                    size="28"
                    classNames={{ symbolBody: style.symbolBody }}
                />
                <div className={style.buttons}>
                    <Button className={style.buttonSave} disabled={!rating} onClick={() => addRating(movie, rating)}>Save</Button>
                    <Button
                        className={style.buttonRemove}
                        onClick={() => removeRating(movie.id)}
                        disabled={rating < 1}
                        variant="transparent">
                        Remove rating
                    </Button>
                </div>
            </div>
        </Modal>
    );
}