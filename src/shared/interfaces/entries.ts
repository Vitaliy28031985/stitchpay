export interface CreateEntryData {
  name: string;
  price: number;
  qty: number;
  date: Date;
}

export interface Entry {
  id: string;
  name: string;
  price: number;
  qty: number;
  date: string;
  result: number;
  sequence_number: number;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface EntriesResponse {
  entries: Entry[];
  total: number;
}

export interface PopularOperation {
  name: string;
  count: number;
  progress: number;
}

