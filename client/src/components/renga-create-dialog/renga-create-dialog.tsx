import React, { FC, useState } from "react";

import styles from "./renga-create-dialog.module.css";

export const RengaCreateDialog = (): JSX.Element => {
    const [baterText, setBaterText] = useState('RengaCreateDialog1');
    const onClick = () => {
        setBaterText([...baterText].reverse().join(""));
    };

    return (
        <span className={styles.baner} onClick={onClick}>
            <span className={styles.unselectable}>{baterText}</span>
        </span>
    );
};
