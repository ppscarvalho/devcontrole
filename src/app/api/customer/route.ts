import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

export async function GET(request: Request){

    const { searchParams } = new URL(request.url);
    const customerEmail = searchParams.get("email");
    
    if(!customerEmail || customerEmail === ""){
        return NextResponse.json({ error: "Customer not found" }, { status: 400 })
    }

    try {
        const customer = await prismaClient.customer.findFirst({
            where: { 
                email: customerEmail
            },
        });
        return NextResponse.json(customer)
    } catch (error) {
        return NextResponse.json({ error: "Customer not found" }, { status: 400 })
    }
}


export async function POST(request: Request){
    const session = await getServerSession(authOptions);

    if(!session || !session.user) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const { name, email, phone, address, userId } = await request.json();

    try {
        await prismaClient.customer.create({
            data: {
                name,
                email,
                phone,
                address: address ? address : "",
                userId: userId,
            },
        });

        return NextResponse.json({ message: "Cliente cadastrado com sucesso!" }, { status: 201 });
        
    } catch (error) {
        return NextResponse.json({ error: "Faild create new customer!" }, { status: 401 });
    }
}

export async function DELETE(request: Request){
    const session = await getServerSession(authOptions);

    if(!session || !session.user) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("id");

    const customer = await prismaClient.customer.findFirst({
        where: {
            id: customerId as string,
        },
    });

    if(customer == null) {
        return NextResponse.json({ message: "Customer not found!" }, { status: 400 });
    }

    const ticketsCustomer = await prismaClient.ticket.findFirst({
        where: {
            customerId: customer.id as string,
        },
    });

    if(ticketsCustomer){
        return NextResponse.json({ message: "Cliente possui tickets associados!" }, { status: 400 });
    }

    try{
        await prismaClient.customer.delete({
          where:{
            id: customer.id as string
          }
          
        })
        return NextResponse.json({ message: "Cliente deletado com sucesso!" }, { status: 200})
    
      }catch(err){
        console.log(err);
        return NextResponse.json({ error: "Failed delete customer" }, { status: 400 })
      }
}