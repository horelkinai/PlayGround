import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SectionTitle } from "@/components/cards";
import { Button, Area } from "@/components/ui";
import { useI18n } from "@/lib/use-i18n";

export const Route = createFileRoute("/_app/support")({
  component: SupportPage,
});

function SupportPage() {
  const { t } = useI18n();
  const [msg, setMsg] = useState("");

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <SectionTitle>{t.supportTitle}</SectionTitle>
      <p className="leading-relaxed text-muted">{t.supportBody}</p>
      <Area
        placeholder={t.supportForm}
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <Button
        onClick={() => {
          if (!msg.trim()) return;
          setMsg("");
          toast.success(t.supportToast);
        }}
      >
        {t.submit}
      </Button>
    </div>
  );
}
