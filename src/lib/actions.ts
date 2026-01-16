// 'use server'

// import { prisma } from '@/lib/prisma'
// import { headers } from 'next/headers'
// import { auth } from './auth'

// export async function createClient(formData: FormData) {

//   const session = await auth.api.getSession({
//     headers: await headers()
//   })

//   if (!session) {
//     throw new Error('Not logged in')
//   }

//   const userId = session.user.id

//   const name = formData.get('name') as string
//   const email = formData.get('email') as string
  
//     const clients = await prisma.client.create({
//       data: {
//         name,
//         email,
//         userId,
//       }
//     })

// }

// export async function createInvoice(formData: FormData) {

//   const session = await auth.api.getSession({
//     headers: await headers()
//   })

//   if (!session) {
//     throw new Error('Not logged in')
//   }

//   const userId = session.user.id

//   const amount = parseFloat(formData.get('amount') as string)
//   const dueDate = formData.get('dueDate') as string
//   const isPaid = formData.get('isPaid') === 'true'
//   const clientId = formData.get('clientId') as string

 
//     const invoices = await prisma.invoice.create({
//       data: {
//         amount,
//         dueDate: new Date(dueDate),
//         isPaid,
//         clientId,
//         userId,
//       }
//     })

// }



