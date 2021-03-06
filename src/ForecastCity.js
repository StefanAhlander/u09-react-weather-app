/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import getWeatherAtCity from './utils/getWeatherAtCity';
import getWeatherList from './utils/getWeatherList';
import Day from './Day';
import DisplayPanel from './DisplayPanel';
import CardHeader from './CardHeader';
import './Forecast.css';
import { useLocation, Link } from 'react-router-dom';

export default function ForecastCity(props) {
  const city = props.match.params.city;
  const location = useLocation();

  const initialState = {
    isLoading: false,
    hasError: false,
    data: null,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    getWeatherAtCity('forecast', city, state, setState);
  }, [location]);

  const { hasError, isLoading, data } = state;
  let list = [];
  if (data) {
    list = getWeatherList(data);
  }

  if (hasError) {
    return (
      <DisplayPanel>
        <h3 className='text-center'>Unfortunately there is an error:</h3>
        <p className='text-center'>{hasError}</p>
        <Link to='/'>Reset</Link>
      </DisplayPanel>
    );
  } else if (isLoading) {
    return (
      <DisplayPanel>
        <h1 className='text-center'>Loading...</h1>
      </DisplayPanel>
    );
  } else if (data !== null) {
    return (
      <DisplayPanel>
        <CardHeader name={data.city.name} />
        <div className='card-body'>
          {Object.keys(list).map((date) => (
            <Day key={date} date={date} list={list[date]} />
          ))}
        </div>
      </DisplayPanel>
    );
  } else {
    return (
      <DisplayPanel>
        <h1 className='text-center'>Getting your location...</h1>
      </DisplayPanel>
    );
  }
}
