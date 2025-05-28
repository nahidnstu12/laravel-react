import { ColumnDef } from "@tanstack/react-table";

export interface FormProps {
    data: Record<string, any>;
    setData: (key: string, value: any) => void;
    errors: Record<string, string>;
    mode: 'create' | 'read' | 'edit';
    options: Record<string, any[]>;
}

export type CustomColumnDef<T> = ColumnDef<T> & {
  filterField?: 'input' | 'select';
  filteredItems?: { label: string; value: string }[];
};