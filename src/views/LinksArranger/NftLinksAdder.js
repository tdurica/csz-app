import React, {useEffect, useRef, useState} from "react";
import {Box, Button, Center, Flex, HStack, Image, Input, SimpleGrid} from "@chakra-ui/react";
import {HFlexSC, VFlex} from "views/bits/UtilityTags";
import {useAuth} from "services/useAuth";

export default function NftLinksAdder(){
  const [showLinkAddForm, setShowLinkAddForm] = useState(false);
  const userNftLinks = useAuth(s=>s.user.nftLinks)
  const labelElmt = useRef(null)
  const imageUrlElmt = useRef(null)
  const marketUrlElmt = useRef(null)
  const submitNewLink = ()=>{
    const itemsMod = [
      {
        label: labelElmt.current.value,
        imageUrl: imageUrlElmt.current.value,
        marketUrl: marketUrlElmt.current.value,
        show:true,
        hitCount: 0
      },
      ...userNftLinks
    ];
    useAuth.getState()._updateUser({nftLinks:itemsMod}).then()

  }

  return (<>
    <HFlexSC gap={3}>
      <Button variant='solidPink' color='white' fontSize='16px'
              onClick={()=>setShowLinkAddForm(!showLinkAddForm)}>
        {!showLinkAddForm?'+ Add NFT':'Cancel'}
      </Button>
    </HFlexSC>
    {showLinkAddForm && (<Box border='1px solid gray' borderRadius='7px' p={4}>
      {/*<Box>Currency:*/}
      {/*  <Select placeholder='Select Currency' ref={currencyElmt}>*/}
      {/*    {enumCurrencies.map((v,i)=>(<option key={i} value={JSON.stringify(v)}>{v.label}&nbsp;({v.symbol})</option>))}*/}
      {/*  </Select>*/}
      {/*</Box>*/}
      <Box>Label: <Input ref={labelElmt}/></Box>
      <Box>Image URL: <Input ref={imageUrlElmt}/></Box>
      <Box>Marketplace URL: <Input ref={marketUrlElmt}/></Box>
      <Button variant='outlinePink' w='100px' fontSize='16px' onClick={submitNewLink}>Submit</Button>
    </Box>)}
  </>)
}
