import style from "./NotFound.module.css";
import { useNavigate } from "react-router-dom";
import { Button, Image } from "@mantine/core"


type Props = {
    image: any;
    imageMaxWidth: any;
    message: string;
    buttonName?: string;
    path?: string;
};

export const NotFound = ({ image, imageMaxWidth, message, buttonName, path }: Props) => {

    const navigate = useNavigate();

    return (
        <div className={style.wrapper}>
            <Image style={{ maxWidth: imageMaxWidth, paddingBottom: "32px" }} src={image} />
            <div className={style.message}>{message}</div>
            {buttonName
                && <Button
                    className={style.button}
                    onClick={() => navigate(`${path}`)}>
                    {buttonName}
                </Button>
            }
        </div>
    )
}