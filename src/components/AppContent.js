import React from 'react';
import { useSelector } from 'react-redux';
import ToDoItem from './ToDoItem';
import styles from '../styles/modules/app.module.scss';

const AppContent = () => {
    const toDoList = useSelector((state) => state.toDo.toDoList);
    console.log(toDoList)
    const sortedToDoList = [...toDoList];
    sortedToDoList.sort((a, b) => new Date(b.time) - new Date(a.time));
    return (
        <div className={styles.content__wrapper}>
            {sortedToDoList && sortedToDoList.length > 0
                ? sortedToDoList.map((toDo) => <ToDoItem key={toDo.id} toDo={toDo}/>)
                : 'no to do found'
            }
        </div>
    );
};

export default AppContent;