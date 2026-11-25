import CreateOperation from '@/features/operations/CreateOperatin';
import OperationList from '@/features/operations/OperationList';
import { DashboardLayout } from '@/widgets/dashboard-layout';
import { SectionPlaceholder } from '@/widgets/section-placeholder';

export default function OperationsPage() {
  return <DashboardLayout title="Мої операції">
    <SectionPlaceholder title="Мої операції" description="Каталог ваших операцій та ціни за одиницю." >
       <div className="mt-2 grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.8fr)]">
        <OperationList/>
        <CreateOperation />
      </div>
</SectionPlaceholder>
  </DashboardLayout>;
}
