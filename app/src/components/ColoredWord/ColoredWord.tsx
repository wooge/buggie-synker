import React from 'react'
import './ColoredWord.scss'

export interface ColoredWordPart {
  color?: string
  text: string
}

export interface ColoredWordProps {
  parts: Array<ColoredWordPart>
}

const buildSpanFromPart = ({ color = 'white', text }: ColoredWordPart) => {
  return (
    <span key={text} style={{ color }}>
      {text}
    </span>
  )
}

export const ColoredWord: React.FC<ColoredWordProps> = ({ parts }) => {
  return <span className="colored-word">{parts.map(buildSpanFromPart)}</span>
}
