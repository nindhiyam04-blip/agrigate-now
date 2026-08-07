import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContentPage } from "@/components/ContentPage";
import { Field } from "@/components/ui-kit";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact AgriLink — Support for farmers, dealers and drivers" },
      {
        name: "description",
        content: "Reach the AgriLink support desk by phone, email or the contact form.",
      },
      { property: "og:title", content: "Contact AgriLink" },
      { property: "og:description", content: "Support in Tamil and English, 7 am to 9 pm." },
    ],
  }),
  component: () => (
    <ContentPage
      eyebrow="Contact us"
      title="We answer in Tamil and English"
      intro="Support desk open 7:00 am – 9:00 pm, all days."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Phone, label: "Helpline", value: "1800 200 4567" },
          { icon: Mail, label: "Email", value: "support@agrilink.in" },
          { icon: MapPin, label: "Office", value: "Anna Salai, Chennai 600002" },
        ].map((c) => (
          <div key={c.label} className="rounded-2xl bg-muted/50 p-4">
            <c.icon className="size-5 text-primary" />
            <p className="mt-2 text-xs uppercase tracking-wide">{c.label}</p>
            <p className="text-sm font-semibold text-foreground">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name">
          <Input className="rounded-xl" placeholder="Your name" />
        </Field>
        <Field label="Mobile">
          <Input className="rounded-xl" placeholder="+91 98400 00000" />
        </Field>
      </div>
      <Field label="Message">
        <Textarea className="min-h-32 rounded-xl" placeholder="How can we help?" />
      </Field>
      <Button
        className="rounded-full gradient-primary text-primary-foreground"
        onClick={() => toast.success("Message sent — we'll call you back")}
      >
        Send message
      </Button>
    </ContentPage>
  ),
});
