"use server";

import { db } from "@/lib/prisma";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getReviews(productid: string) {
  let reviews = await db.user.reviews.findMany({
    where: {
      products_id: productid,
    },
    select: {
      id: true,
      created_at: true,
      updated_at: true,
      customers_id: true,
      stars: true,
      comment: true,
      products_id : true,
      report_points: true,
      reviewer_comment: true,
      customers : {
        select : {
            name : true,
        }
      }
    },
  });

  return reviews;
}

export async function createReview(productId : string , data : {stars : number, comment : string}){


    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if(!session){
        throw new Error("no user logged in")
    }

    const customer = await db.user.customers.findUnique({
        where : {
            id : session.user.id
        }
    })

    if(!customer){
        throw new Error("your are now customer")
    }

    const review = await db.user.reviews.findFirst({
        where : {
            products_id : productId,
            customers_id : session.user.id
        }
    })

    if(review){
         throw new Error("you already submitted a review")
    }


    const result = await db.user.reviews.create({
        data : {
            products_id : productId,    
            customers_id : session.user.id,
            stars : data.stars,
            comment : data.comment
        }
    })

    console.log(result)
}
