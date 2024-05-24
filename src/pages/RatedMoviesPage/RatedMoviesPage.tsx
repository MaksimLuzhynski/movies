import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Navbar } from "../../components/Navbar/Navbar";
import { Header } from "../../components/Header/Header";
import { NotFound } from "../../components/NotFound/NotFound";
import No_rated_movies from "../../assets/img/No_rated_movies.png";
import { RatedContent } from "../../components/RatedContent/RatedContent";

export const RatedMoviesPage = () => {

    const [opened, { toggle }] = useDisclosure();

    let arrKeys: any = []
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (!isNaN(Number(key))) {
            arrKeys.push(Number(key))
        }
    }

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 280, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            w={"100%"}
            maw={1440}
            m={"0 auto"}
        >
            <Header opened={opened} toggle={toggle} />
            <Navbar current="Rated movies" />
            {arrKeys.length > 0
                ? <RatedContent />
                : <NotFound
                    image={No_rated_movies}
                    imageMaxWidth={"312px"}
                    message={"You haven't rated any films yet"}
                    buttonName={'Go Home'}
                    path={'/'}
                />
            }
        </AppShell>
    );
}