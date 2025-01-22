import { create } from "zustand";
import { Icon, LatLng } from "leaflet";
import { devtools } from "zustand/middleware"; // Optional for debugging
import { ClubUpdateOrCreate, ClubWithIcon } from "../types"; // Adjust the path as needed
import { createClub, updateClub, deleteClub, fetchClubs } from "../api"; // Adjust the import path for your API functions

function filterData(data: any) {
  const cleanData = new Array(data.length);
  data.forEach((e, i) => {
    cleanData[i] = {
      ...e,
      geocode: new LatLng(e.geocode.latitude, e.geocode.longitude),
      escudo: new Icon({
        iconUrl: e.escudo_url || "../../public/clubsvg/Club.png",
        iconSize: [30, 30],
      }),
    };
  });
  return cleanData;
}

function filterCLub(data: any) {
  return {
    ...data,
    geocode: new LatLng(data.geocode.latitude, data.geocode.longitude),
    escudo: new Icon({
      iconUrl: data.escudo_url || "../../public/clubsvg/Club.png",
      iconSize: [30, 30],
    }),
  };
}

interface ClubState {
  clubs: ClubWithIcon[];
  loading: boolean;
  error: number | null;

  fetchAllClubs: () => Promise<void>;
  addClub: (club: ClubUpdateOrCreate) => Promise<void>;
  updateClub: (club: ClubUpdateOrCreate) => Promise<void>;
  removeClub: (id: string) => Promise<void>;
}

export const useClubStore = create<ClubState>()(
  devtools((set, get) => ({
    clubs: [],
    loading: false,
    error: null,

    fetchAllClubs: async () => {
      set({ loading: true, error: null });
      try {
        const data = await fetchClubs();
        const cleanData = filterData(data);
        set({ clubs: cleanData, loading: false });
      } catch (error: any) {
        set({ error: error.message, loading: false });
      }
    },

    addClub: async (club: ClubUpdateOrCreate) => {
      set({ loading: true, error: null });
      try {
        const newClub = await createClub(club);
        const goodClub = filterCLub(newClub);
        set((state) => ({
          clubs: [...state.clubs, goodClub],
          loading: false,
          error: state.error === 1 ? 2 : 1,
        }));
      } catch (error: any) {
        console.log(error);
        set((state) => ({
          error: state.error === -1 ? 0 : -1,
          loading: false,
        }));
      }
    },

    updateClub: async (club: ClubUpdateOrCreate) => {
      set({ loading: true });
      try {
        const updatedClub = await updateClub(club);
        const goodClub = await filterCLub(updatedClub);
        set((state) => ({
          clubs: state.clubs.map((c) =>
            c.id === updatedClub.id ? goodClub : c,
          ),
          loading: false,
          error: state.error === 1 ? 2 : 1,
        }));
      } catch (error: any) {
        console.log(error);
        set((state) => ({
          error: state.error === -1 ? 0 : -1,
          loading: false,
        }));
      }
    },

    removeClub: async (id: string) => {
      set({ loading: true, error: null });
      try {
        await deleteClub(id);
        set((state) => ({
          clubs: state.clubs.filter((c) => c.id !== id),
          loading: false,
          error: state.error === 1 ? 2 : 1,
        }));
      } catch (error: any) {
        set((state) => ({
          error: state.error === -1 ? 0 : -1,
          loading: false,
        }));
      }
    },
  })),
);
