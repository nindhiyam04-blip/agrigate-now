import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/ContentPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AgriLink — Farm to Dealer Marketplace" },
      {
        name: "description",
        content:
          "Why AgriLink exists: fair prices for farmers, reliable supply for dealers, steady work for drivers.",
      },
      { property: "og:title", content: "About AgriLink" },
      {
        property: "og:description",
        content: "A three-sided agri marketplace built for Indian supply chains.",
      },
    ],
  }),
  component: () => (
    <ContentPage
      eyebrow="About us"
      title="Cutting the distance between field and market"
      intro="AgriLink is a three-sided marketplace for farmers, dealers and transport drivers."
    >
      <p>
        Most of the value in Indian agriculture is lost between the field and the mandi. Farmers
        sell blind, dealers buy through layers of intermediaries, and trucks run half empty.
        AgriLink puts all three parties in one place: a farmer lists a crop, a dealer sees it with
        quantity, price and harvest date, and a driver picks up the load — with payments and ratings
        tracked end to end.
      </p>
      <p>
        <strong className="text-foreground">Our promise.</strong> Transparent pricing, verified
        identities, escrow-backed payments, and a product that works in Tamil as fluently as in
        English, on the cheapest Android phone as well as on a desktop.
      </p>
      <p>
        <strong className="text-foreground">What&apos;s next.</strong> Mandi price prediction, crop
        insurance partners, and warehouse-linked settlement so a farmer never has to sell at a
        distress price again.
      </p>
    </ContentPage>
  ),
});
