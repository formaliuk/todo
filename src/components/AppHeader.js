import React from 'react';
import Button, { SelectButton } from "./Button";
import styles from '../styles/modules/app.module.scss';

const AppHeader = () => {
    return (
        <div className={styles.appHeader}>
            <Button variant='primary'>lorem</Button>
            <SelectButton>
                <option value='all'>All</option>
                <option value='incomplete'>Incomplete</option>
                <option value='complete'>Complete</option>
            </SelectButton>
        </div>
    );
};

export default AppHeader;