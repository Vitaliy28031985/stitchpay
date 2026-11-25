import { create } from "zustand";
import { toast } from "sonner";
import { OperationsState } from "./type";
import { createOperationRequest, deleteOperation, fetchOperations, updateOperation } from "../api/operations";
import { Operation } from "@/shared/interfaces/operation";

export const useOperationsStore = create<OperationsState>(
  ((set, get) => ({
    data: [],
    isCreating: false,
    isLoading: false,

    getOperation: async () => {
      try {
        set({
          isLoading: true,
        });

        const operation = await fetchOperations();

        const newOperation: Operation[] =
          operation.map((comment) => ({
            ...comment,
             isDisabled: false,
             isShow: false,
             isDelete: false,
            
          }));

        set({
          data: newOperation,
          isLoading: false,
        });
      } catch (error) {
        console.error(
          "Помилка отримання операцій:",
          error
        );

        set({
          isLoading: false,
        });
      }
    },

    createOperation: async ({ name, price }) => {
      set({ isCreating: true });

      const request = createOperationRequest({ name, price });
            
      toast.promise(request, {
        loading: "Створюємо операцію...",
        success: "Операцію успішно створено!",
        error: (error) =>
          error instanceof Error
            ? error.message
            : "Не вдалося створити операцію.",
      });

      try {
        const newOperation = await request;

        newOperation.isShow = false;
        newOperation.isDelete = false;
        newOperation.isDisabled = false;

        set((state) => ({
          data: [...state.data,  newOperation],
          isCreating: false,
        }));

        return newOperation;
                
      } catch (error) {
        console.error("Create operation error:", error);

        set({ isCreating: false });

        return null;
      }
    },
        
    addIsToggle: (
      id: string,
      currentIsShow: boolean,
      name: 'update' | 'delete'
    ): void => {
       
      set((state) => ({
        data: state.data.map((item) => {
          if (item.id !== id) {
            return item;
          }

          if (name === 'update') {
            return {
              ...item,
              isShow: currentIsShow,
          
            };
          }

          if (name === 'delete') {
            return {
              ...item,
              isDelete: currentIsShow,
            
            };
          }

          return item;
        }),
      }));
       
    },
    onChange: (e: React.ChangeEvent<HTMLInputElement>): void => {
  const { name, value, id } = e.currentTarget;

  set((state) => ({
    data: state.data.map((item) => {
      if (item.id !== id) {
        return item;
      }

      return {
        ...item,
        [name]: name === "price"
          ? (value === "" ? 0 : Number(value))
          : value,
      };
    }),
  }));
},

    changeDisabled(id) {
  set((state) => ({
    data: state.data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isDisabled: !item.isDisabled
        }
      }

      return item
    })
  }))
  }, 

    updateOperations: async (data) => {
      const { id, isShow, name, price } = data;
      get().addIsToggle(id, !isShow, 'update');
      if (isShow) {
        get().changeDisabled(id);
        const updateResult = await updateOperation({ id, name, price: Number(price), isShow});

      toast.promise(updateResult, {
        loading: "Оновлюємо операцію...",
        success: "Операцію успішно оновлена!",
        error: (error) =>
          error instanceof Error
            ? error.message
            : "Не вдалося оновити операцію.",
      });

       get().changeDisabled(id);

      }
    },

  deleteFunctionOperation: async (id) => {
  try {
    await deleteOperation(id);

    set((state) => ({
      data: state.data.filter((item) => item.id !== id),
    }));

    toast.success("Операцію успішно видалено!");

  } catch (error) {
    console.error("Delete operation error:", error);

    toast.error(
      error instanceof Error
        ? error.message
        : "Не вдалося видалити операцію!"
    );
  }
},
  
  })));