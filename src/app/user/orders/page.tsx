import { Suspense } from 'react';
import Orders from './components/order';
import Loading from '@/components/Loading'; // or any fallback UI
import StripeWrapper from '@/components/StripeWrapper';
export default function MapPageWrapper() {
  return (
    <Suspense fallback={<Loading />}>
      <StripeWrapper><Orders /></StripeWrapper>
    </Suspense>
  );
}
