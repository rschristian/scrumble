import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'stores';

import { Workspace } from 'models/Workspace';
import { Sprint } from 'models/Sprint';

type State = {
    currentWorkspace: Workspace;
    currentSprint: Sprint;
    activeSideBarItem: number;
};

const initialState: State = {
    currentWorkspace: null,
    currentSprint: null,
    activeSideBarItem: 0,
};

const slice = createSlice({
    name: 'userLocation',
    initialState,
    reducers: {
        setWorkspace: (state: State, action: PayloadAction<Workspace>): void => {
            state.currentWorkspace = action.payload;
        },
        setSprint: (state: State, action: PayloadAction<Sprint>): void => {
            state.currentSprint = action.payload;
        },
        setSideBarItem: (state: State, action: PayloadAction<number>): void => {
            state.activeSideBarItem = action.payload;
        },
    },
});
export default slice.reducer;

// Actions
const { setWorkspace, setSprint, setSideBarItem } = slice.actions;

export const setCurrentWorkspace = (workspace: Workspace) => async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setWorkspace(workspace));
};

export const setCurrentSprint = (sprint: Sprint) => async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setSprint(sprint));
};

export const setActiveSideBarMenuItem = (barItem: number) => async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setSideBarItem(barItem));
};
