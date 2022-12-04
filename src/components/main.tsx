import React from "react";

interface MainType{
    location:string
    weather:string
    icon:string
    currentTemp:string
    feelTemp:string
    humidity:string
}
const Main:React.FC<MainType> =({location,icon,weather,currentTemp,feelTemp,humidity})=>{
    return (
      <div className='main'>
        <div className='title'>
          <h3>"현재 지역의 날씨는 어떤가요?"</h3>
        </div>
        <div className='contents'>
          <div className="weather-icon"><img src={process.env.PUBLIC_URL+`icons/${icon}.png`} alt='weather-icon' /></div>
          <div className='weather-explanation'>{weather}</div>
          <div className='weather-data'> 
              <h5>현재 지역:<span>{" " + location}</span></h5>
              <h5>현재 온도:<span>{" " + currentTemp}</span></h5>
              <h5>체감 온도:<span>{" " + feelTemp}</span></h5>
              <h5>습도:<span>{" " + humidity}</span></h5>
          </div>
        </div>
      </div>
    )
}



export default Main;