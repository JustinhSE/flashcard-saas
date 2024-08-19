'use client'

import { useUser } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Container, Grid, Card, CardActionArea, CardContent, Typography } from '@mui/material'
import { collection, doc, getDoc } from 'firebase/firestore'
import db from '@/utils/firebase'

interface FlashcardSet {
  name: string;
}

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([])
  const router = useRouter()

  useEffect(() => {
    async function getFlashcardSets() {
      if (!user) return
      const docRef = doc(collection(db, 'users'), user.id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const userData = docSnap.data()
        setFlashcardSets(userData.flashcardSets || [])
      }
    }
    getFlashcardSets()
  }, [user])

  const handleCardClick = (name: string) => {
    router.push(`/flashcard?id=${name}`)
  }

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        Your Flashcard Sets
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {flashcardSets.map((set, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(set.name)}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {set.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}