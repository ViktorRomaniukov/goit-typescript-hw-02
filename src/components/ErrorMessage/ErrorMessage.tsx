import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={styles.error}>
      <p>{message || 'Something went wrong. Please try again later.'}</p>
    </div>
  );
}