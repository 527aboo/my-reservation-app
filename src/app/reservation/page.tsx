import { nextAuthOptions } from '@/lib/next-auth/option';
import { User } from '@/types/type';
import { getServerSession } from 'next-auth';
import React from 'react'
import ReservationForm from '../components/reservation/ReservationForm';

const Reservation = async () => {

  const session = await getServerSession(nextAuthOptions);
  const user: User = session?.user as User;

  return (
      <ReservationForm user={user} />
  )
}

export default Reservation