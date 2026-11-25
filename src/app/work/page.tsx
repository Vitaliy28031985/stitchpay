import CreateWork from '@/features/work/CreateWorc';
import WorksList from '@/features/work/WorksList';
import { DashboardLayout } from '@/widgets/dashboard-layout';
import { SectionPlaceholder } from '@/widgets/section-placeholder';

export default function WorkPage() {
  return <DashboardLayout title="Облік роботи">
    <SectionPlaceholder title="Облік роботи" description="Додавайте виконані операції та фіксуйте кількість за кожен день." >
      <CreateWork />
      <WorksList/>
    </SectionPlaceholder>
  </DashboardLayout>;
}
