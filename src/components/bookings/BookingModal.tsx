import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Calendar } from 'lucide-react';
import { useParticipantStore } from '../../store/participants';
import { useAdvisorStore } from '../../store/advisors';
import { ParticipantStatus } from '../../types/participant';
import { cn } from '../../lib/utils';

// ... rest of the imports and schema ...

export default function BookingModal({ participantId, onClose }: BookingModalProps) {
  // ... existing state and form setup ...

  const onSubmit = async (data: BookingForm) => {
    try {
      // Update participant status to AUDIT_SCHEDULED instead of BOOKED
      await updateParticipantStatus(participantId, ParticipantStatus.AUDIT_SCHEDULED);
      
      // In a real app, we would:
      // 1. Create the booking in the database
      // 2. Send confirmation emails to participant and advisor
      // 3. Update the advisor's availability
      // 4. Create calendar invites
      
      onClose();
    } catch (error) {
      console.error('Failed to create booking:', error);
    }
  };

  // ... rest of the component code ...
}