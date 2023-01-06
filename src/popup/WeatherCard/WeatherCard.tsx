import React, { useState, useEffect } from 'react'
import {
  fetchOpenWeatherData,
  OpenWeatherData,
  OpenWeatherTempScale,
} from '../../utils/api'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
} from '@mui/material'

const WeatherCardContainer: React.FC<{
  children: React.ReactNode
  onDelete?: () => void
}> = ({ children, onDelete }) => {
  return (
    <Box sx={{ mx: 1, my: 2 }}>
      <Card>
        <CardContent>{children}</CardContent>
        <CardActions>
          {onDelete && <Button onClick={onDelete}>Delete</Button>}
        </CardActions>
      </Card>
    </Box>
  )
}

type weatherCardState = 'loading' | 'error' | 'ready'

const WeatherCard: React.FC<{
  city: string
  tempScale: OpenWeatherTempScale
  onDelete?: () => void
}> = ({ city, tempScale, onDelete }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
  const [cardState, setCardState] = useState<weatherCardState>('loading')
  useEffect(() => {
    fetchOpenWeatherData(city, tempScale)
      .then((data) => {
        setWeatherData(data)
        setCardState('ready')
      })
      .catch((err) => setCardState('error'))
  }, [city, tempScale])

  if (['loading', 'error'].includes(cardState)) {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography variant="body1">
          {cardState === 'loading'
            ? 'Loading....'
            : 'Error: could not retrieve weather data for this city'}
        </Typography>
      </WeatherCardContainer>
    )
  }
  return (
    <WeatherCardContainer onDelete={onDelete}>
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
