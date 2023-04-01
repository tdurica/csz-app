import {
  chakra, Box, Portal, Center, Flex, Link, Button, FormControl, FormLabel,
  Image, Spacer, Text, Input, Checkbox, FormHelperText, Heading, useToast,
  Tabs, TabList, TabPanels, Tab, TabPanel,
} from '@chakra-ui/react';
import React, {useEffect, useRef, useState} from 'react';
// import GoogleButton from "react-google-button";

import { NavLink, useNavigate,Outlet, useLocation } from 'react-router-dom';
import { useAppStore } from 'services/useAppStore.js';
import {useAuth, authState, jwt} from 'services/useAuth.js';
import { HFlexSC, VFlex } from '../bits/UtilityTags.js';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const validationSchema = yup.object().shape({
  email: yup.string().email('Email invalid').required('Required'),
  password: yup.string().required('Required'),
});

export default function Login({  }) {
  const [tabIdx, setTabIdx] = useState(0)
  const [view, setView]= useState('auth') //auth | forgotPass | mustVerify
  const verifyEmailInput = useRef(null);
  const [forgotPassEmail, setForgotPassEmail]= useState('')
  const [forgotPassMessage, setForgotPassMessage]= useState('')
  const toast = useToast();
  const setTabIndex = (i)=>{resetWithEmailCarry();setTabIdx(i);}
  const navigate = useNavigate();
  const _login = useAuth.getState()._login;

  async function _handleSubmit(values, form) {
    const headers = {"Content-Type": "application/json"};
    const {email, password} = values;
    //login
    if(tabIdx===0){
      const res = await fetch(`http://localhost:5000/auth/login`, {
        method:'POST', headers, body: JSON.stringify({email, password}),
      }).then(r=>r.json())
      if(res && res.mustVerify){
        useAuth.setState({isAuthenticated:false})
        toast({title: "Please verify email", status: "info",});
        setView('mustVerify')
      }
      if(res && res.success){
        toast({title: "Login success!", status: "info",});
        useAuth.setState({user:res.user})
        useAuth.setState({isAuthenticated:true})
        jwt.setAccessToken(res.accessToken)
        jwt.setRefreshToken(res.refreshToken)
        // history.push('./dash');
        navigate('../dash', { replace: true });
      }else{
        toast({title: "Could not login, try again?", status: "error",});
        form.resetForm({values: {email, password}})
      }
    }
    //register
    else if(tabIdx===1){
      const res = await authState()._register(values.email, values.password)
      if(res.mustVerify){
        toast({title: "Please verify email", status: "info",});
        setView('mustVerify')
      }else{
        toast({title: "Could not register, try again?", status: "error",});
        form.resetForm({values: {email, password}})
      }
    }
  }

  const {
    values, errors, touched, handleChange, handleBlur,
    handleSubmit, isSubmitting, resetForm
  } = useFormik({
    onSubmit: async (values, form) => {
      await _handleSubmit(values, form)
    },
    validationSchema,
    initialValues: {
      email: '', password: '',
    }
  })

  const verifyEmail = async ()=>{
    const codeVal = parseInt(verifyEmailInput.current.value.trim())
    const res = await authState()._verify(codeVal)
    if(res.success){
      toast({title: "Login success!", status: "info",});
      navigate('../dash', { replace: true });
    }else{
      toast({title: "Unable to verify. Try again?", status: "warning",});
    }
  }

  const sendPasswordResetEmail = async ()=>{
    const res = await authState()._forgotPW(forgotPassEmail);
    setForgotPassMessage(res.toString())
  }
  const onChangeForgotPassEmail = (e)=>{
    setForgotPassEmail(e.currentTarget.value)
  }
  useEffect(()=>{
    if(view==='forgotPass'){//copy email to new input
      setForgotPassEmail(values.email)
    }else{setForgotPassEmail('')}
  },[view])

  function resetWithEmailCarry() {
    resetForm({
      values: {
        email: values.email,
        password: ''
      }
    })
  }

  return (
    <Box bgColor='white' p={10}>
      {view==='auth' && (<>
        <Box>

          <Tabs isFitted index={tabIdx} onChange={setTabIndex}>
            <TabList mb='1em'>
              <Tab>Sign in</Tab>
              <Tab>Register</Tab>
            </TabList>
          </Tabs>
          <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" id="email" value={values.email} onChange={handleChange} onBlur={handleBlur}/>
            {touched.email && <FormHelperText textColor="#e74c3c">{errors.email}</FormHelperText> }
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" id="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
            {touched.password && <FormHelperText textColor="#e74c3c">{errors.password}</FormHelperText> }
          </FormControl>
          {/* Login */}
          {tabIdx===0 && (<>
            {/* <GoogleButton className="g-btn" type="dark"/> */}
            <Link color={'blue.400'} onClick={()=>{setView('forgotPass')}}>
              Forgot password?
            </Link><br/>
            <Checkbox>Remember me</Checkbox>
          </>)}
          {/* Signup */}
          {tabIdx===1 && (<>
            <Text mt={4} align={'start'}>
              Already a user?
              <Link color={'blue.400'}
                    onClick={()=> {
                      resetWithEmailCarry()
                      useAppStore.setState({ authModalTabIndex: 0 });
                    }}>
                Login
              </Link>
            </Text>
          </>)}
        </Box>
        <Box justifyContent={'start'}>
          <Button
            onClick={handleSubmit}
            w='100%'
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}>
            {tabIdx===0 && 'Sign in'}
            {tabIdx===1 && 'Register'}
          </Button>
        </Box>
      </>)}
      {view==='mustVerify' && (<>
        <Box sx={{border:'1px solid black', borderRadius:'6px', p:'5px'}}>
          <Input ref={verifyEmailInput} placeholder='Verification Code'/>
          <Button onClick={verifyEmail}>Verify</Button>
        </Box>
      </>)}
      {view==='forgotPass' && (<>
        <Heading size='md'>Password Reset</Heading>
        <Box>
          <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type='email' value={forgotPassEmail} onChange={onChangeForgotPassEmail}/>
          </FormControl>
          <br/>
          <HFlexSC>
            <Button colorScheme='gray' mr={3} onClick={()=>setView('auth')}>
              Back
            </Button>
            <Button
              onClick={sendPasswordResetEmail}
              w='100%'
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Send Reset Email
            </Button>
          </HFlexSC>
          <Box mt={3}>{forgotPassMessage}</Box>
        </Box>
      </>)}
    </Box>
  )
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {width,height};
}