import React, { FC } from "react";
import { TTestBaner } from "./types";

const style = { 
    color: "red", 
    fontSize: 30, 
    border: "2px solid red", 
    width: "auto", 
    padding: 20, 
    borderRadius: 10, 
    boxShadow: "5px 3px 4px 2px #cd5c5c7d" 
};

export const TestBaner: FC<TTestBaner> = ({ title }): JSX.Element => {
    return <span style={style}>{title}</span>;
};
