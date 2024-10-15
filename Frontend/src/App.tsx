import React, { useState, useEffect } from 'react'
import DocumentCard from './components/CardComponent'
import { Card } from './types/cardInterface'
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import { documents } from './Data/documents.json'

const App: React.FC = () => {
  const [documentList, setDocumentList] = useState<Card[]>([])

  useEffect(() => {
    setDocumentList(documents)
  }, [])


  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const updatedList = [...documentList]
    const [removed] = updatedList.splice(dragIndex, 1)
    updatedList.splice(hoverIndex, 0, removed)
    setDocumentList(updatedList)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="CardContainer">
        {documentList.map((doc, index) => (
          <DocumentCard key={doc.position} document={doc} index={index}
          moveCard={moveCard} />
        ))}
      </div>
    </DndProvider>
  )
}

export default App
