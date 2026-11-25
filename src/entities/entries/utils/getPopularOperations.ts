import { Entry, PopularOperation } from "@/shared/interfaces/entries";


export function getPopularOperations(
  entries: Entry[]
): PopularOperation[] {

  const operations = new Map<string, number>();

  // 1. Групуємо операції та підраховуємо кількість
  entries.forEach((entry) => {
    const name = entry.name.trim();

    if (!name) return;

    operations.set(
      name,
      (operations.get(name) ?? 0) + Number(entry.qty)
    );
  });

  // 2. Сортуємо та залишаємо 4 найпопулярніші
  const sorted = Array.from(operations, ([name, count]) => ({
    name,
    count,
  }))
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