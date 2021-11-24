import React from "react";
import { TestBaner } from "../components/test-baner/test-baner";
import { useWindowSize } from "../utils/hoocs";

const style = {
    height: 893,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

export const MainPage = (): JSX.Element => {
    const [, h] = useWindowSize();

    return (
        <div style={{ ...style, height: h }}>
            <TestBaner title={"GO GO GO ROCK & ROLL"} />
        </div>
    );
};
