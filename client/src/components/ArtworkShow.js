import React from 'react'
import { useParams } from 'react-router-dom'

const ArtworkShow = () => {

  const params = useParams()
  console.log('params ->', params)
  return (
    <div>
      <p>ArtworkShow</p>
    </div>
  )
}

export default ArtworkShow
