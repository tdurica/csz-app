import React, {useEffect, useCallback, useRef, useState} from "react";
import {Box, Button, Center, Flex, HStack, Image, Input, SimpleGrid} from "@chakra-ui/react";
import Select from 'react-select';
import {HFlexSC, VFlex} from "views/bits/UtilityTags";
import {useAuth} from "services/useAuth";
import {enumCurrencies} from "data/constants";

export default function AcctLinksAdder(){
  const [showLinkAddForm, setShowLinkAddForm] = useState(false);
  const [ddValue, setDdValue] = useState(null);
  const userAcctLinks = useAuth(s=>s.user.acctLinks)
  const addrElmt = useRef(null)
  const submitNewLink = ()=>{
    const itemsMod = [
      {
        currency: JSON.parse(ddValue.value),
        addr: addrElmt.current.value,
        show:true,
        hitCount: 0
      },
      ...userAcctLinks
    ];
    useAuth.getState()._updateUser({acctLinks:itemsMod}).then()

  }
  const selectOpts = useCallback(enumCurrencies.map((v,i,a)=>{
    return {label:`${v.label} (${v.symbol})`, value:JSON.stringify(v)}
  }),[])

  return (<>
    <HFlexSC gap={3}>
      <Button variant='solidPink' color='white' fontSize='16px'
              onClick={()=>setShowLinkAddForm(!showLinkAddForm)}>
        {!showLinkAddForm?'+ Add Account':'Cancel'}
      </Button>
      {/*<Button variant='outlinePink' w='160px' fontSize='16px'>+ Add Embed</Button>*/}
    </HFlexSC>
    {showLinkAddForm && (<Box border='1px solid gray' borderRadius='7px' p={4}>
      <Box>Currency:
        <Select
          onChange={(v)=>{
            setDdValue(v)
          }}
          isClearable={true}
          isSearchable={true}
          options={selectOpts}
        />

        {/*<Select placeholder='Select Currency' ref={currencyElmt}>*/}
        {/*  {enumCurrencies.map((v,i)=>(<option key={i} value={JSON.stringify(v)}>{v.label}&nbsp;({v.symbol})</option>))}*/}
        {/*</Select>*/}
      </Box>
      <Box>Address: <Input ref={addrElmt}/></Box>
      <Button variant='outlinePink' w='100px' fontSize='16px' onClick={submitNewLink}>Submit</Button>
    </Box>)}
  </>)
}
