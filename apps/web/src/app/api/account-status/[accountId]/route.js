import { NextResponse } from 'next/server';
import { secretStripe } from '@/lib/stripe';

// will be called before any monetary operations, will also be used to fill out onboarding_completed_at in the db when in returns the "go ahead signal" for a company that started the onboarding

// the "go ahead signal":
// {
//   "id": "acct_1QxYabcDeFGhIJkl",
//   "chargesEnabled": true,
//   "payoutsEnabled": true,
//   "detailsSubmitted": true,
//   "requirements": {
//     "currently_due": [],
//     "eventually_due": [],
//     "past_due": [],
//     "pending_verification": [],
//     "errors": []
//   }
// }

export async function GET(request, { params }) {
  try {
    const { accountId } = await params;

    const account = await secretStripe.accounts.retrieve(accountId);

    return NextResponse.json({
      id: account.id,
      chargesEnabled: account.charges_enabled,
      payoutsEnabled: account.payouts_enabled,
      detailsSubmitted: account.details_submitted,
      requirements: account.requirements,
    });
  } catch (error) {
    console.error('Error retrieving account status:', error);
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 400 }
    );
  }
}

