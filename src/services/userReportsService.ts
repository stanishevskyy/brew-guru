import { UserReport } from '../shared/types/user/user-reports.type';
import { reportsService } from './reportsService';

export const userReportsService = {
  getUserReports: async (userId: number): Promise<UserReport[]> => {
    try {
      const settings = await reportsService.getReports();

      return settings.filter(r => r.reportedUserId === userId);
    } catch {
      throw new Error('Failed load users settings');
    }
  },
  updateUserReports: async (
    reportId: number,
    patch: Partial<UserReport>,
  ): Promise<UserReport> => {
    try {
      const reports = await reportsService.getReports();

      let updatedReport: UserReport | null = null;

      const updated = reports.map(report => {
        if (report.id === reportId) {
          updatedReport = { ...report, ...patch };

          return updatedReport;
        }

        return report;
      });

      localStorage.setItem('reports', JSON.stringify(updated));

      if (!updatedReport) {
        throw new Error('Report not found');
      }

      return updatedReport;
    } catch {
      throw new Error('Failed to update user report');
    }
  },
};
