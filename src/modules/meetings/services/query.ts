import { clientApiWithAuth } from '@/shared/lib/client-api';

export async function fetchMeetings(query: {
  period: string;
  startDate?: string;
  endDate?: string;
}) {
  return clientApiWithAuth('@get/meetings', { params: query });
}
