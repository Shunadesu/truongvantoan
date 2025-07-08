import React from 'react'

const StatusBadge = ({ status }) => {
  const isAvailable = status === 'Còn'
  
  
  const statusClasses = isAvailable
    ? ` text-green-800 font-bold`
    : ` text-red-600 font-bold`
  
  const statusText = isAvailable ? '🟢 Còn' : '🔴 Đã bán'
  
  return (
    <span className={statusClasses}>
      {statusText}
    </span>
  )
}

export default StatusBadge 