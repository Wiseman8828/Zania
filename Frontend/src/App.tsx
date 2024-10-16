import React, { useState, useEffect } from 'react'
import DocumentCard from './components/CardComponent'
import { Card } from './types/cardInterface'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import { useDocuments } from './hooks/useDocuments';

const App: React.FC = () => {
  const [documentList, setDocumentList] = useState<Card[]>([])
  const { documents,
    setDocuments,
    isSaving,
    setHasChanges,
    hasChanges
  } = useDocuments()

  useEffect(() => {
    if(!hasChanges)
      setDocumentList(documents)
  }, [hasChanges])

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/documents');
      const data: Card[] = await response.json();
      setDocumentList(data)
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  }

  useEffect(() => {
    fetchDocuments()
  }, [])

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    try {
      const updatedList = [...documentList]
      const [removed] = updatedList.splice(dragIndex, 1)
      updatedList.splice(hoverIndex, 0, removed)
      updatedList.forEach((doc, index) => {
        doc.position = index
      })
      setHasChanges(true)
      setDocuments(updatedList)
    } catch (error) {
      setHasChanges(false)
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      {isSaving && ( <div className='loader'>Saving...</div> )}
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
