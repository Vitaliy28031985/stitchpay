# StitchPay — FSD + Next.js App Router

Frontend-прототип StitchPay, упорядкований за принципами Feature-Sliced Design (FSD). Інтерфейс адаптивний для десктопа, планшета та мобільного телефона.

## Технології

- Next.js 15 / React 19 / TypeScript
- Tailwind CSS
- Recharts — графіки
- Supabase Auth — email/password та Google OAuth
- lucide-react — іконки

## Структура FSD

```text
src/
├── app/                         # Next.js App Router: маршрути, layout, глобальні стилі
│   ├── auth/callback/
│   ├── dashboard/
│   ├── operations/
│   ├── work/
│   ├── payments/
│   ├── analytics/
│   ├── settings/
│   ├── login/
│   ├── register/
│   ├── forgot-password/
│   └── update-password/
├── widgets/                     # Великі самостійні блоки інтерфейсу
│   ├── auth-layout/
│   ├── dashboard-layout/
│   ├── dashboard-overview/
│   └── section-placeholder/
├── features/                    # Користувацькі сценарії
│   └── auth/
│       ├── model/                # auth-service: сценарії Supabase Auth
│       └── ui/                   # форми входу, реєстрації, Google, відновлення
├── entities/                    # Бізнес-сутності та модельні дані
│   ├── user/
│   └── work/
└── shared/                      # Спільна інфраструктура, конфігурація та UI
    ├── api/supabase/
    ├── config/
    └── ui/
```

### Як читати шари

- **app** — тільки маршрути Next.js, кореневий layout і глобальна ініціалізація. Файли `page.tsx` залишені тонкими: вони збирають потрібні віджети та фічі для конкретного URL.
- **widgets** — композиції великих частин сторінок: оболонка авторизації, навігація кабінету, головна панель.
- **features** — дії користувача: вхід, реєстрація, вихід, Google OAuth, відновлення та зміна пароля.
- **entities** — предметні дані й моделі: користувач та робоча статистика.
- **shared** — перевикористовувані модулі без бізнес-логіки: Supabase-клієнт, конфігурація меню, бренд-компонент.

> У Next.js App Router каталог `src/app` зарезервований системою маршрутизації. Тому файли маршруту одночасно є точками композиції сторінок; окремий FSD `pages` layer не створюється, щоб не конфліктувати з Next.js Pages Router. Решта коду чітко розділена за FSD-шарами.

## Правила залежностей

Дозволений напрямок залежностей — згори вниз:

```text
app → pages/composition → widgets → features → entities → shared
```

У цій інтеграції Next.js-композиція виконується в `src/app`. Не імпортуйте модулі з нижчих шарів у вищі та уникайте імпорту між різними slice одного шару. Для зовнішнього використання використовуйте публічні `index.ts` файли, коли модулі стануть більшими.

## Запуск

Потрібен Node.js 20 або новіший.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Потім відкрийте http://localhost:3000.

Для перевірки TypeScript:

```bash
npm run lint
```

## Supabase Auth

1. Створіть проєкт у Supabase.
2. У Project Settings → API скопіюйте Project URL та anon/public key у `.env.local`.
3. У Supabase → Authentication → URL Configuration задайте Site URL (наприклад, `http://localhost:3000`) та Redirect URL `http://localhost:3000/auth/callback`.
4. Для Google: Authentication → Providers → Google → увімкніть провайдера, додайте Google OAuth Client ID та Client Secret з Google Cloud Console. У Google Cloud додайте Authorized redirect URI, який показує Supabase.
5. Перезапустіть dev-сервер після зміни `.env.local`.

Без конфігурації Supabase сторінки інтерфейсу відкриваються, але реальна авторизація не працює.

## Маршрути

- `/login` — вхід через email/password або Google
- `/register` — реєстрація
- `/forgot-password` — запит на відновлення пароля
- `/update-password` — встановлення нового пароля
- `/auth/callback` — завершення OAuth / email callback
- `/dashboard` — головна панель з демонстраційною статистикою
- `/operations`, `/work`, `/payments`, `/analytics`, `/settings` — наразі адаптивні placeholder-розділи для подальшої реалізації

## Примітки для production

Це frontend-прототип. Виклики Supabase Auth підключені, але потребують реальних ключів і налаштування OAuth-провайдера. Для production варто додати серверну перевірку сесії та захист приватних маршрутів через `@supabase/ssr`, а також таблиці, `user_id` і політики Row Level Security (RLS). Основні сторінки розділів наразі ще не мають повної CRUD-бізнес-логіки.
