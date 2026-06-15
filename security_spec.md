# Security Specification - ConstruCasa

## Data Invariants
1. A Professional profile must have at least one trade and a valid name.
2. A QuoteRequest must link a valid client and professional.
3. Only the professional assigned to a QuoteRequest can update its status or add an estimate.
4. Only the client who created a QuoteRequest can mark it as reviewed.
5. User PII (phone, exact location) should be protected.

## The Dirty Dozen Payloads (Target: DENIED)
1. **Identity Spoofing**: Attempt to create a professional profile using someone else's UID.
2. **Trade Poisoning**: Attempt to inject 1MB trades list.
3. **Status Hijacking**: Client attempts to accept their own quote request.
4. **Price Manipulation**: Client attempts to set the `priceEstimate` on their own request.
5. **Orphaned Request**: Create a quote request for a non-existent professional.
6. **Review Forgery**: Update `hasReviewed` on a request the user doesn't own.
7. **Profile Privatization**: Attempt to delete another professional's profile.
8. **ID Poisoning**: Inject path variables with junk characters.
9. **PII Leak**: Unauthenticated user attempting to list all `users` collections.
10. **System Field Injection**: Attempt to set `viewedByPro` as a client.
11. **Email Spoofing**: Attempt to update a user profile with a different email.
12. **Mass Query Scraping**: Attempting a `list` query across all documents without filters.

## Test Runner (Logic Outline)
- Verification of `isSignedIn()`
- Verification of `isOwner()`
- Verification of `isValidProfessional()`, `isValidQuoteRequest()`, etc.
- Testing `affectedKeys().hasOnly()` for status updates.
