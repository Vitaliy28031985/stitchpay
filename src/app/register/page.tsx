import { RegisterForm } from '@/features/auth';
import { AuthLayout } from '@/widgets/auth-layout';

export default function RegisterPage() {
  return <AuthLayout caption="Створіть акаунт">
    <p className="-mt-4 mb-6 text-sm text-slate-500">Почніть контролювати свій заробіток уже сьогодні.</p>
    <RegisterForm />
  </AuthLayout>;
}
