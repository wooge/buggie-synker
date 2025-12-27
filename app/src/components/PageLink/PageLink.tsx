import React from 'react'
import './PageLink.scss'

type SizeOption = 'small' | 'medium' | 'large'

interface PageLinkPartProps {
  color?: string
  text: string
}

export interface PageLinkProps {
  className?: string
  parts: Array<PageLinkPartProps>
  size?: SizeOption
}

const buildSpanFromPart = ({ color = 'white', text }: PageLinkPartProps) => {
  return (
    <span key={text} style={{ color }}>
      {text}
    </span>
  )
}

export const PageLink: React.FC<PageLinkProps> = ({
  className,
  parts,
  size = 'medium',
}) => {
  const sizeClassAddition = `pagelink--${size}`
  const attachedClassAddition = className ? ` ${className}` : ''
  const classAddition = ` ${sizeClassAddition}${attachedClassAddition}`

  return (
    <button className={`pagelink${classAddition}`}>
      {parts.map(buildSpanFromPart)}
    </button>
  )
}
