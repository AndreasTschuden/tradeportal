import React from 'react'
import { getProductsByCompany } from "@/actions/products"

const CompanyProductsPage = async () => {

    await getProductsByCompany()

  return (
    <div>CompanyProductsPage</div>
  )
}

export default CompanyProductsPage