import React, {Component, useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {Box, Button, Center, Flex, HStack, Image, Input, SimpleGrid} from "@chakra-ui/react";
import Select from 'react-select';
import {BsInfoCircle} from "react-icons/bs";
import {HFlexSC, VFlex} from "views/bits/UtilityTags";
import {FaRegEye} from "react-icons/fa";
import {TbTarget} from "react-icons/tb";
import {RxDragHandleDots2} from "react-icons/rx";
import {useAuth} from "services/useAuth";
import BTCpng from 'assets/logos-other/bscscan-logo.png'
import ETHpng from 'assets/logos-other/tg-channel.png'
import BNBpng from 'assets/logos-other/twitter-logo.png'
import ADApng from 'assets/logos-other/LinkedIn.png'
import USDTpng from 'assets/logos-other/dextools-logo.png'
import USDCpng from 'assets/logos-other/discord-logo.png'
import {enumSocLinksLabels} from "data/constants";
// fake data generator


export default function SocLinksAdder(){
  const [showLinkAddForm, setShowLinkAddForm] = useState(false);
  const [ddValue, setDdValue] = useState(null);
  const userSocLinks = useAuth(s=>s.user.socLinks)
  const urlElmt = useRef(null)
  const submitNewLink = ()=>{
    const itemsMod = [
      {
        label: ddValue.label,
        url: urlElmt.current.value,
        show:true,
        hitCount: 0
      },
      ...userSocLinks
    ];
    useAuth.getState()._updateUser({socLinks:itemsMod}).then()

  }

  const selectOpts = enumSocLinksLabels.map((v,i,a)=>{
    return {label:v, value:v}
  })

  return (<>
    <HFlexSC gap={3}>
      <Button variant='solidPink' color='white' fontSize='16px'
              onClick={()=>setShowLinkAddForm(!showLinkAddForm)}>
        {!showLinkAddForm?'+ Add Social Link':'Cancel'}
      </Button>
    </HFlexSC>
    {showLinkAddForm && (<Box border='1px solid gray' borderRadius='7px' p={4}>
      <Box>Link Type:
        <Select
          onChange={(v)=>{
            setDdValue(v)
          }}
          isClearable={true}
          isSearchable={true}
          options={selectOpts}
        />
          {/*{enumSocLinksLabels.map((v, i)=>(<option key={i} value={v}>{v}</option>))}*/}
      </Box>
      <Box>URL: <Input ref={urlElmt}/></Box>
      <Button variant='outlinePink' w='100px' fontSize='16px' onClick={submitNewLink}>Submit</Button>
    </Box>)}
  </>)
}

// Put the thing into the DOM!
