import React, { useState, useEffect } from 'react'
import { fetchOpenWeatherData, OpenWeatherData } from '../../utils/api'
import { Card, CardContent, Typography, Box } from '@mui/material'

const WeatherCardContainer: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <Box sx={{ mx: 1, my: 2 }}>
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  )
}

type weatherCardState = 'loading' | 'error' | 'ready'

const WeatherCard: React.FC<{ city: string }> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
  const [cardState, setCardState] = useState<weatherCardState>('loading')
  useEffect(() => {
    fetchOpenWeatherData(city)
      .then((data) => {
        setWeatherData(data)
        setCardState('ready')
      })
      .catch((err) => setCardState('error'))
  }, [city])

  if (['loading', 'error'].includes(cardState)) {
    return (
      <WeatherCardContainer>
        <Typography variant="body1">
          {cardState === 'loading'
            ? 'Loading....'
            : 'Error: could not retrieve weather data for this city'}
        </Typography>
      </WeatherCardContainer>
    )
  }
  return (
    <WeatherCardContainer>
      <Typography variant="h5">{city}</Typography>
      <Typography variant="body1">
        {Math.round(weatherData.main.temp)}
      </Typography>
      <Typography variant="body1">
        Feels like: {Math.round(weatherData.main.feels_like)}
      </Typography>
    </WeatherCardContainer>
  )
}

export default WeatherCard
