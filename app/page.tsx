'use client'

import { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Box, Container, Grid, Card, CardContent, CardActions } from '@mui/material'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import getStripe from '@/utils/get-stripe'

export default function Home() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const checkoutSession = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { origin: 'http://localhost:3000' },
      })
      const checkoutSessionJson = await checkoutSession.json()

      const stripe = await getStripe()
      const { error } = await stripe!.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      })

      if (error) {
        console.warn(error.message)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" component={Link} href="/sign-in">Login</Button>
            <Button color="inherit" component={Link} href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Flashcard SaaS
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            The easiest way to create flashcards from your text.
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2, mr: 2 }} component={Link} href="/generate">
            Get Started
          </Button>
          <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
            Learn More
          </Button>
        </Box>

        <Box sx={{ my: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
          <Grid container spacing={4}>
            {['AI-Powered Generation', 'Easy Organization', 'Study Analytics'].map((feature) => (
              <Grid item xs={12} sm={4} key={feature}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {feature}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Description of {feature}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ my: 6, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>Pricing</Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Free Plan
                  </Typography>
                  <Typography variant="h4" component="div">
                    $0/month
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Basic features
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Sign Up</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Pro Plan
                  </Typography>
                  <Typography variant="h4" component="div">
                    $10/month
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Advanced features
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Processing...' : 'Subscribe'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}