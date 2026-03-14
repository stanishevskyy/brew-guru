export type ReportStatus = 'Warning' | 'Under review' | 'Complaint Dismissed';

export type ReportTargetType = 'review' | 'reply';

export interface UserReport {
  id: number;

  cafeId: number;

  targetId: number;
  targetType: ReportTargetType;

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
