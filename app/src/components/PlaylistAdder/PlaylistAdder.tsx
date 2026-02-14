import React, { useEffect, useMemo, useState } from 'react'
import './PlaylistAdder.scss'
import { useCreatePlaylist } from '@/hooks/requests/useCreatePlaylist'
import { usePlaylists } from '@/hooks/requests/usePlaylists'

export const PlaylistAdder: React.FC = () => {
  const {
    data: createdPlaylist,
    isPending,
    mutate: createPlaylist,
  } = useCreatePlaylist()

  const { refetch: refetchPlaylists } = usePlaylists()

  const [playlistName, setPlaylistName] = useState('')
  const [playlistUrl, setPlaylistUrl] = useState('')

  const handleButtonClick = () => {
    createPlaylist({
      playlistName,
      playlistUrl,
    })

    setPlaylistName('')
    setPlaylistUrl('')
  }

  // Refetching playlists list when playlist has been created
  useEffect(() => {
    if (createdPlaylist) refetchPlaylists()
  }, [createdPlaylist])

  const inputValid = useMemo(
    () => !isPending && playlistUrl.length >= 12 && playlistName.length >= 3,
    [isPending, playlistUrl, playlistName],
  )

  return (
    <div className="playlist-adder">
      <input
        className="playlist-adder__input"
        disabled={isPending}
        onChange={(event) => setPlaylistName(event.target.value)}
        placeholder="Playlist name"
        value={playlistName}
      />
      <input
        className="playlist-adder__input"
        disabled={isPending}
        onChange={(event) => setPlaylistUrl(event.target.value)}
        placeholder="Playlist url"
        value={playlistUrl}
      />
      <button
        className="playlist-adder__trigger"
        disabled={!inputValid}
        onClick={handleButtonClick}
      >
        Tilføj
      </button>
    </div>
  )
}
