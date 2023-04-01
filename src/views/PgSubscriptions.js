import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Grid,
  Heading,
  ListItem,
  SimpleGrid,
  Spinner,
  Text,
  UnorderedList,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Input,
  InputGroup,
  InputRightElement, InputLeftElement, Divider, Badge,
} from '@chakra-ui/react';
import {
  BtnXs, ExtLinkBtn,
  HFlex,
  HFlexCC,
  HFlexSC,
  S,
  TextXs,
  VFlex,
  VFlexCC,
  VFlexCS
} from './bits/UtilityTags.js';
import {format} from 'date-fns';
import { breakpoints } from '../theme/foundations/breakpoints.js';
import ProductOffer from './stripe/ProductOffer.js';
import { useSearchParams } from 'react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { CopyToClipboardButton } from '../hooks/CTCBButton.js';
import { appState, useAppStore } from 'services/useAppStore.js';
import { authState, useAuth } from 'services/useAuth.js';
import { paymentState } from "services/usePayment";
import ApiKeyModal from './stripe/ApiKeyModal.js';
import SetupFormModal from './stripe/SetupFormModal.js';
import StripeIntentModal from './stripe/StripeIntentModal.js';
import { VisaIcon } from '../components/Icons/Icons.js';

export default function PgSubscriptions() {
  const fbuser = useAuth(s=>s.user);
  const lui = useAuth(s=>s.lnpUserInfo);
  const luiPayMethod = useAuth(s=>s.lnpUserInfo.payMethod);
  const luiPlan = useAuth(s=>s.lnpUserInfo.plan);

  // const lnpUserInfo = useAuth(s=>s.lnpUserInfo);
  // const lnpUserSubscriptions = useAuth(s=>s.lnpUserSubscriptions);
  // const [activeProduct, setActiveProduct] = useState('none')
  // const fetchLnpUserInfo = ()=>authState().fetchLnpUserInfo();
  // const createCustomer = ()=>authState().assureCustomer();
  // const createSubscription = ()=>authState().createSubscription();

  const [redirectMessage,setRedirectMessage] = useState('')
  const [plan,setPlan] = useState('standard')
  // const [searchParams, setSearchParams] = useSearchParams();
  // const clientSecret = searchParams.get('payment_intent_token')
  // const clientSecret = useAppStore(s=>s.stripeIntentModalClientSecret)
  // if(searchParams.get('payment_intent_token')){
  //   //do something after redirect from a successful paymentIntent
  //   setRedirectMessage('Payment was successful!')
  // }
  // if(searchParams.get('setup_intent_token')){
  //   //do something after redirect from a successful setupIntent
  //   setRedirectMessage('Payment method update was successful')
  // }
  const payLatestInvoice=()=>paymentState().payLatestInvoice()
  const createSubscr=()=>paymentState().createSubscription(plan)
  const changeSubscr=()=>paymentState().changeSubscription()
  const cancelSubscr=()=>paymentState().cancelSubscription()
  const setPaymentMethod=()=>appState().loadStripeIntentModal('setup')

  // useEffect(() => {
  //   setActiveProduct((lnpUserSubscriptions.length && lnpUserSubscriptions[0].product)
  //     ? lnpUserSubscriptions[0].product : 'none');
  // }, [lnpUserSubscriptions]);

  useEffect(() => {
    if(fbuser && fbuser.accessToken){
      authState().fetchLnpUserInfo()
    }
  }, [fbuser]);

  useEffect(() => {
    if(lui.plan.product){
      setPlan(lui.plan.product)
    }
  }, [lui]);

  const sxPlanStandard = {bgColor: plan === 'standard' ? '#AAA' : '#DDD'}
  const sxPlanPremium = {bgColor: plan === 'premium' ? '#AAA' : '#DDD'}

  return (<>
    <Heading>Subscription</Heading>
    {/* {redirectMessage && (<HFlexSC>{redirectMessage}</HFlexSC>)} */}

    <VFlex my={6} w={{sm:'96%',md:'90%',lg:breakpoints.md}} alignSelf={'center'}>
      {/* <HFlex gap={2}> */}
      {/*   <BtnXs onClick={register}>register</BtnXs> */}
      {/*   {!fbuser ? (<BtnXs bgColor='#AFC' onClick={login}>login</BtnXs>) */}
      {/*     :(<><BtnXs bgColor='#AFC' onClick={logout}>logout {fbuser.email}</BtnXs> */}
      {/*       <BtnXs sx={{h:'12px',bgColor:'#A55'}} onClick={delUser}>delUser</BtnXs></>)} */}
      {/* </HFlex> */}
      {/* <Heading as='h3' size='md'>Debug</Heading> */}
      {/* {lui.plan && ( */}
      {/*   <Box sx={{border:'1px solid black', borderRadius:'6px', p:'5px'}}> */}
      {/*     {Object.entries(lui.plan).map(([kk,vv],i,a)=>(<Box key={i}>{kk}: {vv}</Box>))} */}
      {/*   </Box> */}
      {/* )} */}
      {/* {lui.payMethod && ( */}
      {/*   <Box sx={{border:'1px solid black', borderRadius:'6px', p:'5px'}}> */}
      {/*     {Object.entries(lui.payMethod).map(([kk,vv],i,a)=>(<Box key={i}>{kk}: {vv}</Box>))} */}
      {/*   </Box> */}
      {/* )} */}


      <Heading as='h3' size='md'>Current Plan</Heading>
      {lui.plan.status === 'active' &&(<Badge colorScheme='green' w='fit-content'>active</Badge>)}
      {lui.plan.sub_id ? (
        <>
          <Text>{lui.plan.product_hr}</Text>
          <Text>{lui.plan.amount_hr}</Text>
          <VFlex gap={2}>
            <ExtLinkBtn href='https://billing.stripe.com/p/login/4gw9AF88J6fF5X27ss' style={{width:'fit-content'}}>
              Visit customer portal
            </ExtLinkBtn>
            <BtnXs onClick={changeSubscr}>Change Plan to {{'standard':'Premium','premium':'Standard'}[lui.plan.product]}</BtnXs>
            <BtnXs onClick={cancelSubscr}>Cancel Plan</BtnXs>
            <BtnXs onClick={()=>
              appState().set_apiKeyModalIsOpen(true)
            }>Generate New API Key</BtnXs>

          </VFlex>
        </>
      ):(
        <>
          <TextXs>No Current Subscription</TextXs>
        </>
      )}

      <Divider my={2}/>
      <Heading as='h3' size='md'>Payment Method</Heading>

      {!lui.payMethod.pm_id ? (
        <BtnXs onClick={setPaymentMethod}>Add Payment Method</BtnXs>
      ) : (
        <HFlex gap={2}>
          <VisaIcon h='auto' w='30px'/>
          <Box>•••• {lui.payMethod.last4}</Box>
          <BtnXs onClick={setPaymentMethod}>Update Payment Method</BtnXs>
        </HFlex>
      )}

      <Divider my={2}/>

      {lui.payMethod.pm_id && (!lui.plan.sub_id) && (<>
        <HFlex gap={2}>
          <BtnXs bgColor='#DDD' sx={sxPlanStandard} onClick={()=>setPlan('standard')}>Standard</BtnXs>
          <BtnXs bgColor='#DDD' sx={sxPlanPremium} onClick={()=>setPlan('premium')}>Premium</BtnXs>
        </HFlex>
        <BtnXs onClick={createSubscr}>Pay and Start Subscription</BtnXs>
      </>)}

      {lui.payMethod.pm_id && (lui.plan.sub_id) && (lui.plan.status !== 'active') && (<>
      {lui.plan.status === 'past_due' &&(<Badge colorScheme='red' w='fit-content'>Past due</Badge>)}

        <BtnXs onClick={payLatestInvoice}>Make a payment</BtnXs>
      </>
      )}



      <SimpleGrid mt={4} spacing={3} columns={1} w='200px'>
        <Button onClick={authState().fetchLnpUserInfo}>Refresh</Button>
      </SimpleGrid>
      {/* <Box>isOpen: {appState().stripeIntentModalIsOpen}</Box> */}
      {/* <Box>clientSecret: {clientSecret}</Box> */}
      <Box>{appState().stripeIntentModalStatusMessage}</Box>
    </VFlex>
    <ApiKeyModal/>
    <StripeIntentModal/>
  </>);
}

