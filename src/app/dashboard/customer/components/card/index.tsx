"use client";

import { CustomerProps } from "@/utils/customer.type";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";

export function CardCustomer({ customer }: { customer: CustomerProps }) {
  const router = useRouter();

  async function handlerDeleteCustomer() {
    await api
      .delete("/api/customer", {
        params: { id: customer.id },
      })
      .then(() => {
        router.refresh();
        alert("Cliente deletado com sucesso!");
      })
      .catch((err) => {
        alert("Ocorreu um erro ao deletar o cliente.");
      });
  }

  return (
    <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
      <h2>
        <a className="font-bold">Nome:</a> {customer.name}
      </h2>
      <p>
        <a className="font-bold">Email:</a> {customer.email}
      </p>
      <p>
        <a className="font-bold">Telefone:</a> {customer.phone}
      </p>

      <button
        className="bg-red-500 px-4 rounded text-white mt-2 self-start"
        onClick={handlerDeleteCustomer}
      >
        Deletar
      </button>
    </article>
  );
}
