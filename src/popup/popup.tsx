import React from 'react'
import { createRoot } from 'react-dom/client'
import './popup.css'
import WeatherCard from './WeatherCard/WeatherCard'

const App: React.FC<{}> = () => {
  return (
    <div>
      <WeatherCard city="Bengaluru" />
      <WeatherCard city="Hyderabad" />
    </div>
  )
}

const rootConatiner = document.createElement('div')
document.body.appendChild(rootConatiner)
const root = createRoot(rootConatiner)
root.render(<App />)
