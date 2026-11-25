import "server-only";

import { supabaseServer } from "@/shared/api/supabase/server";
import type { EarningsChartItem } from "@/shared/interfaces/reports";

export async function getEarningsChartData(): Promise<EarningsChartItem[]> {

  const supabase = await supabaseServer();

  // 1. Перевіряємо авторизацію
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Необхідно авторизуватися");
  }

  // 2. Назви місяців
  const monthNames = [
    "Січ", "Лют", "Бер", "Кві",
    "Тра", "Чер", "Лип", "Сер",
    "Вер", "Жов", "Лис", "Гру"
  ];

  // 3. Формуємо останні 6 місяців
  const now = new Date();

  const currentYear = now.getUTCFullYear();
  const currentMonth = now.getUTCMonth();

  const months = Array.from({ length: 6 }, (_, index) => {
    const monthDate = new Date(
      Date.UTC(currentYear, currentMonth - 5 + index, 1)
    );

    const year = monthDate.getUTCFullYear();
    const month = monthDate.getUTCMonth();

    return {
      key: `${year}-${String(month + 1).padStart(2, "0")}`,
      name: monthNames[month],
      earned: 0,
      paid: 0,
    };
  });

  // 4. Визначаємо часовий проміжок
  const startDate = `${months[0].key}-01`;

  const nextMonth = new Date(
    Date.UTC(currentYear, currentMonth + 1, 1)
  );

  const endDate = [
    nextMonth.getUTCFullYear(),
    String(nextMonth.getUTCMonth() + 1).padStart(2, "0"),
    "01",
  ].join("-");

  // 5. Отримуємо роботи та виплати паралельно
  const [entriesResult, paymentsResult] = await Promise.all([
    supabase
      .from("entries")
      .select("date, result")
      .eq("owner_id", user.id)
      .gte("date", startDate)
      .lt("date", endDate),

    supabase
      .from("payments")
      .select("date, amount")
      .eq("owner_id", user.id)
      .gte("date", startDate)
      .lt("date", endDate),
  ]);

  if (entriesResult.error) {
    throw new Error(entriesResult.error.message);
  }

  if (paymentsResult.error) {
    throw new Error(paymentsResult.error.message);
  }

  // 6. Створюємо Map для швидкого пошуку місяців
  const chartMap = new Map(
    months.map((month) => [month.key, month])
  );

  // 7. Підраховуємо заробіток
  for (const entry of entriesResult.data ?? []) {
    const monthKey = entry.date.slice(0, 7);

    const month = chartMap.get(monthKey);

    if (month) {
      month.earned += Number(entry.result ?? 0);
    }
  }

  // 8. Підраховуємо виплати
  for (const payment of paymentsResult.data ?? []) {
    const monthKey = payment.date.slice(0, 7);

    const month = chartMap.get(monthKey);

    if (month) {
      month.paid += Number(payment.amount ?? 0);
    }
  }

  // 9. Повертаємо готові дані
  return months.map(({ name, earned, paid }) => ({
    name,
    earned,
    paid,
  }));
}