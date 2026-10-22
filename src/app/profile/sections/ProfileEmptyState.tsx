import { EmptyStateMessage } from "@/components/page/EmptyStateMessage";
import type { AppDictionary } from "@/lib/i18n";

type ProfileEmptyStateProps = {
  dictionary: AppDictionary;
};

export function ProfileEmptyState({ dictionary }: ProfileEmptyStateProps) {
  return (
    <main className="mx-auto flex w-full flex-1 flex-col">
      <EmptyStateMessage
        title={dictionary.profilePage.publicProfile}
        message={dictionary.profilePage.unavailable}
      />
    </main>
  );
}