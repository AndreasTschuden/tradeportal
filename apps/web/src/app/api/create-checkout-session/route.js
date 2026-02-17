import { NextResponse } from "next/server";
import { secretStripe } from "@/lib/stripe";

// Create checkout session
export async function POST(request) {
  const formData = await request.formData();
  const accountId = formData.get("accountId");
  const products = formData.get("products"); //in there will be all the products which we'll use to create the seesion params (multiple products? just expand the array)

  if (products) {
    const sessionParams = {
      line_items: [
        {
          price_data: {
            currency: "currency from product in json in db",
            product_data: {
              name: "name from product in db",
            },
            unit_amount: priceFromProductInDB, //in smallest currency possible e.g. cents
          },
          quantity: amountFrombasket, //how many were in basket in db
        },
      ],
      mode: "payment",
      ui_mode: "embedded",
      return_url:
        "https://example.com/checkout/return?session_id={CHECKOUT_SESSION_ID}",
    };

    let session;

    if (accountId) {
      // For marketplace model, use transfer_data
      sessionParams.payment_intent_data = {
        application_fee_amount:
          "here the variable after mathing out 10% of the amount in smallest unit",
        transfer_data: {
          destination: accountId, //account id must still be added to company table in db
        },
      };

      session = await secretStripe.checkout.sessions.create(sessionParams);

      if (
        session /*still need to check what sripe returns into session if error on create checkout session*/
      ) {
        return NextResponse.json({ clientSecret: session.client_secret });
      } else {
        return NextResponse.json({
          error: "stripe checkout error: couldnt create the session",
        });
      }
    } else {
      return NextResponse.json({
        error: "stripe checkout error: no account id provided",
      });
    }
  } else {
    return NextResponse.json({
      error: "stripe checkout error: no products provided",
    });
  }
}
