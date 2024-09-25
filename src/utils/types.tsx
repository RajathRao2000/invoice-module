export interface Totals {
  quantity?: number;
  discount?: number;
  tax?: number;
  total?: number;
}
interface ItemDetails {
  item: string;
  qty: number;
  unit: string;
  price: number;
  discount_percent: number;
  discount: number;
  gst: string;
  gstper: number;
  tax: number;
  total: number;
}

export type ItemCollection = {
  [key: string]: ItemDetails;
};
export interface CustomerFormData {
  name: string;
  phoneNumber: string;
  state: string;
  invoice?: string;
  date?: string;
  balance?: number;
  city?: string;
}

export interface Data {
  tableData?: ItemCollection;
  form?: CustomerFormData;
  totals?: Totals;
}

export interface FinalTotals {
  total: number;
  round?: string;
  final: number;
}
