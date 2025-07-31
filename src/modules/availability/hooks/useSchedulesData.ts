import { Schedule } from '../schemas';

export function useSchedulesData(initialData: Schedule[]) {
  return {
    data: initialData,
    loading: false,
    error: null,
  };
}
