import React, { useEffect, useState} from "react";

import Main from "./components/main";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";



// 1. 앱이 실행되지 마자 현재 위치 기반으로 날씨가 보인다.
// 2. 날씨정보에는 도시, 섭씨, 화시, 날씨 정보가 보인다.
// 3. 5개의 버튼이 있다.(1개는 현재 위치, 4개는 다른 도시)
// 4. 도시버튼을 클릭할 때 마다 도시별 날씨가 나온다.
// 5. 현재 위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 나온다.
// 6. 데이터를 들고 오는 동안 로딩 스피너가 돈다.
function App() {

  const [location, setLocation] = useState<string>("");
  console.log(location);
  const [currentTemp, setCurrentTemp] = useState("");
  const [feelTemp, setFeelTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [weather, setWeather] = useState("");
  const [icon, setIcon] = useState("");
  let [local, setLocal] = useState<string[]>(["Seoul", "Daegu", "Ulsan"]);
  const [display, setDisplay] = useState(false)
 


  //현재 디바이스가 위치한 지역의 경도와 위도 정보를 불러온다.
  const currentLocationPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position: any) => {
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;
        currentWeather(lat, lon);
      },
      (error) => {
        //불러오지 못하면 그 메시지를 에러로 보여준다.
        console.log("error:", error);
      }
    );
  };

  //location 이 빈문자열이라면 함수를 실행
  useEffect(() => {
    if (location === "") {
      currentLocationPosition();
    } else {
      majorAreasWeather();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // 오픈 API 로 부터 날씨 관련 정보를 불러온 후 각 state에 저장
  const currentWeather = async (lat: number, lon: number) => {
    
    let url = new URL(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d653eca5f537a85815943a92096487b4&lang=kr`
    );
    let res = await fetch(url);
    let data = await res.json();

    let locationArray: string = data.name;

    setLocation(locationArray);
    setCurrentTemp(Math.floor((data.main.temp - 273.15) * 1) + " ℃");
    setFeelTemp(Math.floor((data.main.feels_like - 273.15) * 1) + " ℃");
    setHumidity(data.main.humidity + "%");
    setWeather(data.weather[0].description);
    setIcon(data.weather[0].icon);
  };

  //주요 지역 날씨 정보를 가져온다.
  const majorAreasWeather = async () => {
    let url = new URL(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d653eca5f537a85815943a92096487b4&lang=kr`
    );
    let res = await fetch(url);
    let data = await res.json();
    
    let locationArray: string = data.name;
    console.log(locationArray)

    setLocation(locationArray);
    setCurrentTemp(Math.floor((data.main.temp - 273.15) * 1) + " ℃");
    setFeelTemp(Math.floor((data.main.feels_like - 273.15) * 1) + " ℃");
    setHumidity(data.main.humidity + "%");
    setWeather(data.weather[0].description);
    setIcon(data.weather[0].icon);
  };



  return (
    <div className="App">
      <Main
        location={location}
        currentTemp={currentTemp}
        feelTemp={feelTemp}
        humidity={humidity}
        weather={weather}
        icon={icon}
      ></Main>

      <div className="button">
        <h5 onClick={()=>{
               setDisplay(!display)
             }}>Click me!</h5>
     
       {display ===true? 
       <div className="btn">
            <Button 
                onClick={()=>{
                  setLocation('')
                }}
                className="btn-arr" 
                variant="dark">
                    Cl
            </Button>
         
                
          {Array.isArray(local) &&
          local.map((local:any, i: number) => {
            return (
              <Button className="btn-arr"
                onClick={() => {
                  setLocation(local);
                }}
                key={i}
                variant="dark"
              >
                {local}
              </Button>
              
            );
          })}
          
        </div>:null }
      </div>
    </div> //App 컴포넌트 끝 구간
  )
}

export default App;
