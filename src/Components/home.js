import React, {useState} from 'react'
import './home.css'
import Image from './undraw_flowers_vx06.svg'
import Card from './Card/card'
import { css } from "@emotion/core";
import {PropagateLoader} from "react-spinners";
import {Grid} from '@material-ui/core'
const Home = () => {
    const override = css`
    display: block;
    margin-left:50%;
   `;

    const [night, setNight] = useState(false)
    const [location, setLocation] = useState("")
    const [data, setData] = useState("")
    const [error, setError ] = useState("")
    const [loading, setLoading] = React.useState(false)

    const handleChange = (event) => {
        setError('')
        setLocation(event.target.value)
    }
    const getCoords = (url) => {
        return fetch(url, {
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type": "application/json"
            }
        }).then(res => {
            return res.json()
        })
        .catch(err => console.log(err))
    }
    const forecast = (url) => {
        return fetch(url, {
            method:"GET", 
        }).then(res => {
            return res.json()
        })
        .catch(err => console.log(err))
    }
    const geocode=(address)=>{
        const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaXNoYTIzIiwiYSI6ImNrYWF2ZmI4MjB4NmIzMGw1Y3dvdmwzMTgifQ.BaK62E7SzvZzofRNzdekpg&limit=1'
        getCoords(url).then(res => {
            setLocation(res.features[0].place_name)
            const long = res.features[0].geometry.coordinates[0]
            const lat = res.features[0].geometry.coordinates[1]
            const url = 'http://api.weatherstack.com/current?access_key=bfb8bb1fc3bc9398e81671f53ab8673b&query='+lat+','+long
            forecast(url).then(res => {
                setData(res)
                setNight((res.current.is_day==='no')?true:false)
                setLoading(false)
                setError('')
            })
        })
        .catch(err => {
            setError('Unable to find location! Please try again.')
            setData('')
            setLoading(false)
        })
    }
    const handleSearch = (event) => {
        event.preventDefault()
        setLoading(true)
        geocode(location)
    }
    const Flash = () => {
        if(loading === true){
            return <PropagateLoader
            css={override}
            size={22}
            color={"#f9a826"}
           loading={loading}
          />
        }
    }
    return (
        <div className='fullscreen' style={(night)? {backgroundColor:'#1e1b20'}:{backgroundColor: '#f2f2f2'}}>
        <Grid container >
            <Grid xs={12} md={6} item >
                <img className = "svg" src={Image} alt=""/>
            </Grid>

            <Grid item xs={12} md={6} >
               <div className="content" style={(night)? {backgroundColor:'#76757a'}:{}}>
               <form >
                   <h1>How It Feels?</h1>
                   <input onChange={handleChange}  type="text" placeholder="Enter the location" autoFocus/>
                   <button onClick={handleSearch} className="btn">Search</button>
                   {Flash()}
               </form>
               {
                   data && 
                   <Card data={data} location={location} />
               }
               {
                   error &&
                   <p>{error}</p>
               }          
               </div>
            </Grid>
            </Grid>
        </div>
    )
}

export default Home