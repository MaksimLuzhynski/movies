import style from "./PageNotFound.module.css";
import Logo from './../../assets/img/Logo.svg';
import { Image } from "@mantine/core"
import { NotFound } from "../../components/NotFound/NotFound";
import PageNotFoundImg from "../../assets/img/Page_not_found.png";


export const PageNotFound = () => {

    return (
        <div className={style.wrapper}>
            <Image className={style.logo} src={Logo} />
            <NotFound
                image={PageNotFoundImg}
                imageMaxWidth={'656px'}
                message={'We can’t find the page you are looking for'}
                buttonName={'Go Home'}
                path={'/'}
            />
        </div>
    )
}