import style from "./RatedContent.module.css";
import NoMovies from "../../assets/img/No_movies.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { NotFound } from "../NotFound/NotFound";
import { IconSearch } from "@tabler/icons-react";
import { MovieCard } from "../MovieCard/MovieCard";
import { AppShell, Button, Flex, Input, Pagination, Select } from "@mantine/core";


export const RatedContent = () => {

    const [value, setValue] = useState('');
    const [searchWord, setSearchWord] = useState("");
    const [activePage, setPage] = useState(1);
    const isChangeRating = useSelector<RootState, any>((state) => state.moviesReducer.isChangeRating);

    let arrKeys: any = []
    let ratedMovies: any = []
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (!isNaN(Number(key))) {
            arrKeys.push(Number(key))
            ratedMovies.push(JSON.parse(`${localStorage.getItem(`${localStorage.key(i)}`)}`))
        }
    }

    let searchMovie = ratedMovies.filter((item: any) => item.title.toLowerCase().includes(searchWord.toLowerCase()))

    const totalPages = Math.ceil(searchMovie.length / 4)

    useEffect(() => {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (!isNaN(Number(key))) {
                arrKeys.push(Number(key))
                ratedMovies.push(JSON.parse(`${localStorage.getItem(`${localStorage.key(i)}`)}`))
            }
        }
        if (ratedMovies.length % 4 == 0 && activePage !== 1) {
            setPage(activePage - 1)
        }
    }, [isChangeRating])


    function chunk(array: Array<{}>, chunkSize: number) {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    }
    const chunks = chunk(searchMovie, 4);

    return (
        <AppShell.Main
            pt={{ base: 100, sm: 20 }}
            bg={"#F5F5F6"}
        >
            <Flex
                direction={"column"}
                pl={{ base: 24, xl: 90, lg: 75, md: 60, sm: 45 }}
                pr={{ base: 24, xl: 90, lg: 75, md: 60, sm: 45 }}
                gap={20}
            >
                <div className={style.header}>
                    <h1 className={style.title}>Rated movies</h1>
                    <Input
                        value={value}
                        rightSectionPointerEvents="auto"
                        leftSection={<IconSearch size={18} color={"#ACADB9"} />}
                        onChange={(event) => setValue(event.currentTarget.value)}
                        rightSection={
                            <Button
                                className={style.button}
                                onClick={() => setSearchWord(value)}>
                                Search
                            </Button>}
                        placeholder="Search movie title"
                        w={{ base: "100%", xl: 490 }}
                        classNames={{
                            input: style.inputInput,
                            section: style.sectionInput,
                        }}
                    />
                </div>
                {searchMovie.length > 0
                    ? <div className={style.cardsAndPagination}>
                        <div className={style.cards}>
                            {chunks && chunks[activePage - 1]?.map((item: any) => <MovieCard movies={item} key={item.id} />)}
                        </div>
                        {totalPages > 1
                            && <Pagination total={chunks.length}
                                value={activePage} onChange={setPage}
                                siblings={1}
                                boundaries={-1}
                                pb={77}
                                color={'#9854F6'}
                                classNames={{ dots: style.paginationDots }}
                                className={style.pagination}
                            />
                        }
                    </div>
                    : <NotFound
                        image={NoMovies}
                        imageMaxWidth={"312px"}
                        message={"We don't have such movies, look for another one"}
                    />
                }
            </Flex>
        </AppShell.Main>
    )
}
