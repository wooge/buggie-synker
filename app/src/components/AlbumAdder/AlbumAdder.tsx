import React, { useEffect, useState } from 'react'
import './AlbumAdder.scss'
import { useCreateAlbum } from '@/hooks/requests/useCreateAlbum'
import { useAlbums } from '@/hooks/requests/useAlbums'

export const AlbumAdder: React.FC = () => {
  const {
    data: createdAlbum,
    isPending,
    mutate: createAlbum,
  } = useCreateAlbum()
  const { refetch: refetchAlbums } = useAlbums()

  const [inputValue, setInputValue] = useState('')

  const handleButtonClick = () => {
    createAlbum({
      albumUrl: inputValue,
    })

    setInputValue('')
  }

  // Refetching albums list when album has been created
  useEffect(() => {
    if (createdAlbum) refetchAlbums()
  }, [createdAlbum])

  return (
    <div className="album-adder">
      <input
        className="album-adder__input"
        disabled={isPending}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="Album url"
        value={inputValue}
      />
      <button
        className="album-adder__trigger"
        disabled={isPending || inputValue.length < 12}
        onClick={handleButtonClick}
      >
        Tilføj
      </button>
    </div>
  )
}
