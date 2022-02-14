import { createSlice } from "@reduxjs/toolkit";

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
        }
    }
})

export const { addToDo } = toDoSlice.actions;
export default toDoSlice.reducer;
