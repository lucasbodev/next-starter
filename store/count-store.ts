import { getCount } from '@/app/actions/count-actions';
import { create } from 'zustand';

type CountStoreState = {
    count: number;
};

const initialState: CountStoreState = {
    count: 0,
};

interface CountStore {
    count: number,
    setUpdatedCount: () => void;
}

export const countStore = create<CountStore>((set) => ({
    ...initialState,
    setUpdatedCount: async () => {
        const updatedCount = await getCount();
        set((state : CountStoreState) => ({...state, count: updatedCount!}));
    }
}));