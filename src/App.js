import React, {useState, useEffect} from 'react';
import {MenuItem, FormControl, Select, Card, CardContent,} from '@material-ui/core'
import InfoBox from './InfoBox';
import Map from './Map';
import './App.css';
import Table from './Table';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  },[]);

  // STATE = How to write a variable in REACT <<<<

  // https://disease.sh/v3/covid-19/countries

  //USEEFECT= Runs a piece of code 
  // based on a fiven condition

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch ("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2
          }));
          setTableData(data);
          setCountries(countries);
      });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url = 
      countryCode === "worldwide" 
      ? "https://disease.sh/v3/covid-19/all" 
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
    await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setCountry(countryCode);
      setCountryInfo(data);
    })
  };
  console.log('Country Info >>', countryInfo);
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}       
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
            <InfoBox title="Casos" cases={countryInfo.todayCases} total={countryInfo.cases} />
            <InfoBox title="Recuperados" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
            <InfoBox title="Muertes" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>

        {/*Map*/}
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Casos actuales por País</h3>
          <Table className="table" countries={tableData}/>
          <h3>Casos nuevos a Nivel Mundial</h3>
          {/*Graph*/}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
