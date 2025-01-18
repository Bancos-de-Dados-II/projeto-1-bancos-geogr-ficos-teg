import { create } from "zustand";
import { LatLng } from "leaflet";

type ClubOperation = "edit" | "create" | null;

interface ClubState {
  currentOperation: ClubOperation;
  currentOperationLocation: LatLng | null;
  setCurrentOperationLocation: (location: LatLng) => void;
  editModeSetter: ((bool: boolean) => void) | null;
  setCurrentOperation(operation: ClubOperation): void;
  updateEditModeSetter: (setter: ((bool: boolean) => void) | null) => void;
  resetState: () => void;
}

export const clubStateStore = create<ClubState>()((set) => ({
  currentOperation: null,
  currentOperationLocation: null,
  editModeSetter: null,
  setCurrentOperationLocation: (location: LatLng) =>
    set({ currentOperationLocation: location }),
  setCurrentOperation: (operation: ClubOperation) =>
    set({ currentOperation: operation }),

  updateEditModeSetter: (setter: ((bool: boolean) => void) | null) =>
    set({ editModeSetter: setter }),

  resetState: () =>
    set({
      editModeSetter: null,
      currentOperation: null,
      currentOperationLocation: null,
    }),
}));
