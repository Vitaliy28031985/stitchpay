import { UpdatePasswordForm } from '@/features/auth';
import { AuthLayout } from '@/widgets/auth-layout';

export default function UpdatePasswordPage() {
  return <AuthLayout caption="Новий пароль"><UpdatePasswordForm /></AuthLayout>;
}
