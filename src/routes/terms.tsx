import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/ContentPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions — AgriLink" },
      { name: "description", content: "Rules for using the AgriLink farm to dealer marketplace." },
      { property: "og:title", content: "Terms and Conditions — AgriLink" },
      { property: "og:description", content: "Listing, purchase, transport and payment terms." },
    ],
  }),
  component: () => (
    <ContentPage eyebrow="Terms and conditions" title="Rules of the marketplace" intro="Last updated 26 July 2026.">
      <p><strong className="text-foreground">1. Accounts.</strong> One verified account per person or business. You are responsible for activity under your login and for keeping your mobile number current.</p>
      <p><strong className="text-foreground">2. Listings.</strong> Farmers must describe crop quantity, grade, harvest date and price accurately. Misrepresented lots may be delisted and the account suspended.</p>
      <p><strong className="text-foreground">3. Purchases.</strong> A confirmed order is binding. Payment is held in escrow and released to the farmer after delivery confirmation or 48 hours after drop-off, whichever is earlier.</p>
      <p><strong className="text-foreground">4. Transport.</strong> Drivers must hold a valid licence, registration and insurance. Loads must be delivered within the agreed window; repeated cancellations reduce dispatch priority.</p>
      <p><strong className="text-foreground">5. Fees.</strong> Platform fees and subscription charges are shown before you confirm. Taxes apply as per Indian law.</p>
      <p><strong className="text-foreground">6. Disputes.</strong> Quality or weight disputes must be raised within 24 hours of delivery with photographic evidence; AgriLink mediates and may hold escrow until resolved.</p>
      <p><strong className="text-foreground">7. Liability.</strong> AgriLink facilitates transactions between independent parties and is not the seller of any crop or the operator of any vehicle.</p>
    </ContentPage>
  ),
});
