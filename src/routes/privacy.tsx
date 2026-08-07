import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/ContentPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — AgriLink" },
      {
        name: "description",
        content: "How AgriLink collects, uses and protects farmer, dealer and driver data.",
      },
      { property: "og:title", content: "Privacy Policy — AgriLink" },
      { property: "og:description", content: "Our data practices in plain language." },
    ],
  }),
  component: () => (
    <ContentPage
      eyebrow="Privacy policy"
      title="Your data, handled carefully"
      intro="Last updated 26 July 2026."
    >
      <p>
        <strong className="text-foreground">What we collect.</strong> Name, mobile number, email,
        district, crop listings, order records, transport requests and device information needed to
        run the marketplace.
      </p>
      <p>
        <strong className="text-foreground">How we use it.</strong> To match crops with dealers,
        assign drivers, process payments, prevent fraud, and send alerts such as weather warnings
        and payment updates.
      </p>
      <p>
        <strong className="text-foreground">Sharing.</strong> Contact details are shared only
        between counterparties in an active order or transport request. We never sell personal data
        to advertisers.
      </p>
      <p>
        <strong className="text-foreground">Payments.</strong> Card and UPI details are handled by
        our PCI-DSS compliant payment partner; AgriLink does not store full card numbers.
      </p>
      <p>
        <strong className="text-foreground">Your rights.</strong> You can edit your profile at any
        time, request a copy of your data, or ask us to delete your account by writing to
        support@agrilink.in.
      </p>
      <p>
        <strong className="text-foreground">Retention.</strong> Order and payment records are kept
        for seven years as required by tax law; other data is deleted within 90 days of account
        closure.
      </p>
    </ContentPage>
  ),
});
