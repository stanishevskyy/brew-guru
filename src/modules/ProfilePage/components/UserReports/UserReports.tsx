import { useEffect, useState } from 'react';

import styles from './UserReports.module.scss';

import { useAppDispatch } from '../../../../store/hooks';
import { updateReportThunk } from '../../../../store/reportsSlice/reportsSlice';

import { timeAgo } from '../../../../shared/utils/timeAgo';

//eslint-disable-next-line
import CheckIcon from '../../../../assets/icons/reports-icons/check-mark-icon.svg';
//eslint-disable-next-line
import WarningIcon from '../../../../assets/icons/reports-icons/warning-icon.svg';
//eslint-disable-next-line
import ErrorIcon from '../../../../assets/icons/reports-icons/error-icon.svg';
import { ReportsSkeleton } from '../../../../shared/components/ReportsSkeleton';
import { UserReport } from '../../../../shared/types/user/user-reports.type';
import { ReportStatus } from '../../../../shared/constants/reportStatus';

type Props = {
  report: UserReport;
};

export const UserReports: React.FC<Props> = ({ report }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [updatedReport, setUpdatedReport] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  const getStatusProps = (status: string) => {
    switch (status) {
      case ReportStatus.Warning:
        return {
          icon: ErrorIcon,
          style: 'report__status-error',
          label: 'Warning',
        };
      case ReportStatus.UnderReview:
        return {
          icon: WarningIcon,
          style: 'report__status-warning',
          label: 'Under review',
        };
      case ReportStatus.Dismissed:
        return {
          icon: CheckIcon,
          style: 'report__status-check',
          label: 'Complaint Dismissed',
        };
      default:
        return {
          icon: ErrorIcon,
          style: 'report__status-error',
          label: 'Warning',
        };
    }
  };

  const reportedStatus = getStatusProps(report.status);

  const handleUpdateReport = async (reportId: number) => {
    setUpdatedReport(reportId);

    await dispatch(
      updateReportThunk({
        reportId,
        patch: { status: 'Under review' },
      }),
    );

    setUpdatedReport(null);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  return (
    <>
      {isLoading || updatedReport === report.id ? (
        <ReportsSkeleton />
      ) : (
        <article
          className={`${styles.report} ${styles[`${reportedStatus.style}-main`]}`}
          role="article"
          aria-labelledby="report1-title"
          aria-describedby="report1-desc"
        >
          <header className={styles.report__header}>
            <p id="report1-title" className={styles.report__title}>
              {report.cafeName}
            </p>

            <div className={styles.report__meta}>
              <time className={styles.report__date} dateTime="2026-02-16">
                {timeAgo(report.createdAt)}
              </time>

              <div
                className={`${styles.report__status} ${styles[reportedStatus.style]}`}
                aria-label="Error status"
              >
                <img
                  src={reportedStatus.icon}
                  alt=""
                  aria-hidden="true"
                  className={styles.report__statusIcon}
                />
                {reportedStatus.label}
              </div>
            </div>
          </header>

          <div id="report1-desc" className={styles.report__body}>
            <p className={styles.report__reviewText}>{report.comment}</p>

            <div className={styles.report__details}>
              <p className={styles.report__reason}>
                <span className={styles.report__label}>Report reason:</span>
                {report.reportReason}
              </p>

              <p className={styles.report__systemMessage}>
                <span className={styles.report__label}>System message:</span>
                {report.systemMessage}
              </p>
            </div>
          </div>

          {report.status === ReportStatus.Warning && (
            <footer className={styles.report__footer}>
              <div className={styles.report__actions}>
                <button
                  className={styles.report__actionBtnPrimary}
                  aria-label="Appeal report"
                  onClick={() => handleUpdateReport(report.id)}
                >
                  Appeal
                </button>
              </div>
            </footer>
          )}
        </article>
      )}
    </>
  );
};
