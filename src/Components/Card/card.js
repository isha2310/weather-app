import React from 'react'
import Sunny from './undraw_weather_app_i5sm.svg'
import Snow from './snow.svg'
import Rain from './rain.svg'
import Wind from './wind.svg'
import Cloudy from './night2.svg'
import './card.css'

const Card = (props)  => {
    const imageSelector = () => {
        const descriptions = props.current.data[0].weather.description
        const descrip = descriptions.toLowerCase()
        if (descrip.includes('snow')) 
            return <img src={Snow} alt="" className="svg2"/>                
        else if (descrip.includes('rain') ||descrip.includes('thunder') ||descrip.includes('mist')||descrip.includes('shower')||descrip.includes('haze')) 
            return <img src={Rain} alt="" className="svg2"/>                
        else if (descrip.includes('wind') || descrip.includes('storm') ) 
            return <img src={Wind} alt="" className="svg2"/>
        else if (descrip.includes('overcast') || descrip.includes('cloud')|| (props.current.data[0].pod==='n')||descrip.includes('cyclone'))
            return <img src={Cloudy} alt="" className="svg2"/>                
        else
            return <img src={Sunny} alt="" className="svg2"/>
    }
    return (
        <div className="card1" style={(props.current.data[0].pod==='n')?{backgroundColor: '#76757a'}:{}}>           
            <div className="report">
                <p>{props.location}</p>
                <p>{props.current.data[0].weather.description}.</p>
                <p>Temperature is {props.current.data[0].temp} degrees, but it feels like {props.current.data[0].app_temp} degrees.</p>
            </div>
            <div className="weather-img">
                {imageSelector()}
            </div>
        </div>
    )
}
export default Card