import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TestBaner } from "../components/test-baner/test-baner";
import { useWindowSize } from "../utils/hoocs";
import { Reanga } from "./renga";
import { ReangaCreate } from "./renga-create";
import { ReangaCustom } from "./renga-custom";

const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

export const MainPage = (): JSX.Element => {
    const [, h] = useWindowSize();

    return (
        <div style = {{...style, height: h}}>
            <Router>
                <Routes>
                    <Route path="/" element={<TestBaner title={"Создать ренгу"} />} />
                    <Route path="/renga_create" element={<ReangaCreate />} />
                    <Route path="/renga_custom" element={<ReangaCustom />} />
                    <Route path="/renga" element={<Reanga />} />
                </Routes>
            </Router>
        </div>
    );
};
