import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Box, InputBase, IconButton, Paper, Grid } from '@mui/material'
import { Add } from '@mui/icons-material'
import './popup.css'
import WeatherCard from './WeatherCard/WeatherCard'
import {
  setStoredCities,
  getStoredCities,
  setStoredOptions,
  getStoredOptions,
  LocalStorageOptions,
} from '../utils/storage'

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([])
  const [cityName, setCityName] = useState<string>('')
  const [options, setOptions] = useState<LocalStorageOptions | null>(null)

  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities))
    getStoredOptions().then((options) => setOptions(options))
  })
  const handleCityButtonClick = () => {
    if (cityName === '') {
      return
    }
    const updatedCities = [...cities, cityName]
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities)
      setCityName('')
    })
  }
  const handleDeleteCity = (index: number) => {
    cities.splice(index, 1)
    const updatedCities = [...cities]
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities)
    })
  }

  const handleTempScaleButtonClick = () => {
    const updatedOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === 'metric' ? 'imperial' : 'metric',
    }
    setStoredOptions(updatedOptions).then(() => {
      setOptions(updatedOptions)
    })
  }
  if (!options) {
    return null
  }
  return (
    <Box>
      <Grid container>
        <Grid item>
          <Paper>
            <Box sx={{ px: 2 }}>
              <InputBase
                placeholder="Add a city"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
              />
              <IconButton onClick={handleCityButtonClick}>
                <Add />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <Box>
              <IconButton onClick={handleTempScaleButtonClick}>
                {options.tempScale === 'metric' ? '\u2103' : '\u2109'}
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {cities.map((city, index) => (
        <WeatherCard
          city={city}
          tempScale={options.tempScale}
          key={index}
          onDelete={() => handleDeleteCity(index)}
        />
      ))}
      <Box height="16px" />
    </Box>
  )
}

const rootConatiner = document.createElement('div')
document.body.appendChild(rootConatiner)
const root = createRoot(rootConatiner)
root.render(<App />)
