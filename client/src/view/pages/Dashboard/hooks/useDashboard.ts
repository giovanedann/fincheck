import { useContext } from 'react';
import { DashboardContext } from '../context';

export function useDashboard() {
  return useContext(DashboardContext)
}
