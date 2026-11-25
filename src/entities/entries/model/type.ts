import { CreateEntryData, Entry, PopularOperation } from "@/shared/interfaces/entries";

export interface EntriesState {
  data: Entry[];
  popularOperations: PopularOperation[];
  isCreating: boolean;
  total: number;
  
   getEntries: () => Promise<void>;

  createEntry: (payload: CreateEntryData) => Promise<Entry | null>;
  deleteFunctionEntry: (id: string) => Promise<void>;
}