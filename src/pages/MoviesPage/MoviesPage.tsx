import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Navbar } from "../../components/Navbar/Navbar";
import { Header } from "../../components/Header/Header";
import { MainContent } from "../../components/MainContent/MainContent";


export const MoviesPage = () => {

    const [opened, { toggle }] = useDisclosure();

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
            <MainContent />
        </AppShell>
    );
}