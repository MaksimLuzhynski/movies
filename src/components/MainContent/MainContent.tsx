import style from "./MainContent.module.css";
import NoMovies from "../../assets/img/No_movies.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NotFound } from "../NotFound/NotFound";
import { MovieCard } from "../MovieCard/MovieCard";
import { IconChevronUp } from "@tabler/icons-react";
import { IconChevronDown } from "@tabler/icons-react";
import { RootState, useAppDispatch } from "../../redux/store";
import { sortArrayForSelector, yearsArrayForSelector } from "../../utils/constants";
import { getGenresThunk, getMoviesThunk } from "../../redux/reducers/moviesReducer/moviesThunk";
import { changeFilterOptionsAC, resetFilterOptionsAC } from "../../redux/reducers/moviesReducer/moviesReducer";
import { AppShell, Group, Select, Title, Text, NumberInput, Pagination, Flex, MultiSelect, Loader, } from "@mantine/core";


export const MainContent = () => {
    const dispatch = useAppDispatch();
    const movies = useSelector<RootState, any>((state) => state.moviesReducer.movies);
    const genres = useSelector<RootState, any>((state) => state.moviesReducer.genres);
    const totalPages = useSelector<RootState, number>((state) => state.moviesReducer.totalPages);
    const filterOptions = useSelector<RootState, any>((state) => state.moviesReducer.filterOptions);
    const isLoading = useSelector<RootState, any>((state) => state.moviesReducer.isLoading);

    const [isOpenGenresSelect, setIsOpenGenresSelect] = useState(false)
    const [isOpenReleaseSelect, setIsOpenReleaseSelect] = useState(false)
    const [isOpenSortSelect, setIsOpenSortSelect] = useState(false)

    const isReset =
        filterOptions.primary_release_year
        || filterOptions.with_genres
        || filterOptions['vote_average.gte']
        || filterOptions['vote_average.lte']

    useEffect(() => {
        dispatch(getGenresThunk());
    }, [])

    useEffect(() => {
        dispatch(getMoviesThunk(filterOptions));
    }, [filterOptions])

    const handleChangeFilterOptions = (selectedObj: any, typeSelector: string) => {
        dispatch(changeFilterOptionsAC({ value: selectedObj, typeSelector }));
    };

    let genresArrayForSelector = genres.map((item: any) => ({ value: String(item.id), label: item.name }))

    const handleResetFilter = () => {
        dispatch(resetFilterOptionsAC());
    }

    return (
        <AppShell.Main
            pt={{ base: 100, sm: 42 }}
            bg={"#F5F5F6"}
        >
            <Flex
                direction={"column"}
                pl={{ base: 24, xl: 90, lg: 75, md: 60, sm: 45 }}
                pr={{ base: 24, xl: 90, lg: 75, md: 60, sm: 45 }}
            >
                <Title order={1}>Movies</Title>
                <Group gap={16} pt={40}>
                    <MultiSelect
                        classNames={style}
                        label="Genres"
                        placeholder={"Select genre"}
                        withCheckIcon={false}
                        w={{ base: "100%", xl: 283 }}
                        data={genresArrayForSelector}
                        onDropdownOpen={() => setIsOpenGenresSelect(true)}
                        onDropdownClose={() => setIsOpenGenresSelect(false)}
                        value={filterOptions.with_genres ? genresArrayForSelector?.label : []}
                        rightSection={isOpenGenresSelect ? <IconChevronUp color={"#9854F6"} stroke={1} /> : <IconChevronDown stroke={1} />}
                        onChange={(value: string[]) => handleChangeFilterOptions({ 'with_genres': value.join() }, 'genres')}
                    />
                    <Select
                        classNames={style}
                        label="Release year"
                        placeholder="Select release year"
                        withCheckIcon={false}
                        w={{ base: "100%", xl: 283 }}
                        data={yearsArrayForSelector}
                        onDropdownOpen={() => setIsOpenReleaseSelect(true)}
                        onDropdownClose={() => setIsOpenReleaseSelect(false)}
                        value={filterOptions.primary_release_year ? filterOptions.primary_release_year : null}
                        onChange={(value: string | null) => handleChangeFilterOptions({ 'primary_release_year': value }, 'release_year')}
                        rightSection={isOpenReleaseSelect ? <IconChevronUp color={"#9854F6"} stroke={1} /> : <IconChevronDown stroke={1} />}
                    />

                    <Group justify="center" wrap="nowrap" gap={8} w={{ base: "100%", xl: 284 }}>
                        <NumberInput
                            classNames={style}
                            label="Ratings"
                            placeholder="From"
                            w={{ base: '100%', xl: 138 }}
                            min={0}
                            max={filterOptions['vote_average.lte'] ? filterOptions['vote_average.lte'] : 0}
                            value={filterOptions['vote_average.gte']}
                            onChange={(value) => handleChangeFilterOptions({ 'vote_average.gte': value }, 'vote_average_from')}
                        />
                        <NumberInput
                            classNames={style}
                            placeholder="To"
                            pt={30}
                            w={{ base: '100%', xl: 138 }}
                            min={filterOptions['vote_average.gte'] ? filterOptions['vote_average.gte'] : 0}
                            max={10}
                            value={filterOptions['vote_average.lte']}
                            onChange={(value) => handleChangeFilterOptions({ 'vote_average.lte': value }, 'vote_average_to')}
                        />
                    </Group>
                    <Text
                        className={isReset ? style.resetFilters : style.disabledResetFilters}
                        onClick={handleResetFilter}>
                        Reset filters
                    </Text>
                </Group>
                <Select
                    classNames={style}
                    label="Sort by"
                    withCheckIcon={false}
                    w={{ base: "100%", xl: 283 }}
                    style={{ paddingTop: 23, alignSelf: "flex-end" }}
                    onDropdownOpen={() => setIsOpenSortSelect(true)}
                    onDropdownClose={() => setIsOpenSortSelect(false)}
                    rightSection={isOpenSortSelect ? <IconChevronUp color={"#9854F6"} stroke={1} /> : <IconChevronDown stroke={1} />}
                    data={sortArrayForSelector}
                    defaultValue={filterOptions.sort_by}
                    onChange={(value: string | null) => handleChangeFilterOptions({ value }, 'sort_by')}
                />
                {isLoading
                    ? <Loader color="#9854F6" size="200px" className={style.loder} />
                    : <>
                        <Group justify="center" gap={16} pt={24} pb={24} >
                            {movies.length > 0
                                ? movies.map((item: any) => <MovieCard movies={item} key={movies.id} />)
                                : <NotFound
                                    image={NoMovies}
                                    imageMaxWidth={"312px"}
                                    message={"We don't have such movies, look for another one"}
                                />}
                        </Group>
                        {movies.length > 0
                            && totalPages > 1
                            && <Pagination total={totalPages} value={+filterOptions.page}
                                siblings={1}
                                boundaries={-1}
                                onChange={(value) => handleChangeFilterOptions({ 'page': value }, 'page_number')}
                                pb={77}
                                color={'#9854F6'}
                                classNames={{ dots: style.paginationDots }}
                                className={style.pagination}
                            />
                        }
                    </>
                }
            </Flex>
        </AppShell.Main>
    )
}