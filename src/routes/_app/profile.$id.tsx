import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { RatingMark } from "@/components/badges";
import { Button, Area, Chip } from "@/components/ui";
import { reviewsByProfile } from "@/lib/demo-data";
import { useProfile } from "@/lib/profiles-catalog";
import { InstagramProfile } from "@/components/ig-profile";
import { useI18n } from "@/lib/use-i18n";
import { useAppStore } from "@/lib/store";
import type { Impression } from "@/lib/types";

export const Route = createFileRoute("/_app/profile/$id")({
  component: ProfilePage,
});

function ProfilePage() {
  const { id } = Route.useParams();
  const { t } = useI18n();
  const profile = useProfile(id);
  const blocked = useAppStore((s) => s.blocked.includes(id));
  const addReview = useAppStore((s) => s.addReview);
  const addReport = useAppStore((s) => s.addReport);
  const extraReviews = useAppStore((s) => s.extraReviews);
  const canInteract = useAppStore((s) => s.canInteract());

  const [showReview, setShowReview] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [rating, setRating] = useState(5);
  const [impression, setImpression] = useState<Impression>("professional");
  const [reviewText, setReviewText] = useState("");
  const [reportReason, setReportReason] = useState("rOther");
  const [reportNote, setReportNote] = useState("");

  if (!profile) {
    return <p className="py-20 text-center text-muted">{t.empty}</p>;
  }

  if (profile.status === "paused" || blocked) {
    return (
      <div className="mx-auto max-w-md space-y-4 py-16 text-center">
        <h1 className="font-display text-2xl text-cream">{t.paused}</h1>
        <p className="text-muted">{t.pausedHint}</p>
        <Link to="/directory">
          <Button variant="line">{t.navDir}</Button>
        </Link>
      </div>
    );
  }

  const reviews = [
    ...reviewsByProfile(id),
    ...extraReviews.filter((r) => r.profileId === id),
  ];

  const impressions: { id: Impression; label: string }[] = [
    { id: "professional", label: t.impProfessional },
    { id: "punctual", label: t.impPunctual },
    { id: "respectful", label: t.impRespectful },
    { id: "clear", label: t.impClear },
    { id: "would_recommend", label: t.impRecommend },
  ];

  const reportReasons = [
    "rThreats",
    "rBlackmail",
    "rInsults",
    "rPhone",
    "rAddress",
    "rDocs",
    "rPrivate",
    "rDoxxing",
    "rAccusations",
    "rIllegal",
    "rSexual",
    "rOther",
  ] as const;

  const reviewsPane = (
    <div className="space-y-4 p-3">
      {canInteract ? <Button onClick={() => setShowReview(true)}>{t.writeReview}</Button> : null}
      <p className="text-xs text-subtle">{t.reviewHint}</p>
      {reviews.length === 0 ? (
        <p className="text-muted">{t.empty}</p>
      ) : (
        reviews.map((r) => (
          <article key={r.id} className="rounded-xl border border-line bg-surface p-4">
            <div className="flex items-center justify-between gap-2">
              <RatingMark value={r.rating} />
              <span className="text-xs text-subtle">{r.created}</span>
            </div>
            <p className="mt-2 text-sm">{r.text || "—"}</p>
            {"status" in r && r.status === "pending" && (
              <p className="mt-1 text-xs text-vip">{t.reviewPending}</p>
            )}
            {r.reply && (
              <p className="mt-2 border-t border-line pt-2 text-sm text-muted">
                {t.ownerReply}: {r.reply}
              </p>
            )}
          </article>
        ))
      )}
    </div>
  );

  return (
    <div>
      <InstagramProfile profile={profile} onReport={() => setShowReport(true)}>
        {reviewsPane}
      </InstagramProfile>

      {showReview && (
        <div className="fixed inset-0 z-50 grid place-items-end bg-black/60 p-4 sm:place-items-center">
          <div className="w-full max-w-md space-y-4 rounded-2xl border border-line bg-surface p-5">
            <h2 className="font-display text-xl text-cream">{t.writeReview}</h2>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <Chip key={n} active={rating === n} onClick={() => setRating(n)}>
                  {n}
                </Chip>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {impressions.map((i) => (
                <Chip
                  key={i.id}
                  active={impression === i.id}
                  onClick={() => setImpression(i.id)}
                >
                  {i.label}
                </Chip>
              ))}
            </div>
            <Area
              placeholder={t.reviewText}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <div className="flex gap-2">
              <Button variant="line" onClick={() => setShowReview(false)}>
                {t.cancel}
              </Button>
              <Button
                onClick={() => {
                  addReview(id, rating, impression, reviewText);
                  setShowReview(false);
                  setReviewText("");
                  toast.success(t.reviewToast);
                }}
              >
                {t.submit}
              </Button>
            </div>
          </div>
        </div>
      )}

      {showReport && (
        <div className="fixed inset-0 z-50 grid place-items-end bg-black/60 p-4 sm:place-items-center">
          <div className="w-full max-w-md space-y-4 rounded-2xl border border-line bg-surface p-5">
            <h2 className="font-display text-xl text-cream">{t.reportTitle}</h2>
            <div className="flex max-h-40 flex-wrap gap-2 overflow-y-auto">
              {reportReasons.map((r) => (
                <Chip key={r} active={reportReason === r} onClick={() => setReportReason(r)}>
                  {t[r]}
                </Chip>
              ))}
            </div>
            <Area
              placeholder={t.reportNote}
              value={reportNote}
              onChange={(e) => setReportNote(e.target.value)}
            />
            <div className="flex gap-2">
              <Button variant="line" onClick={() => setShowReport(false)}>
                {t.cancel}
              </Button>
              <Button
                onClick={() => {
                  addReport(id, reportReason, reportNote);
                  setShowReport(false);
                  setReportNote("");
                  toast.success(t.reportToast);
                }}
              >
                {t.submit}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
