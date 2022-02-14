import React, {useState} from 'react';
import styles from '../styles/modules/todoItem.module.scss';
import {getClasses} from '../utils/getClasses';
import {format} from "date-fns";
import {MdDelete, MdEdit} from 'react-icons/md';
import {useDispatch} from 'react-redux';
import {deleteToDo} from "../slices/toDoSlice";
import {toast} from "react-hot-toast";
import ToDoModal from "./ToDoModal";

const ToDoItem = ({ toDo }) => {
    const dispatch = useDispatch();
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    const handleDelete = () => {
        dispatch(deleteToDo(toDo.id));
        toast.success('ToDo deleted successfully');
    }

    const handleUpdate = () => {
        setUpdateModalOpen(true);
    }

    return (
        <>
            <div className={styles.item}>
                <div className={styles.todoDetails}>
                    [ ]
                    <div className={styles.texts}>
                        <p className={getClasses([styles.todoText, toDo.status === 'complete' && styles['todoText--completed']])}>
                            {toDo.title}
                        </p>
                        {/*<p className={styles.time}>*/}
                        {/*    {format(new Date(toDo.time), `YYYY-MM-DD:HH:mm:ss`)}*/}
                        {/*</p>*/}
                    </div>
                </div>
                <div className={styles.todoActions}>
                    <div className={styles.icon}
                         onClick={handleUpdate}
                         onKeyDown={handleUpdate}
                         role='button'
                         tabIndex={0}
                    >
                        <MdEdit />
                    </div>
                    <div className={styles.icon}
                         onClick={handleDelete}
                         onKeyDown={handleDelete}
                         role='button'
                         tabIndex={0}
                    >
                        <MdDelete />
                    </div>
                </div>
            </div>
            <ToDoModal
                type='update'
                modalOpen={updateModalOpen}
                setModalOpen={setUpdateModalOpen}
            />
        </>
    );
};

export default ToDoItem;