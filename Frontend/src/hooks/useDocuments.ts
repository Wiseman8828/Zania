import { useEffect, useState } from 'react';
import { Card } from '../types/cardInterface';

const API_URL = 'http://localhost:5173/api/documents';


export const useDocuments = () => {
    const [documents, setDocuments] = useState<Card[]>([])
    const [isSaving, setIsSaving] = useState<boolean>(false)
    const [hasChanges, setHasChanges] = useState<boolean>(false)

    const fetchDocuments = async () => {
        try {
            const response = await fetch(API_URL)
            const data: Card[] = await response.json()
            setDocuments(data)
        } catch (error) {
            console.error('Error fetching documents:', error)
        }
    }

    const saveDocuments = async () => {
        if (!hasChanges) return
        try {
            await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({document: documents}),
            })
            localStorage.setItem('documents', JSON.stringify(documents))
            setDocuments(documents)
            setHasChanges(false)
        } catch (error) {
            setIsSaving(false)
            console.error('Error saving documents:', error)
        } finally {
            setIsSaving(false)
        }
    }

    useEffect(() => {
        fetchDocuments();
    }, [])

    useEffect(() => {
        if(hasChanges){
            setIsSaving(true)
        }
        const saveInterval = setInterval(() => {
            if (hasChanges) {
                saveDocuments()
            }
        }, 3000)
        return () => clearInterval(saveInterval)
    }, [hasChanges])

    return {
        documents,
        setDocuments,
        isSaving,
        setHasChanges,
        hasChanges
    }
};
