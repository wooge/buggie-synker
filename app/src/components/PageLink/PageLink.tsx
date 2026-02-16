import React from 'react'
import './PageLink.scss'
import { ColoredWord } from '../ColoredWord'
import type { ColoredWordProps } from '../ColoredWord'

type SizeOption = 'small' | 'medium' | 'large'

export interface PageLinkProps extends ColoredWordProps {
  className?: string
  size?: SizeOption
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
      <ColoredWord parts={parts} />
    </button>
  )
}
