import React from 'react'
import './JobList.scss'

interface JobListProps {
  children: React.ReactNode
}

export const JobList: React.FC<JobListProps> = ({ children }) => {
  return <div className="job-list">{children}</div>
}
