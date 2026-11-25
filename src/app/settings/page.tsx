import { DashboardLayout } from '@/widgets/dashboard-layout';
import { SectionPlaceholder } from '@/widgets/section-placeholder';

export default function SettingsPage() {
  return <DashboardLayout title="Налаштування">
    <SectionPlaceholder title="Налаштування" description="Керуйте профілем та параметрами облікового запису." />
  </DashboardLayout>;
}
