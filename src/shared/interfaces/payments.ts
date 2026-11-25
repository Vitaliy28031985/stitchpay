export interface Payment {
  id: string;
  date: string;
  amount: number;
  kind: string;
  comment: string;
  sequence_number: number;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePaymentData {
  date: Date;
  amount: number;
  kind: string;
  comment: string;
}

export interface PaymentsResponse {
  payments: Payment[];
  total: number;
}