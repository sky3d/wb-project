import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TestBaner } from "../components/test-baner/test-baner";
import { useWindowSize } from "../utils/hoocs";
import { ReangaCreate } from "./renga-create";

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
                </Routes>
            </Router>
        </div>
    );
};
