import Button from '@material-ui/core/Button'
import Page from 'material-ui-shell/lib/containers/Page'
import Paper from '@material-ui/core/Paper'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar'
import React, { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import '@fontsource/roboto'

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(3),
    alignItems: 'left',
    width: '500px',
  },
  submit: {
    margin: theme.spacing(2.5, 0, 2),
    alignItems: 'left',
  },
  container: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    marginTop: theme.spacing(5),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'left',
    height: `100%`,
  },
  paymentSummaryClass:{
    width: '500px',
    left: '400px',
    'margin-top': '-314px',
    position: 'relative'
  },
  textFieldClass:{
    marginTop: theme.spacing(0),
    height: '50px',
    'font-weight': 'normal'
  },
  paymentSummaryTypography:{
    alignItems: 'center',
    marginTop: theme.spacing(-1),
    height: '50px',
  }

}))

const MortgageRuleAppIX = () => {

  const classes = useStyles()
  const intl = useIntl()
  const [principal, setPrincipal] = useState('')
  const [termInYears, setTermInYears] = useState('')
  const [APR, setAPR] = useState('')
  const [totalCost, setTotalCost] = useState('')
  const [montlyPayment, setMontlyPayment] = useState('')
  const [PaymentSummary, setPaymentSummary] = useState('')

  const [milliSeconds, setMilliSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function toggle() { setIsActive(!isActive); }
  function reset() { setMilliSeconds(0); setIsActive(false); }

  useEffect(() => {
    let interval = null;
    if (isActive) { interval = setInterval(() => { setMilliSeconds(milliSeconds => milliSeconds + 1); }, 1);
    } else if (!isActive && milliSeconds !== 0) { clearInterval(interval); }
    return () => clearInterval(interval);
  }, [isActive, milliSeconds]);

  function RunRules(event) {
    toggle() 
    event.preventDefault()

    var PaymentSummaryR = window.runRules(principal, termInYears, APR)
    setMontlyPayment(PaymentSummaryR.MonthlyPayment)
    setTotalCost(PaymentSummaryR.TotalCost)
    toggle() 
  }

  return (
    <Page pageTitle={intl.formatMessage({ id: 'MortgageRuleApp', defaultMessage: 'Mortgage Calculator' })} >
      <div className={classes.container}>

      <div className="row">
        <div className="time"> {milliSeconds} ms </div>
          <button onClick={toggle}>{isActive ? 'Pause' : 'Start'} </button>
          <button className="button" onClick={reset}>Reset</button>
        </div>
   
      <Typography component="h3" variant="h6">
          {intl.formatMessage({ id: 'loan_intro', defaultMessage: 'This mortgage rule application example uses a local function to call a rule applicatinm using irJavascript' })}
        </Typography>
        <br/>
      
         <form className={classes.form}  noValidate>   
         <Typography component="h1" variant="h5"> {intl.formatMessage({ id: 'monthlyPayment', defaultMessage: 'Montly Payment' })} </Typography>
          <br/>
        <TextField className = {classes.textFieldClass}
              value={principal} onInput={(e) => setPrincipal(e.target.value)}
              variant="outlined" required id="principal"
              label={intl.formatMessage({ id: 'principal', defaultMessage: 'Principal' })} name="principal" />
         <br/> <br/>
         <TextField className = {classes.textFieldClass}
              value={termInYears} onInput={(e) => setTermInYears(e.target.value)}
              variant="outlined" required id="termInYears"
              label={intl.formatMessage({ id: 'termInYearsLabel', defaultMessage: 'Term In Years' })}  name="termInYears" />
          <br/> <br/>       
          <TextField className = {classes.textFieldClass}
              value={APR} onInput={(e) => setAPR(e.target.value)}
              variant="outlined" required id="APR"
              label={intl.formatMessage({ id: 'APRLabel', defaultMessage: 'APR' })} name="APR" />
          <br/> 
          <Button onClick={RunRules}  variant="contained" color="primary" className={classes.submit}>
              {intl.formatMessage({ id: 'submit_mortgage_form', defaultMessage: 'Calculate Mortgage' })}
            </Button>

         </form>

         <div className = {classes.paymentSummaryClass}>
         <Typography component="h1" variant="h5" className = {classes.paymentSummaryTypography}>
           {intl.formatMessage({ id: 'paymentSummary', defaultMessage: 'Payment Summary' })} </Typography>

         <TextField className = {classes.textFieldClass} disabled variant="outlined" value={montlyPayment} id="montlyPayment" name="montlyPayment"
           label={intl.formatMessage({ id: 'montlyPaymentLabel', defaultMessage: 'Montly Payment' })} />
         <br/> <br/> 
         <TextField  className = {classes.textFieldClass} disabled variant="outlined" value={totalCost} id="totalCost" name="totalCost"
          label={intl.formatMessage({ id: 'totalCostLabel', defaultMessage: 'Total Cost' })}  />
         <br/> <br/> 
      
         </div>
        </div>

    </Page>
  )
}
export default MortgageRuleAppIX