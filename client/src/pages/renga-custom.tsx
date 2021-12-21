import React from "react";
import { Link } from "react-router-dom";

export const ReangaCustom = (): JSX.Element => {
    return (
        <section style={{fontSize:30}}>
            <div>Тут будем хренаxить ручками</div>
            <div>
                А потом пойдем <Link to="/renga">сюда</Link>{" "}
            </div>
        </section>
    );
};
