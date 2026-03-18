export type ReportStatus = 'Warning' | 'Under review' | 'Complaint Dismissed';

export interface UserReport {
  id: number;

  targetId: number;
  cafeName: string;
  reportedUserId: number;
  reportedBy: {
    id: number;
    firstName: string;
    lastName: string;
  };

  createdAt: string;
  comment: string;
  reportReason: 'Spam';
  systemMessage: string;
  status: ReportStatus;
}
