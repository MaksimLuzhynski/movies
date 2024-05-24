import Logo from './../../assets/img/Logo.svg';
import { useMediaQuery } from '@mantine/hooks';
import { AppShell, Burger, Group, Image } from "@mantine/core"


type Props = {
    opened: boolean;
    toggle: any;
};

export const Header = ({ opened, toggle }: Props) => {
    const isMobile = useMediaQuery('(max-width: 1440px)');
    return (

        <AppShell.Header
            withBorder={false}
            bg={"#F2EBF9"}
            w={{ base: '100%', sm: 280 }}
            left={isMobile ? 0 : `calc(50% - 720px)`}
            p="24"
            pl="8"
        >
            <Group h="100%" px="md">
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                <Image src={Logo} />
            </Group>
        </AppShell.Header>
    )
}