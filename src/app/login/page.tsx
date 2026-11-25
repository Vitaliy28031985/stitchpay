import { LoginForm } from '@/features/auth';
import { AuthLayout } from '@/widgets/auth-layout';

export default function LoginPage() {
  return <AuthLayout caption="Раді вас бачити!">
    <p className="-mt-4 mb-6 text-sm text-slate-500">Увійдіть, щоб продовжити вести облік своєї роботи.</p>
    <LoginForm />
  </AuthLayout>;
}
