import React, { useMemo } from 'react'
import seedrandom from 'seedrandom'
import { ColoredWord } from '../ColoredWord'
import type { ColoredWordPart } from '../ColoredWord'

const HTML_COLORS = [
  'green',
  'blue',
  'orange',
  'purple',
  'pink',
  'brown',
  'gray',
  'magenta',
  'teal',
]

export interface RandomlyColoredWordProps {
  text: string
}

const numberInRange = (min: number, max: number, randomNumber: number) =>
  Math.floor(randomNumber * (max - min + 1)) + min

const generateParts = (text: string): Array<ColoredWordPart> => {
  const random = seedrandom(text)

  const parts: Array<ColoredWordPart> = []
  let resultString = ''

  while (resultString.length < text.length) {
    const maxAddedLength = text.length - resultString.length
    const addedLength = numberInRange(1, Math.min(maxAddedLength, 8), random())

    const colorIndex = numberInRange(0, HTML_COLORS.length - 1, random())
    const color = HTML_COLORS[colorIndex]

    const startIndex = resultString.length
    const endIndex = startIndex + addedLength

    const addedText = text.substring(startIndex, endIndex)
    resultString += addedText

    parts.push({
      color,
      text: addedText,
    })
  }

  return parts
}

export const RandomlyColoredWord: React.FC<RandomlyColoredWordProps> = ({
  text,
}) => {
  const parts = useMemo(() => generateParts(text), [text])

  return <ColoredWord parts={parts} />
}
