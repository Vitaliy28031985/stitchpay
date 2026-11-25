import CreatePayments from '@/features/payments/CreatePayments';
import PaymentsList from '@/features/payments/PaymentList';
import Report from '@/features/payments/Report';
import { DashboardLayout } from '@/widgets/dashboard-layout';
import { SectionPlaceholder } from '@/widgets/section-placeholder';

export default function PaymentsPage() {
  return <DashboardLayout title="Мої виплати">
    <SectionPlaceholder title="Мої виплати" description="Переглядайте аванси, зарплати та залишок до виплати." >
     
      <div className="grid gap-3 sm:grid-cols-3">
       <Report/>
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]">
        <PaymentsList/>
        <CreatePayments />
      </div>
    </SectionPlaceholder>
  </DashboardLayout>;
}
