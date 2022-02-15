import React, {useEffect, useState} from 'react';
import styles from '../styles/modules/modal.module.scss';
import { MdOutlineClose } from 'react-icons/md';
import Button from './Button';
import { useDispatch } from 'react-redux';
import {addToDo, updateToDo} from '../slices/toDoSlice';
import { v4 as uuid } from 'uuid';
import {toast} from 'react-hot-toast';


const ToDoModal = ({ type, modalOpen, setModalOpen, toDo }) => {
    const [ title, setTitle ] = useState('');
    const [status, setStatus] = useState('incomplete');
    const dispatch = useDispatch();

    useEffect( () => {
        if (type === 'update' && toDo) {
            setTitle(toDo.title);
            setStatus(toDo.status);
        } else {
            setTitle('');
            setStatus('incomplete');
        }
    }, [type, toDo, modalOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === '') {
            toast.error('Please fill a title field');
            return;
        }
        if (title && status) {
            if (type === 'add') {
                dispatch(addToDo({
                    id: uuid(),
                    title,
                    status,
                    time: new Date().toLocaleString(),
                }))
                toast.success('Task added successfully');
            }
            if (type === 'update') {
                if (toDo.title !== title || toDo.status !== status) {
                    dispatch(updateToDo({
                        ...toDo,
                        title,
                        status
                    }))
                } else {
                    toast.error('No changes made')
                }
            }
            setModalOpen(false);
        }
    };

    return (
        modalOpen && (
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.closeButton}
                         onClick={() => setModalOpen(false)}
                         onKeyDown={() => setModalOpen(false)}
                         tabIndex={0}
                         role='button'
                    >
                        <MdOutlineClose />
                    </div>
                    <form className={styles.form}
                          onSubmit={(e) => handleSubmit(e)}
                    >
                        <h1 className={styles.formTitle}>{type === 'update' ? 'Edit' : 'Add'} Task</h1>
                        <label htmlFor='title'>
                            Title
                            <input type='text'
                                   id='title'
                                   value={title}
                                   onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                        <label htmlFor='status'>
                            Status
                            <select name='status'
                                    id='status'
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value='incomplete'>Incomplete</option>
                                <option value='complete'>Complete</option>
                            </select>
                        </label>
                        <div className={styles.buttonContainer}>
                            <Button type='submit' variant='primary'>{type === 'update' ? 'Edit' : 'Add'} Task</Button>
                            <Button type='button' variant='secondary'
                                    onClick={() => setModalOpen(false)}
                                    onKeyDown={() => setModalOpen(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default ToDoModal;