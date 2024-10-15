
import React, { useState, useEffect } from 'react'
import { Card } from '../types/cardInterface'
import { useDrag, useDrop } from 'react-dnd';
import '../App.css'


interface DocumentCardProps {
  document: Card
  index: number
  moveCard: (dragIndex: number, hoverIndex: number) => void
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document, index, moveCard }) => {

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


  const [, ref] = useDrag({
    type: 'CARD',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'CARD',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveCard(item.index, index)
        item.index = index
      }
    },
  });

  return (
    <>
      <div className='card'>
        <div onClick={() => setShowImage(true)} ref={(node) => ref(drop(node))}>
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
