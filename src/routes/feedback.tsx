import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContentPage } from "@/components/ContentPage";
import { Field } from "@/components/ui-kit";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Feedback — AgriLink" },
      { name: "description", content: "Tell the AgriLink team what works, what breaks and what you need next." },
      { property: "og:title", content: "Feedback — AgriLink" },
      { property: "og:description", content: "Share your experience and rate the marketplace." },
    ],
  }),
  component: Feedback,
});

function Feedback() {
  const [stars, setStars] = useState(5);
  return (
    <ContentPage eyebrow="Feedback" title="Tell us how AgriLink is working for you" intro="Every review is read by the product team.">
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">Your rating</p>
          <div className="flex gap-1 text-3xl">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} onClick={() => setStars(n)} aria-label={`${n} stars`} className="transition-transform hover:scale-110">
                <span className={n <= stars ? "text-harvest" : "text-muted-foreground/40"}>★</span>
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name"><Input className="rounded-xl" placeholder="Your name" /></Field>
          <Field label="Role"><Input className="rounded-xl" placeholder="Farmer / Dealer / Driver" /></Field>
        </div>
        <Field label="Your feedback">
          <Textarea className="min-h-32 rounded-xl" placeholder="What should we improve?" />
        </Field>
        <Button className="rounded-full gradient-primary text-primary-foreground" onClick={() => toast.success("Thanks — feedback submitted")}>
          Submit feedback
        </Button>
      </div>
    </ContentPage>
  );
}
