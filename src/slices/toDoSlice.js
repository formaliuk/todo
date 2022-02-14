import { createSlice } from '@reduxjs/toolkit';

const getInitialToDo = () => {
    const localToDoList = window.localStorage.getItem('toDoList');
    if (localToDoList) {
        JSON.parse(localToDoList)
    }
    window.localStorage.setItem('toDoList', JSON.stringify([]));
    return [];
}

const initialValue = {
    toDoList: getInitialToDo(),
}

export const toDoSlice = createSlice({
    name: 'toDo',
    initialState: initialValue,
    reducers: {
        addToDo: (state, action) => {
            state.toDoList.push(action.payload);
            const toDoList = window.localStorage.getItem('toDoList');
            if (toDoList) {
                const toDoListArr = JSON.parse(toDoList);
                toDoListArr.push({
                    ...action.payload,
                });
                window.localStorage.setItem('toDoList', JSON.stringify(toDoListArr));
            } else {
                window.localStorage.setItem('toDoList', JSON.stringify([{...action.payload}]))
            }
        },
        deleteToDo: (state, action) => {
            const toDoList = window.localStorage.getItem('toDoList');
            if (toDoList) {
                const toDoListArr = JSON.parse(toDoList);
                toDoListArr.forEach((toDo, index) => {
                    if (toDo.id === action.payload) {
                        toDoListArr.splice(index, 1)
                    }
                });

                window.localStorage.setItem('toDoList', JSON.stringify(toDoListArr))
                state.toDoList = toDoListArr;
            }
        },
        updateToDo: (state, action) => {
            const toDoList = window.localStorage.getItem('toDoList');
            if (toDoList) {
                const toDoListArr = JSON.parse(toDoList);
                toDoListArr.forEach((toDo, index) => {
                    if (toDo.id === action.payload.id) {
                        toDo.title = action.payload.title;
                        toDo.status = action.payload.status;
                    }
                });
                window.localStorage.setItem('toDoList', JSON.stringify(toDoListArr));
                state.toDoList = toDoListArr;
            }
        }
    }
})

export const { addToDo, deleteToDo, updateToDo } = toDoSlice.actions;
export default toDoSlice.reducer;
