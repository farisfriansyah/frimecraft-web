import { EmptyStateMessage } from "@/components/page/EmptyStateMessage";
import type { AppDictionary } from "@/lib/i18n";

type ProfileEmptyStateProps = {
  dictionary: AppDictionary;
};

export function ProfileEmptyState({ dictionary }: ProfileEmptyStateProps) {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-12 md:py-16">
      <EmptyStateMessage
        title={dictionary.profilePage.publicProfile}
        message={dictionary.profilePage.unavailable}
      />
    </main>
  );
}