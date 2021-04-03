import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^.{8,}$/;
const DESCRIPTION_MAX_LENGTH = 150;

const useStyles = makeStyles({
  container: {
    backgroundColor: grey[200],
    minHeight: '100vh'
  },
  formBox: {
    backgroundColor: grey[100],
    padding: 16
  }
})

const validators = {
  email: value => {
    let message;

    if (!value) {
      message = 'Email is required'
    } else if (!EMAIL_PATTERN.test(value)) {
      message = 'Email is invalid'
    }

    return message
  },
  password: value => {
    let message;

    if (!value) {
      message = 'Password is required'
    } else if (!PASSWORD_PATTERN.test(value)) {
      message = 'Password should have at least 8 characters'
    }

    return message
  },
  description: value => {
    if (value && value.length > DESCRIPTION_MAX_LENGTH) {
      return 'Characters exceed'
    }
  },
  checkTerms: value => {
    if (!value) {
      return 'You should accept Terms & Conditions'
    }
  }
}

const Form = () => {
  const classes = useStyles()

  const [state, setState] = useState({
    values: {
      email: '',
      password: '',
      checkTerms: false,
      description: ''
    },
    errors: {
      email: validators.email(),
      password: validators.password(),
      checkTerms: validators.checkTerms(),
      description: validators.description()
    },
    touched: {}
  })

  const { values, errors, touched } = state;

  const isValid = () => {
    return !Object.keys(errors).some(name => errors[name])
  }

  const onSubmit = e => {
    e.preventDefault()

    if (isValid) {
      console.log('Next action')
    }
  }

  const handleChange = e => {
    const { name, value, checked } = e.target
    const isTermsCheckbox = name === 'checkTerms'

    setState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        [name]: isTermsCheckbox ? checked : value
      },
      errors: {
        ...prevState.errors,
        [name]: validators[name]
          && validators[name](isTermsCheckbox ? checked : value)
      }
    }))
  }

  const handleBlur = e => {
    const { name } = e.target

    setState(prevState => ({
      ...prevState,
      touched: {
        ...prevState.touched,
        [name]: true
      }
    }))
  }

  return (
    <Container className={classes.container}>
      <Box pt={2}>
        <Paper elevation={1} className={classes.formBox} square={false}>
          <Typography variant="h2">Form to create something</Typography>

          <form onSubmit={onSubmit}>
            <Grid container spacing={4} style={{ marginTop: 16 }} justify="flex-start">
              <Grid item xs={6}>
                <TextField
                  name="email" onChange={handleChange} id="email" type="text"
                  onBlur={handleBlur} label="Email" value={values.email}
                  variant="outlined" fullWidth
                  {...(touched.email && errors.email
                    ? { error: true, helperText: errors.email } : {}
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  name="password" onChange={handleChange} id="password" type="password"
                  onBlur={handleBlur} label="Password" value={values.password}
                  variant="outlined" fullWidth
                  {...(touched.password && errors.password
                    ? { error: true, helperText: errors.password } : {}
                  )}
                />
              </Grid>

              <Grid item sm={12}>
                <TextField
                  name="description" onChange={handleChange} id="description" type="description"
                  onBlur={handleBlur} label="Description" value={values.description}
                  variant="outlined" fullWidth multiline rows={3}
                  {...(touched.description && errors.description
                    ? { error: true, helperText: errors.description } : {}
                  )}
                />
              </Grid>

              <Grid item sm={12}>
                <FormControlLabel
                  label="I have read and accept Terms and Conditions"
                   
                  control={
                    <Checkbox
                      checked={values.checkTerms}
                      name="checkTerms"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      color="primary"
                    />
                  }
                />
              </Grid>
            </Grid>

            <div style={{ marginTop: 16 }}>
              <Button
                variant="outlined" color="primary" size="large"
                type="submit" disabled={!isValid()}
              >
                Create
              </Button>
            </div>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Form;