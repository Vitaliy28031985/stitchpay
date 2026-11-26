
import { Entry, PopularOperation } from "@/shared/interfaces/entries";

export function getPopularOperations(
  entries: Entry[]
): PopularOperation[] {

  const operations = new Map<
    string,
    { name: string; model: string; count: number }
  >();

  // 1. Групуємо операції за назвою та моделлю
  entries.forEach((entry) => {
    const name = entry.name.trim();
    const model = entry.model?.trim() ?? "";

    if (!name) return;

    const key = JSON.stringify([name, model]);

    const existing = operations.get(key);

    if (existing) {
      existing.count += Number(entry.qty);
    } else {
      operations.set(key, {
        name,
        model,
        count: Number(entry.qty),
      });
    }
  });

  // 2. Сортуємо та залишаємо 4 найпопулярніші
  const sorted = Array.from(operations.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  // 3. Розраховуємо progress
  const maxCount = sorted[0]?.count ?? 0;

  return sorted.map((item) => ({
    ...item,
    progress: maxCount > 0
      ? Math.round((item.count / maxCount) * 100)
      : 0,
  }));
}
