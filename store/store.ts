import { create } from 'zustand';

type StoreState = {
    count: number;
};

const initialState: StoreState = {
    count: 0,
};

interface Store {
    count: number,
    setUpdatedCount: () => void;
}

export const useStore = create<Store>((set) => ({
    ...initialState,
    setUpdatedCount: async () => {
        set((state : StoreState) => ({...state, count: state.count + 1}));
    }
}));