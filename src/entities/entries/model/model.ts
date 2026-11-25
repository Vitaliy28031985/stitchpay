import { create } from "zustand";
import { toast } from "sonner";
import { EntriesState } from "./type";
import { createEntriesRequest, deleteEntryFetch, getEntriesRequest } from "../api/entries";
import { getPopularOperations } from "../utils/getPopularOperations";



export const useEntriesStore = create<EntriesState>((set) => ({
    data: [],
    popularOperations: [],
    isCreating: false,
    total: 0,

 getEntries: async () => {
    try {
      const result = await getEntriesRequest();

      set({
        data: result.entries,
        total: result.total,
        popularOperations: getPopularOperations(result.entries),
      });

    } catch (error) {
      console.error("Get entries error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Не вдалося отримати роботи"
      );
    }
  },

createEntry: async (payload) => {
    set({ isCreating: true });

    try {
      const request = createEntriesRequest(payload);

      toast.promise(request, {
        loading: "Створюємо роботу...",
        success: "Роботу успішно створено!",
        error: (error) =>
          error instanceof Error
            ? error.message
            : "Не вдалося створити роботу.",
      });

      const newEntry = await request;

      set((state) => {
        const newData = [...state.data, newEntry];

        return {
          data: newData,
          total: state.total + Number(newEntry.result),
          popularOperations: getPopularOperations(newData),
        };
      });

      return newEntry;

    } catch (error) {
      console.error("Create entry error:", error);

      return null;

    } finally {
      set({ isCreating: false });
    }
  },

   deleteFunctionEntry: async (id) => {
  try {
    await deleteEntryFetch(id);

    set((state) => {
      const deletedEntry = state.data.find(
        (item) => item.id === id
      );

      const newData = state.data.filter(
        (item) => item.id !== id
      );

      return {
        data: newData,

        total: state.total - Number(deletedEntry?.result ?? 0),

        popularOperations: getPopularOperations(newData),
      };
    });

    toast.success("Роботу успішно видалено!");

  } catch (error) {
    console.error("Delete entry error:", error);

    toast.error(
      error instanceof Error
        ? error.message
        : "Не вдалося видалити роботу!"
    );
  }
},
}));