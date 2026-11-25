import { ForgotPasswordForm } from '@/features/auth';
import { AuthLayout } from '@/widgets/auth-layout';

export default function ForgotPasswordPage() {
  return <AuthLayout caption="Відновлення пароля"><ForgotPasswordForm /></AuthLayout>;
}
