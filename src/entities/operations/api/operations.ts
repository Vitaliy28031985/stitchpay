import { CreateOperationData, DeleteResponse, Operation, UpdateOperationData } from "@/shared/interfaces/operation";


// Універсальна обробка відповіді API
async function handleResponse<T>(
  response: Response
): Promise<T> {
  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.error ?? "Помилка запиту до сервера"
    );
  }

  return result.data as T;
}


// Отримання списку операцій
export async function fetchOperations(): Promise<Operation[]> {
  const response = await fetch("/api/operations", {
    method: "GET",
    cache: "no-store",
    credentials: "same-origin",
  });

  return handleResponse<Operation[]>(response);
}


// Створення операції
export async function createOperationRequest(
  payload: CreateOperationData
): Promise<Operation> {
  const response = await fetch("/api/operations/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify(payload),
  });

  return handleResponse<Operation>(response);
}

export async function updateOperation(data: UpdateOperationData) {
  const response = await fetch("/api/operations/update", {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error ?? "Помилка редагування Операції!");
  }

  return result;
}


export async function deleteOperation(id: string) {
  const response = await fetch("/api/operations/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result.error ?? `Помилка видалення операції (${response.status})`
    );
  }

  return {
    success: true,
    id: result.id,
  };
}