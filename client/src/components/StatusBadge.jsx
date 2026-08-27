export default function StatusBadge({ status }) {
  const isCompleted = status === 'Completed'
  return (
    <span
      className={`status-badge ${
        isCompleted ? 'status-completed' : 'status-progress'
      }`}
    >
      {isCompleted ? '\u2713 ' : '\u25C9 '}
      {status}
    </span>
  )
}
