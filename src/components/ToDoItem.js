import React, {useEffect, useState} from 'react';
import styles from '../styles/modules/todoItem.module.scss';
import {getClasses} from '../utils/getClasses';
import {MdDelete, MdEdit} from 'react-icons/md';
import {useDispatch} from 'react-redux';
import {deleteToDo, updateToDo} from '../slices/toDoSlice';
import {toast} from 'react-hot-toast';
import ToDoModal from './ToDoModal';
import CheckButton from './CheckButton';

const ToDoItem = ({ toDo }) => {
    const dispatch = useDispatch();
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [checked, setChecked] = useState(false);

    useEffect( () => {
        if (toDo.status === 'complete') {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, [toDo.status]);

    const handleDelete = () => {
        dispatch(deleteToDo(toDo.id));
        toast.success('ToDo deleted successfully');
    }

    const handleUpdate = () => {
        setUpdateModalOpen(true);
    }

    const handleCheck = () => {
        setChecked(!checked);
        dispatch(updateToDo({
            ...toDo,
            status: checked ? 'incomplete' : 'complete'
            })
        );
    }

    return (
        <>
            <div className={styles.item}>
                <div className={styles.todoDetails}>
                    <CheckButton checked={checked} handleCheck={handleCheck}/>
                    <div className={styles.texts}>
                        <p className={getClasses([styles.todoText, toDo.status === 'complete' && styles['todoText--completed']])}>
                            {toDo.title}
                        </p>
                        <p className={styles.time}>
                            {toDo.time}
                        </p>
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
                toDo={toDo}
                modalOpen={updateModalOpen}
                setModalOpen={setUpdateModalOpen}
            />
        </>
    );
};

export default ToDoItem;