import { CustomerProps } from "./customer.type";

export interface TicketProps {
    id: string;
    name: string;
    created_at: Date | null;
    updated_at: Date | null;
    userId: string | null;
    description: string;
    status: string;
    customerId: string | null;  
    customer: CustomerProps | null;
};