import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'stores';

import { Workspace } from 'models/Workspace';
import { Sprint, SprintStatus } from 'models/Sprint';

type State = {
    currentWorkspace: Workspace;
    currentSprint: Sprint;
    activeSideBarItem: number;
};

const initialState: State = {
    currentWorkspace: {
        id: -1,
        name: '',
        description: '',
        projectIds: [],
        users: [],
    },
    currentSprint: {
        id: -1,
        title: '',
        description: '',
        status: SprintStatus.active,
        projectIdToMilestoneIds: {},
    },
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
