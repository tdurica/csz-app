import { create } from 'zustand';
import produce from 'immer';
import {authState} from "./useAuth";

export const useAppStore = create((set,get) => ({
  appNavDrawerOpen:false,
  set_appNavDrawerOpen: async (bOpen) => {
    set({appNavDrawerOpen:bOpen});
  },

  apiKeyModalIsOpen:false,
  set_apiKeyModalIsOpen: (bOpen) => {
    set({apiKeyModalIsOpen:bOpen});
  },

  stripeIntentModalIsOpen:false,
  //paymentIntent | setupIntent
  stripeIntentModalClientSecret:'',
  stripeIntentModalStatusMessage:'',
  loadStripeIntentModal: () => {
    authState().createSetupIntent().then((res)=>{
      set({stripeIntentModalClientSecret:res.client_secret});
      set({stripeIntentModalIsOpen:true});
    }).catch((err)=>{
      console.error(`stripeIntentModal err`, err)
      set({
        stripeIntentModalStatusMessage:
          'Could not communicate with server, please try again, or try later.'
      })
    })

  },
  closeStripeIntentModal: () => {
    set({stripeIntentModalClientSecret:''});
    set({stripeIntentModalIsOpen:false});
    // set({stripeIntentModalStatusMessage:''})
  },
  set_stripeIntentModalIsOpen: (bOpen, type) => {
    set({stripeIntentModalIsOpen:bOpen});
  },

  authModalIsOpen:false,
  authModalTabIndex: 0,
  set_authModalIsOpen: async (bOpen, openTab) => {
    if(openTab){
      set({
        authModalTabIndex: {
          'login':0,
          'signup':1,
        }[openTab]
      })
    }
    set({authModalIsOpen:bOpen});
  },

  _s: (fn) => set(produce(fn)),
}))

export const appState = ()=>useAppStore.getState();
