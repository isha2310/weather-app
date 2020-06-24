import React from 'react'
import Sunny from './undraw_weather_app_i5sm.svg'
import Snow from './snow.svg'
import Rain from './rain.svg'
import Wind from './wind.svg'
import Cloudy from './night2.svg'
import './card.css'

const Card = (props)  => {
    const imageSelector = () => {
        const descriptions = props.data.current.weather_descriptions
        const description = descriptions[0].toLowerCase()
        if (description.includes('snow')) 
            return <img src={Snow} alt="" className="svg2"/>                
        else if (description.includes('rain') ||description.includes('thunder') ||description.includes('mist')||description.includes('shower')||description.includes('haze')) 
            return <img src={Rain} alt="" className="svg2"/>                
        else if (description.includes('wind') || description.includes('storm') ) 
            return <img src={Wind} alt="" className="svg2"/>
        else if (description.includes('overcast') || description.includes('cloudy')|| (props.data.current.is_day==='no')||description.includes('cyclone'))
            return <img src={Cloudy} alt="" className="svg2"/>                
        else
            return <img src={Sunny} alt="" className="svg2"/>
    }

    const timestamp = () => {
        let myDate = new Date()
        let hours = myDate.getHours()
        let minutes = myDate.getMinutes()
        let localtime = hours+':'+minutes
        return <h1 >{localtime}</h1>
    }

    return (
        <div className="card1" style={(props.data.current.is_day==='no')?{backgroundColor: '#76757a'}:{}}>           
            <div className="report">
                {timestamp()}
                <p>{props.location}</p>
                <p>Weather is {props.data.current.weather_descriptions}.</p>
                <p>Temperature is {props.data.current.temperature} degrees, but it feels like {props.data.current.feelslike} degrees.</p>
            </div>
            <div className="weather-img">
                {imageSelector()}
            </div>
        </div>
    )
}
export default Card