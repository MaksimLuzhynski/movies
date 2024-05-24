import { useEffect } from "react";
import { AppShell } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useAppDispatch } from "../../redux/store";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import { getMovieDetailsThunk } from "../../redux/reducers/moviesReducer/moviesThunk";
import { MovieDetailsContent } from "../../components/MovieDetailsContent/MovieDetailsContent";


export const MovieDetailsPage = () => {
    const dispatch = useAppDispatch();
    const [opened, { toggle }] = useDisclosure();
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        dispatch(getMovieDetailsThunk(id ? + id : 0));
    }, [])

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 280, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            w={"100%"}
            maw={1440}
            m={"0 auto"}
        >
            <Header opened={opened} toggle={toggle} />
            <Navbar current="Movies" />
            <MovieDetailsContent />
        </AppShell>
    );
}