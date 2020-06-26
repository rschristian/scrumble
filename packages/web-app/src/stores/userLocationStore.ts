import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'stores';

import { Workspace } from 'models/Workspace';
import { Sprint } from 'models/Sprint';

type State = {
    currentWorkspace: Workspace | undefined;
    currentSprint: Sprint | undefined;
    activeSideBarItem: number;
};

const initialState: State = {
    currentWorkspace: undefined,
    currentSprint: undefined,
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

export const reduxSetCurrentWorkspace = (workspace: Workspace) => async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setWorkspace(workspace));
};

export const reduxSetCurrentSprint = (sprint: Sprint) => async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setSprint(sprint));
};

export const reduxSetActiveSideBarMenuItem = (barItem: number) => async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setSideBarItem(barItem));
};
