import create from 'zustand';

// This global state is needed because we need to transfer the
// control points that have been added while drawing the connection
// to the new edge that is created onConnect
export const useAppStore = create((set) => ({
  connectionLinePath: [],
  setConnectionLinePath: (connectionLinePath) => {
    set({ connectionLinePath });
  },
}));