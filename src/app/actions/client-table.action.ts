"use server";

import { headers } from 'next/headers';

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';

interface ClientProps {
  id?: string,
  name: string,
  email: string,
}

interface InvoiceProps {
  clientId: string,
  amount: number,
  dueDate: Date,
  isPaid: boolean,

}

export async function createNewClient(clientProps: ClientProps) {

  try {

    const session = await auth.api.getSession({
      headers: await headers()
    });
    const currentUserId = session?.user?.id
    if (!currentUserId) return[];

    const createClient = await prisma.client.create({
      data: {
        ...clientProps,
        userId: currentUserId
      }
    })

    revalidatePath('/dashboard');
    return createClient;
  } catch (error) {
    console.error("please fill out the missing fields", error)
    return [];
  }
}

export async function createNewInvoice(invoiceProps: InvoiceProps) {

  try {

    const session = await auth.api.getSession({
      headers: await headers()
    });
    const currentUserId = session?.user?.id
    if (!currentUserId) return;

    const createInvoice = await prisma.invoice.create({
      data: {
        ...invoiceProps,
        userId: currentUserId
      }
    })

    revalidatePath('/dashboard');
    return createInvoice;
  } catch (error) {
    console.error("please fill out the missing fields", error)
  
  }
}

export async function editClient(clientProps: ClientProps, id: string) {
  try {

    const session = await auth.api.getSession({
      headers: await headers()
    });
    const currentUserId = session?.user?.id
    if (!currentUserId) return;

    const editClient = await prisma.client.update({
      where: {
        id,
        userId: currentUserId
      },
      data: {
        ...clientProps,
      }
    })

    revalidatePath('/dashboard');
    return editClient;
  } catch (error) {
    console.error("please fill out the missing fields", error)
  }
}

export async function editInvoice(invoiceProps: InvoiceProps, id: string) {
  try {

    const session = await auth.api.getSession({
      headers: await headers()
    });
    const currentUserId = session?.user?.id
    if (!currentUserId) return;

    const editInvoice = await prisma.invoice.update({
      where: {
        id,
        userId: currentUserId
      },
      data: {
        ...invoiceProps,
      }
    })

    revalidatePath('/slug');
    return editInvoice;
  } catch (error) {
    console.error("please fill out the missing fields", error)
  }
}

export async function deleteClient( id: string ) {
  try {

    const session = await auth.api.getSession({
      headers: await headers()
    });
    const currentUserId = session?.user?.id
    if (!currentUserId) return;

    const deleteClient = await prisma.client.delete({
      where: {
        id,
        userId: currentUserId
      },
    })

    revalidatePath('/dashboard');
    return deleteClient;
  } catch (error) {
    console.error("please fill out the missing fields", error)
  }
}

export async function deleteInvoice( id: string ) {
  try {

    const session = await auth.api.getSession({
      headers: await headers()
    });
    const currentUserId = session?.user?.id
    if (!currentUserId) return;

    const deleteInvoice = await prisma.invoice.delete({
      where: {
        id,
        userId: currentUserId
      }
    })

    revalidatePath('/slug');
    return deleteInvoice;
  } catch (error) {
    console.error("please fill out the missing fields", error)
  }
}

export async function getClientById() {

  try {

    const session = await auth.api.getSession({
      headers: await headers()
    });
    const currentUserId = session?.user?.id
    if (!currentUserId) return [];

    return await prisma.client.findMany({
      where: { 
        userId: currentUserId
       },
      include: {
      _count: {
      select: { invoices: true },
    },
  },
    });

  } catch (error) {
    console.error("Error fetching client by ID", error)
    return [];
  }
}


export async function getInvoiceById() {

  try {

    const session = await auth.api.getSession({
      headers: await headers()
    });
    const currentUserId = session?.user?.id
    if (!currentUserId) return [];

    return await prisma.invoice.findMany({
      where: { 
        userId: currentUserId
       }
    });

  } catch (error) {
    console.error("Error fetching invoice by ID", error)
    return [];
  }
}


export async function getClientWithInvoice(clientId: string) {

  try {

    return await prisma.client.findUnique({
    where: {
      id: clientId,
    },
    include: {
      invoices: true,
    },
  })

  } catch (error) {
    console.error("Error fetching user by ID", error)
  }
}