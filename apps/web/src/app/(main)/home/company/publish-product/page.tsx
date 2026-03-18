import React from 'react'
import PublishProductForm from '@/components/app/PublishProductForm'
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getCategories } from '@/actions/categories'

const PublishProductsPage = async () => {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const company = await db.user.companies.findFirst({
    where: {
      AND: [
        { owner_id: session?.user.id },
        { is_verified: true }   // nur verifizierte Firmen
      ],
    },
  });

  if(!company){
    return (
      <div className='flex items-center justify-center h-screen'>
        <h1 className='font-bold text-red-500 text-5xl'>This Page is only accessable for verified Companies</h1>
      </div>
  )}

  const categories = await getCategories()
  
  return (
    <div className=''> 
        <PublishProductForm categories={categories}/>
    </div>
  )
}

export default PublishProductsPage