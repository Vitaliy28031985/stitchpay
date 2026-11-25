import { CreateOperationData, Operation, UpdateOperationData } from "@/shared/interfaces/operation";


export interface OperationsState { 
    data: Operation[];
    isCreating: boolean;
    isLoading: boolean;

    getOperation: () => Promise<void>
    createOperation: ({ name, price }: CreateOperationData) => Promise<Operation | null>;

    addIsToggle: (
    id: string,
    currentIsShow: boolean,
    name: 'update' | 'delete'
    ) => void;
      onChange: (
    e: React.ChangeEvent<HTMLInputElement>
    ) => void;
    changeDisabled: (id: string) => void;

    updateOperations: (data: UpdateOperationData) => Promise<void>;
    deleteFunctionOperation: (id: string) => Promise<void>;
}