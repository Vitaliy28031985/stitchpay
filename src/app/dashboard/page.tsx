import { DashboardLayout } from '@/widgets/dashboard-layout';
import { DashboardOverview } from '@/widgets/dashboard-overview';

export default function DashboardPage() {
  return <DashboardLayout title="Головна">
    <DashboardOverview />
  </DashboardLayout>;
}
