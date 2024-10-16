import React, { useState, useEffect } from 'react'
import DocumentCard from './components/CardComponent'
import { Card } from './types/cardInterface'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import { documents } from './Data/documents.json'

const App: React.FC = () => {
  const [documentList, setDocumentList] = useState<Card[]>([])

  useEffect(() => {
    setDocumentList(documents)
  }, [])

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/documents');
      const data: Card[] = await response.json();
      console.log(data)
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  }

  useEffect(() => {
    fetchDocuments()
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
