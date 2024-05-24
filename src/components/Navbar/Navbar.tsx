import style from "./Navbar.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell, Flex } from "@mantine/core"
import { useMediaQuery } from '@mantine/hooks';

type NavigationProps = {
    current: string;
}

export const Navbar = ({ current }: NavigationProps) => {

    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 1440px)');
    const [active, setActive] = useState(current);
    const buttons = [
        { link: "/", label: "Movies" },
        { link: "/rated_movies", label: "Rated movies" },
    ];

    return (
        <AppShell.Navbar
            p="24" pt="80"
            bg={"#F2EBF9"}
            withBorder={true}
            left={isMobile ? 0 : `calc(50% - 720px)`}
        >
            <Flex gap={16} direction={'column'}>
                {buttons.map((item, index) => (
                    <div
                        key={index}
                        onClick={(event) => {
                            event.preventDefault();
                            setActive(item.label);
                            navigate(item.link);
                        }}
                        className={item.label === active ? style.buttonActive : style.button}
                    >
                        {item.label}
                    </div>
                ))}
            </Flex>
        </AppShell.Navbar>
    )
}