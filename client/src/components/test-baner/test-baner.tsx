import React, { FC, useState } from "react";
import { TTestBaner } from "./types";

import styles from "./test-baner.module.css";

export const TestBaner: FC<TTestBaner> = ({ title }): JSX.Element => {
    const [baterText, setBaterText] = useState(title);
    const onClick = () => {
        setBaterText([...baterText].reverse().join(""));
    };

    return (
        <span className={styles.baner} onClick={onClick}>
            <span className={styles.unselectable}>{baterText}</span>
        </span>
    );
};
