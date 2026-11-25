import type {
  CreatePaymentData,
  Payment,
  PaymentsResponse
} from "@/shared/interfaces/payments";





export async function getPaymentsRequest(): Promise<PaymentsResponse> {
    const response = await fetch("/api/payments", {
        method: "GET",
        cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Помилка отримання платежів");
    }

    return result as PaymentsResponse;
}


export async function createPaymentRequest(
  data: CreatePaymentData
): Promise<Payment> {

  const response = await fetch("/api/payments/create", {
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
      result.error || "Не вдалося створити виплату"
    );
  }

  return result as Payment;
}

export async function deletePayment(id: string) {
  const response = await fetch("/api/payments/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result.error ?? `Помилка видалення виплати (${response.status})`
    );
  }

  return {
    success: true,
    id: result.id,
  };
}