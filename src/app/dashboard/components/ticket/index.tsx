"use client";

import { TicketProps } from "@/utils/ticket.type";
import { FiCheckSquare, FiFile } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { useContext } from "react";
import { ModalContext } from "@/providers/modal";

interface TicketItensProps {
  ticket: TicketProps;
}

export function TicketItem({ ticket }: TicketItensProps) {
  const router = useRouter();
  const { handleModalVisible, setDetailTicket } = useContext(ModalContext);

  async function handleChangeStatus() {
    try {
      const response = await api.patch("/api/ticket", {
        id: ticket.id,
      });

      router.refresh();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleOpenModal() {
    handleModalVisible();
    setDetailTicket({
      ticket: ticket,
    });
  }

  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300">
        <td className="text-left pl-1">{ticket.customer?.name}</td>
        <td className="text-left hidden sm:table-cell">
          {ticket.created_at?.toLocaleDateString()}
        </td>
        <td className="text-left">
          <span className="bg-green-500 px-2 py-1 rounded">
            {ticket.status}
          </span>
        </td>
        <td className="text-center flex items-center justify-center mt-4">
          <input type="hidden" name="id" value={ticket.id} />
          <button className="mr-4" onClick={handleChangeStatus}>
            <FiCheckSquare size={24} color="#EF4444" />
          </button>
          <button onClick={handleOpenModal}>
            <FiFile size={24} color="#3b82f6" />
          </button>
        </td>
      </tr>
    </>
  );
}
