import { create } from "zustand";
import { toast } from "sonner";

import type { PaymentsState } from "./type";
import { createPaymentRequest, deletePayment, getPaymentsRequest } from "../api/payments";


export const usePaymentsStore = create<PaymentsState>((set) => ({
    data: [],
    total: 0,
    isCreating: false,
     loading: false,
    error: null,

fetchPayments: async () => {
        set({ loading: true, error: null });

        try {
            const response = await getPaymentsRequest();

            set({
                data: response.payments,
                total: response.total,
                loading: false,
            });

        } catch (error) {
            set({
                loading: false,
                error: error instanceof Error
                    ? error.message
                    : "Помилка отримання платежів",
            });
        }
    },

  createPayment: async (payload) => {
    set({ isCreating: true });

    try {
      const request = createPaymentRequest(payload);

      toast.promise(request, {
        loading: "Створюємо виплату...",

        success: "Виплату успішно створено!",

        error: (error) =>
          error instanceof Error
            ? error.message
            : "Не вдалося створити виплату.",
      });

      const newPayment = await request;

      set((state) => ({
          data: [...state.data, newPayment],
          total: state.total + Number(newPayment.amount),
      }));

      return newPayment;

    } catch (error) {
      console.error("Create payment error:", error);

      return null;

    } finally {
      set({ isCreating: false });
    }
  },
  
  deleteFunctionPaymentFetch: async (id) => {
  try {
    await deletePayment(id);

    set((state) => {
      const deletedPayment = state.data.find(
        (item) => item.id === id
      );

      return {
        data: state.data.filter((item) => item.id !== id),

        total: state.total - Number(deletedPayment?.amount ?? 0),
      };
    });

    toast.success("Виплату успішно видалено!");

  } catch (error) {
    console.error("Delete payment error:", error);

    toast.error(
      error instanceof Error
        ? error.message
        : "Не вдалося видалити виплату!"
    );
  }
},
}));