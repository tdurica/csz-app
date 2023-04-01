const [__,__E,__W] = [console.log,console.error,console.warn];
import { create } from 'zustand';
import produce from 'immer';

export const usePayment = create((set, get) => {
  const _s=(fn)=>set(produce(fn))
  return {
    lnpUserNewApiKey:'',
    init: async() => {

    },
    retrieveSubscriptionById: async (sub_id) => {
      __(`in retrieveSubscriptionById`);
      const response = await fetch(`http://localhost:3002/api/stripe-retrieve-subscription`, {
        method: "POST",
        body: JSON.stringify({ sub_id }),
        headers: { "Content-Type": "application/json" },
      }).then(async (r)=> {
        const json = await r.json(); return json.message
      });
      console.log(`retrieveSubscriptionById:`,response)
      return response
    },
    retrievePaymentIntent: async (client_secret) => {
      __(`in retrievePaymentIntent`);
      const response = await fetch(`https://api.stripe.com/v1/payment_intents/${client_secret}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }).then(r=>r.json());
      if(response.error){
        return response.error;
      }else if(response.paymentIntent){
        return response.paymentIntent;
      }else{
        __('could not retrievePaymentIntent: ', response)
        return false
      }
    },
    createSubscription: async (product) => {
      __(`in useAuth.createSubscription`);
      await get().user.getIdToken(true)
      const user = get().user;
      const email = user.email
      const jwt = user.accessToken
      const uid = user.uid
      const response = await fetch(`http://localhost:3002/api/stripe-create-subscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jwt, product }),
      }).then(async (r)=> {
        const json = await r.json(); return json.message
      });
      __(`/stripe-create-subscription:`,response)
      return response
    },
    payLatestInvoice: async () => {
      __(`in useAuth.payLatestInvoice`);
      await get().user.getIdToken(true)
      const user = get().user;
      const jwt = user.accessToken
      const response = await fetch(`http://localhost:3002/api/stripe-pay-latest-invoice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jwt }),
      }).then(async (r)=> {
        const json = await r.json(); return json.message
      });
      __(`/stripe-pay-latest-invoice:`,response)
      return response
    },
    cancelSubscription: async () => {
      __(`in useAuth.cancelSubscription`);
      await get().user.getIdToken(true)
      const jwt = get().user.accessToken;
      const response = await fetch(`http://localhost:3002/api/stripe-cancel-subscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jwt }),
      }).then(async (r)=> {const json = await r.json();return json.message});
      __(`/stripe-cancel-subscription:`,response)
      return response
    },
    changeSubscription: async () => {
      __(`in useAuth.changeSubscription`);
      await get().user.getIdToken(true)
      const jwt = get().user.accessToken
      const response = await fetch(`http://localhost:3002/api/stripe-change-subscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jwt }),
      }).then(async (r)=> {
        const json = await r.json();
        return json.message
      });
      __(`/stripe-change-subscription:`,response)
      return response
    },
    createSetupIntent: async (product=false) => {
      __(`in useAuth.createIntent`);
      await get().user.getIdToken(true)
      const user = get().user;
      const jwt = user.accessToken
      const response = await fetch(`http://localhost:3002/api/stripe-create-setup-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jwt }),
      }).then(async (r)=> {
        const json = await r.json(); return json.message
      });
      __(`/stripe-create-setup-intent:`,response)
      return response
    },
    createPaymentIntent: async (product=false) => {
      __(`in useAuth.createIntent`);
      await get().user.getIdToken(true)
      const user = get().user;
      const jwt = user.accessToken
      const response = await fetch(`http://localhost:3002/api/stripe-create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jwt }),
      }).then(async (r)=> {
        const json = await r.json(); return json.message
      });
      __(`/stripe-create-setup-intent:`,response)
      return response
    },
    generateNewApiKey: async () => {
      __(`in useAuth.generateNewApiKey`);
      await get().user.getIdToken(true)
      const jwt = get().user.accessToken
      const response = await fetch(`http://localhost:3002/api/generate-new-api-key`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jwt }),
      }).then(async (r)=> {
        const json = await r.json();
        return json.message
      });
      __(`/generate-new-api-key:`,response)
      set({lnpUserNewApiKey:response})
      return response
    },
  }});

export const paymentState = ()=>usePayment.getState();
