import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";

export default async function Ticket() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prismaClient.customer.findMany({
    where: { userId: session.user.id },
  });

  return (
    <Container>
      <main className="flex flex-col mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="bg-gray-900 px-4 py-1 text-white rounded"
          >
            Voltar
          </Link>
          <h1 className="text-3xl font-bold">Novo Chamado</h1>
        </div>

        <form className="flex flex-col mt-6">
          <label className="mb-1 font-medium text-lg">Nome do chamado</label>
          <input
            className="w-full border-2 rounded-md px-2 h-11"
            type="text"
            placeholder="Digite o nome do chamado"
            required
          />

          <label className="mb-1 font-medium text-lg mt-4">
            Descreva o problema
          </label>
          <textarea
            className="w-full border-2 rounded-md px-2 h-24 resize-none"
            placeholder="descreva o problema"
            required
          ></textarea>

          <label className="mb-1 font-medium text-lg mt-4">
            Selecione o cliente
          </label>
          {customers.length === 0 ? (
            <>
              <select className="w-full border-2 rounded-md px-2 h-11 bg-white">
                <option value="">Nenhum cliente cadastrado</option>
              </select>
            </>
          ) : (
            <>
              <select className="w-full border-2 rounded-md px-2 h-11 bg-white">
                <option value="Selecione">Selecionar um cliente</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </>
          )}

          {customers.length === 0 && (
            <>
              <Link
                href="/dashboard/customer/new"
                className="w-full border-2 rounded-md mt-4 px-4 py-2 bg-blue-500 text-white text-center"
              >
                Cadastrar um novo cliente
              </Link>
            </>
          )}

          <button
            type="submit"
            className="w-full border-2 rounded-md mt-4 px-2 bg-blue-500 text-white h-11 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={customers.length === 0}
          >
            Registrar Chamado
          </button>
        </form>
      </main>
    </Container>
  );
}
