import React, { useRef, useState } from 'react'
import axios from 'axios'

export default function Weather() {
    const refer = useRef()
    
    const [wea,setWea]=useState(null)
    const [city,setCity ] = useState('');

   
    const handleCityChange =(event)=>{
        setCity(event.target.value)

    }

    const fetchWeather = async () =>{
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'c9975d5fd39bfa94c94037788f366b27'}`)
            setWea(response.data)
        } catch (error) {
            console.log("unable to fetch data",error);
            
        }

    } 

     

    const handleClick = () =>{
        // refer.current.focus()
        fetchWeather();
        setCity('')

    }

    // Hide weather details when input is clicked
    const handleInputFocus = () => {
      setWea(null); // Reset the weather data to hide details
  }


 return (
    <div className='weather-container'>
      <h1>WEATHER</h1> 
      <hr/>
      <input 
      ref={refer} 
      type='text' placeholder='Enter City Name' 
      value={city} 
      onChange={handleCityChange}
      onFocus={handleInputFocus}></input>
      <br/>
      <button onClick={handleClick}>Get weather</button>
      {wea ? (<>
        <div className='weather-info'>
            <h3>{wea.name}</h3>
            <p>Temp is {wea.main?.temp}K </p>
            <p>{wea.weather?.[0]?.description}</p>
            
        </div>
        </>
      ):null}

      
      
    </div>
  )
}
