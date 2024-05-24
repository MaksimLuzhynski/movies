import style from "./MovieDetailsContent.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { MovieDetailsCard } from "../MovieDetailsCard/MovieDetailsCard";
import { MovieTrailerCard } from "../MovieTrailerCard/MovieTrailerCard";
import { Anchor, AppShell, Breadcrumbs, Flex, Loader } from "@mantine/core";


export const MovieDetailsContent = () => {

    const movie = useSelector<RootState, any>((state) => state.moviesReducer.movieDetails);
    const isLoading = useSelector<RootState, any>((state) => state.moviesReducer.isLoading);

    const items = [
        { title: 'Movies', href: '/' },
        { title: movie.title, href: `/movie/${movie.id}` },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <AppShell.Main
            pt={{ base: 100, sm: 42 }}
            bg={"#F5F5F6"}
        >
            <Flex
                direction={"column"}
                pl={{ base: 24, xl: 180, lg: 75, md: 60, sm: 45 }}
                pr={{ base: 24, xl: 180, lg: 75, md: 60, sm: 45 }}
                pb={40}
                gap={20}
            >
                {isLoading
                    ? <Loader color="#9854F6" size="200px" className={style.loder} />
                    : <>
                        <Breadcrumbs>{items}</Breadcrumbs>
                        <MovieDetailsCard />
                        <MovieTrailerCard />
                    </>
                }
            </Flex>
        </AppShell.Main>
    )
}
