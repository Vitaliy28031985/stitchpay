import type {
  Payment,
  CreatePaymentData,
} from "@/shared/interfaces/payments";

export interface PaymentsState {
  data: Payment[];
    isCreating: boolean;
    total: number;
    loading: boolean;
    error: string | null;

    fetchPayments: () => Promise<void>;

  createPayment: (
    payload: CreatePaymentData
  ) => Promise<Payment | null>;
  deleteFunctionPaymentFetch: (id: string) => Promise<void>;
}