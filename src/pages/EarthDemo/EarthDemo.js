import React, { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import Avatar from '@material-ui/core/Avatar'
import { useSnackbar } from 'notistack'
import '@fontsource/roboto'

    const useStyles = makeStyles((theme) => ({
        container: {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(5),
            marginTop: theme.spacing(5),
            flexDirection: 'column',
            alignItems: 'left',
            justifyContent: 'left',
            height: `100%`,
            width: '400px',
            position: 'relative'
        },
        EarthIMG: {
            width: "250px" ,
            alignItems: 'center',
        },
        PageTopText: {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(5),
            marginTop: theme.spacing(5),
        },
        logging:{
            width: '450px',
            left: '400px',
            'margin-top': '-308px',
            position: 'relative'
          },
    } ))


const EarthDemo = () => {

    const { enqueueSnackbar } = useSnackbar()
    const classes = useStyles()
    const intl = useIntl()
    var [continents, setContinents] = useState()
    var [continent, setContinent] = useState()
    const [countries, setCountries] = useState()
    var [country, setCountry] = useState()
    var [states, setStates] = useState()
    var [state, setState] = useState()
    var [populationText, setPopulationText] = useState()
    var [logText, setLogText] = useState()
    var populationOBJ = {}


   
      useEffect(() => { setContinents(window.continentInlineTable().map((continent) => ( 
      <option value={continent.Value}>{continent.Name}</option>)))
    },[])
    
   
    const handleContinentChange = (event) => { 
        setCountries(undefined)
        setStates(undefined); setState(undefined)
        setCountries(undefined); setCountry(undefined)
        setContinent(event.target.value); continentChange(event.target.value) }
    const continentChange = (_continent) => { 
        switch(_continent) {
            case _continent = "Africa": countryValues("AfricaCountries"); break
            case _continent = "Asia": countryValues("AsiaCountries"); break
            case _continent = "Europe": countryValues("EuropeCountries"); break
            case _continent = "North America": countryValues("NorthAmericaCountries"); break
            case _continent = "South America": countryValues("SouthAmericaCountries"); break
            case _continent = "Oceania": countryValues("OceaniaCountries"); break
        default: setCountries(); 
        enqueueSnackbar('No countries defined', { variant: 'warning', autoHideDuration: 1000, anchorOrigin: { vertical: 'top', horizontal: 'center', }, }) 
        }
    }
    const countryValues = (countryTable) => { setCountries(window.countryInlineTable(countryTable).map((country) => ( 
        <option value={country.Value}>{country.Name}</option> )))}
    const stateValues = (stateTable) => { setStates(window.statesInlineTable(stateTable).map((state) => ( 
        <option value={state.Value}>{state.Name}</option> )))}
    const handleCountryChange = (event) => { var countryVar = event.target.value; setCountry(countryVar)
            switch(countryVar) { 
                case countryVar = "United States": stateValues("US_States"); break
                case countryVar = "Canada": stateValues("CanadaProvinces"); break
            default:  enqueueSnackbar('No states defined', { 
                autoHideDuration: 1000, variant: 'warning', anchorOrigin: { vertical: 'top', horizontal: 'center', }, }) 
            }
        }
    

    const handleStateChange = (event) => { setState(event.target.value) }

    function pullPopulation(){ var populationReturn = {}; populationOBJ.locationContinent = ""
        if (state !== undefined){ populationOBJ.locationText = "state"; populationOBJ.locationValue = state; populationOBJ.locationCountry = country; populationOBJ.locationContinent = continent }
        else if (country !== undefined) { populationOBJ.locationText = "country"; populationOBJ.locationValue  = country; populationOBJ.locationContinent = continent  }
        else if (continent !== undefined) {  populationOBJ.locationText = "continent"; populationOBJ.locationValue  = continent  }

        if (populationOBJ.locationValue !== undefined || populationOBJ.locationValue != null  ){ 
            
            populationReturn = window.pullPopulationByRule(populationOBJ)
            setLogText(populationReturn.log)
            setPopulationText("The population of " + populationOBJ.locationValue + " is: " + populationReturn.populationOBJ.PopulationResult +".") }
        
        else(setPopulationText("Invalid Selection")) }
        function clearForm(){ 
        setLogText()
                setStates(undefined); setState(undefined)
                setCountries(undefined); setCountry(undefined)
                setContinents(undefined)
                setPopulationText("Form cleared, select new continent.")
                setContinents(window.continentInlineTable().map((continent) => ( <option value={continent.Value}>{continent.Name}</option>)))
            }
   
    return (
        <Page pageTitle={intl.formatMessage({ id: 'Earth', defaultMessage: 'Earth' })} >
            <br/>
            <Typography component="h1" variant="h6" className = {classes.PageTopText}>
           {intl.formatMessage({ id: 'paymentSummary', 
           defaultMessage: 'This rule app uses irJavaScript to populate drop down values and run rules on the selected values.' })} </Typography>
    
            <br/>
            <Container className={classes.container}>
            <Avatar style={{ width: 220, height: 220, marginTop: -40 }} alt="Earth" src="../img/earth.png"/>
           
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-helper">Continents</InputLabel>
                <NativeSelect id = "continentID" onChange={handleContinentChange} >
                <option aria-label="None" value={continent} /> {continents}
                </NativeSelect>
                <FormHelperText>Choose a continent</FormHelperText>
            </FormControl> <br/>

            <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-helper">Countries</InputLabel>
                <NativeSelect onChange={handleCountryChange} >
                <option aria-label="None" value={country} /> {countries}
                </NativeSelect>
                <FormHelperText>Choose a country</FormHelperText>
            </FormControl> <br/>

            <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-helper">States</InputLabel>
                <NativeSelect  onChange={handleStateChange}>
                <option aria-label="None" value={state} /> {states}
                </NativeSelect>
                <FormHelperText>Choose a state</FormHelperText>
            </FormControl> <br/> <br/>

            <Button onClick={pullPopulation} variant="contained" color="primary" >
              {intl.formatMessage({ id: 'pull_population', defaultMessage: 'Pull Population' })}
            </Button>  
            <Button onClick={clearForm} variant="contained" color="primary" >
              {intl.formatMessage({ id: 'clearForm', defaultMessage: 'Clear Form' })}
            </Button> <br/> <br/> 
            
            <div>{populationText}</div><br/> 

            <div className={classes.logging}>
            <div>If logging is set on the irJavaScript file, it will show here: </div><br/>
               {logText} 
                </div>
            </Container>
        </Page>
        )
}
export default EarthDemo