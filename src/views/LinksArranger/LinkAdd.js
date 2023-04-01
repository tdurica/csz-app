import React, {Component, useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {Box, Button, Center, Flex, HStack, Image, Input, Select, SimpleGrid} from "@chakra-ui/react";
import {BsInfoCircle} from "react-icons/bs";
import {HFlexSC, VFlex} from "../bits/UtilityTags";
import {FaRegEye} from "react-icons/fa";
import {TbTarget} from "react-icons/tb";
import {RxDragHandleDots2} from "react-icons/rx";
import {useAuth} from "../../services/useAuth";
import BTCpng from 'assets/logos-other/bscscan-logo.png'
import ETHpng from 'assets/logos-other/tg-channel.png'
import BNBpng from 'assets/logos-other/twitter-logo.png'
import ADApng from 'assets/logos-other/LinkedIn.png'
import USDTpng from 'assets/logos-other/dextools-logo.png'
import USDCpng from 'assets/logos-other/discord-logo.png'
// fake data generator


export default function LinkAdd(){
  const [showLinkAddForm, setShowLinkAddForm] = useState(false);
  const userExtLinks = useAuth(s=>s.user.extLinks)
  const currencyElmt = useRef(null)
  const addrElmt = useRef(null)
  const submitNewLink = ()=>{
    const itemsMod = [
      {
        currency: currencyElmt.current.value,
        addr: addrElmt.current.value,
        show:true,
        hitCount: 0
      },
      ...userExtLinks
    ];
    useAuth.getState()._updateUser({extLinks:itemsMod}).then()

  }

  return (<>
    <HFlexSC gap={3}>
      <Button variant='solidPink' color='white' fontSize='16px'
              onClick={()=>setShowLinkAddForm(!showLinkAddForm)}>
        {!showLinkAddForm?'+Add Address':'Cancel'}
      </Button>
      <Button variant='outlinePink' w='160px' fontSize='16px'>+ Add Embed</Button>
    </HFlexSC>
    {showLinkAddForm && (<Box border='1px solid gray' borderRadius='7px' p={4}>
      <Box>Currency:
        <Select placeholder='Select Currency' ref={currencyElmt}>
          <option value='Bitcoin (BTC)'>Bitcoin (BTC)</option>
          <option value='Ethereum (ETH)'>Ethereum (ETH)</option>
          <option value='Binance coin (BNB)'>Binance coin (BNB)</option>
          <option value='Cardano (ADA)'>Cardano (ADA)</option>
          <option value='Tether (USDT)'>Tether (USDT)</option>
          <option value='USD Coin (USDC)'>USD Coin (USDC)</option>
        </Select>
      </Box>
      <Box>Address: <Input ref={addrElmt}/></Box>
      <Button variant='outlinePink' w='100px' fontSize='16px' onClick={submitNewLink}>Submit</Button>
    </Box>)}
  </>)
}

// Put the thing into the DOM!
