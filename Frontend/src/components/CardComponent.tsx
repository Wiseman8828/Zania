
import React, { useState, useEffect } from 'react'
import { Card } from '../types/cardInterface'
import '../App.css'


interface DocumentCardProps {
  document: Card
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {

  const [isLoading, setIsLoading] = useState(true)
  const [showImage, setShowImage] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])


  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowImage(false)
      }
    }

    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc);
    }
  }, [setShowImage])

  return (
    <>
      <div className='card'>
        <div onClick={() => setShowImage(true)}>
          {isLoading ? (
            <div className='loader'>Loading...</div>
          ) : (
            <img className='image-no-overlay' src={document.imageSrc} alt={document.title} width="100%" />
          )}
          <h4>{document.title}</h4>
        </div>
      </div>

      {showImage && (

        <div className='overlay-container' onClick={() => setShowImage(false)}>
          <img className='img-overlay' src={document.imageSrc} alt={document.title} />
        </div>
      )}
    </>
  )
}

export default DocumentCard
