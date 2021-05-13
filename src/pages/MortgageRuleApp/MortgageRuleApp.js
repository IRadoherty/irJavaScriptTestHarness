import Button from '@material-ui/core/Button'
import Page from 'material-ui-shell/lib/containers/Page'

import React, { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(3),
    alignItems: 'left',
    width: '500px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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
    align: 'right',
    width: '500px',
    position: 'relative'
  }
}))

const MortgageRuleApp = () => {

  const classes = useStyles()
  const intl = useIntl()
  const [principal, setPrincipal] = useState('')
  const [termInYears, setTermInYears] = useState('')
  const [APR, setAPR] = useState('')
  const [totalCost, setTotalCost] = useState('')
  const [montlyPayment, setMontlyPayment] = useState('')

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


  
  function RunRules() { 
    toggle() 
    const URL = "https://irjsmortgageruleapp.azurewebsites.net/api/HttpTrigger1?code=YGYQb45f5BP1R2Su2RTAK2RqtCyaaq6LmUEQZ6/9/DFvxQ8KkTiweA==";
    const JSONDATA = { LoanInfo: { Principal: principal, APR: APR, TermInYears: termInYears }};
    const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(JSONDATA)
      };
      fetch(URL, requestOptions)
          .then(response => response.json())
          .then(data => {
            setMontlyPayment(data.PaymentSummary.MonthlyPayment)
            setTotalCost(data.PaymentSummary.TotalCost)
          })
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
          {intl.formatMessage({ id: 'loan_intro', defaultMessage: 'This sample demonstrates one rule app calling another. The mortgage calculator has been modified to look up the APR based on the term. The lookup is performed using an Execute JavaScript Function action. The function uses JQuery to call to a service that is hosted in NodeJS. The service returns the APR by leveraging another JavaScript rule app' })}
        </Typography>

         <form className={classes.form}  noValidate>   
         <Typography component="h1" variant="h5"> {intl.formatMessage({ id: 'monthlyPayment', defaultMessage: 'Montly Payment' })} </Typography>
          <br/>
        <TextField
              value={principal} onInput={(e) => setPrincipal(e.target.value)}
              variant="outlined" required id="principal"
              label={intl.formatMessage({ id: 'principal', defaultMessage: 'Principal' })} name="principal" />
         <br/> <br/>
         <TextField
              value={termInYears} onInput={(e) => setTermInYears(e.target.value)}
              variant="outlined" required id="termInYears"
              label={intl.formatMessage({ id: 'termInYearsLabel', defaultMessage: 'Term In Years' })}  name="termInYears" />
          <br/> <br/>       
          <TextField
              value={APR} onInput={(e) => setAPR(e.target.value)}
              variant="outlined" required id="APR"
              label={intl.formatMessage({ id: 'APRLabel', defaultMessage: 'APR' })} name="APR" />
          <br/> 
          <Button onClick={RunRules}  variant="contained" color="primary" className={classes.submit}>
              {intl.formatMessage({ id: 'submit_mortgage_form', defaultMessage: 'Calculate Mortgage' })}
            </Button>

         </form>

         <div className = "paymentSummaryClass">
         <Typography component="h1" variant="h5">{intl.formatMessage({ id: 'paymentSummary', defaultMessage: 'Payment Summary' })} </Typography>
         <br/>
          <Typography component="h3" variant="h8"> {intl.formatMessage({ id: 'loanInformationLabel', defaultMessage: 'Loan Information' })} </Typography>
          <TextField  value={montlyPayment} disabled variant="outlined" id="montlyPayment" />
         <br/> <br/> 
         <Typography component="h3" variant="h8"> {intl.formatMessage({ id: 'totalCostLabel', defaultMessage: 'Total Cost' })} </Typography> 
         <TextField  value={totalCost} disabled variant="outlined" id="totalCost" />
         <br/> <br/>
         </div>
        </div>

    </Page>
  )
}
export default MortgageRuleApp