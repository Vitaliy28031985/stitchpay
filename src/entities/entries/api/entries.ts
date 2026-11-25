import type {
  CreateEntryData,
  EntriesResponse,
  Entry
} from "@/shared/interfaces/entries";

export async function createEntriesRequest(
  data: CreateEntryData
): Promise<Entry> {

  const response = await fetch("/api/entries/create", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      ...data,
      date: data.date.toISOString(),
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.error || "Не вдалося створити запис"
    );
  }

  return result as Entry;
}



export async function getEntriesRequest(): Promise<EntriesResponse> {

  const response = await fetch("/api/entries", {
    method: "GET",
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.error || "Не вдалося отримати список робіт"
    );
  }

  return result as EntriesResponse;
}

export async function deleteEntryFetch(id: string) {
  const response = await fetch("/api/entries/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result.error ?? `Помилка видалення роботи (${response.status})`
    );
  }

  return {
    success: true,
    id: result.id,
  };
}