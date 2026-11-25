
export interface Operation {
  id: string;
  name: string;
  price: number;
  sequence_number: number;
  owner_id: string;
  created_at: string;
  updated_at: string;

  //update and delete params
  isDisabled?: boolean;
  isShow?: boolean;
  isDelete?: boolean;
}

export interface CreateOperationData {
  name: string;
  price: number;
}

export interface UpdateOperationData {
 
  id: string;
  name: string;
  price: number;
  isShow?: boolean;
} 

export interface DeleteResponse {
  status: string;
  message: string;
  id: string;
}
