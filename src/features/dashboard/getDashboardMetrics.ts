import type { Entry } from "@/shared/interfaces/entries";
import type { Payment } from "@/shared/interfaces/payments";

export interface DashboardMetric {
  label: string;
  value: string;
  trend: string;
  tone: string;
}

export function getDashboardMetrics(
  entries: Entry[],
  payments: Payment[]
): DashboardMetric[] {

  // 1. Визначаємо поточний та попередній місяць
  const now = new Date();

  const currentMonth = 
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const previousDate = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1
  );

  const previousMonth =
    `${previousDate.getFullYear()}-${String(previousDate.getMonth() + 1).padStart(2, "0")}`;

  // 2. Фільтруємо записи за місяцями
  const currentEntries = entries.filter(
    (item) => item.date.startsWith(currentMonth)
  );

  const previousEntries = entries.filter(
    (item) => item.date.startsWith(previousMonth)
  );

  const currentPayments = payments.filter(
    (item) => item.date.startsWith(currentMonth)
  );

  const previousPayments = payments.filter(
    (item) => item.date.startsWith(previousMonth)
  );

  // 3. Функції підрахунку
  const sum = (items: { result?: number; amount?: number }[], key: "result" | "amount") =>
    items.reduce(
      (total, item) => total + Number(item[key] ?? 0),
      0
    );

  const earned = sum(currentEntries, "result");
  const previousEarned = sum(previousEntries, "result");

  const paid = sum(currentPayments, "amount");
  const previousPaid = sum(previousPayments, "amount");

  // 4. Загальний залишок до виплати за весь час
  const totalEarned = sum(entries, "result");
  const totalPaid = sum(payments, "amount");

  const toPay = totalEarned - totalPaid;

  // 5. Кількість виконаних робіт за поточний місяць
  const operationsCount = currentEntries.reduce(
    (total, item) => total + Number(item.qty),
    0
  );

  // 6. Розрахунок відсотка зміни
  const getTrend = (current: number, previous: number) => {
    if (previous === 0) return "";

    const percent = Math.round(
      ((current - previous) / previous) * 100
    );

    return `${percent > 0 ? "+" : ""}${percent}%`;
  };

  // 7. Форматування грошей
  const formatMoney = (value: number) =>
    `${value.toLocaleString("uk-UA", {
      maximumFractionDigits: 2,
    })} ₴`;

  // 8. Формуємо готовий масив
  return [
    {
      label: "Зароблено",
      value: formatMoney(earned),
      trend: getTrend(earned, previousEarned),
      tone: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Виплачено",
      value: formatMoney(paid),
      trend: getTrend(paid, previousPaid),
      tone: "bg-blue-50 text-blue-600",
    },
    {
      label: "До виплати",
      value: formatMoney(toPay),
      trend: "",
      tone: "bg-orange-50 text-orange-600",
    },
    {
      label: "Виконано операцій",
      value: operationsCount.toLocaleString("uk-UA"),
      trend: "",
      tone: "bg-violet-50 text-violet-600",
    },
  ];
}