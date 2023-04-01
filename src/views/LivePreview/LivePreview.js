import React, {useEffect, useState} from "react";
import {HFlexSC, HFlexCC, TextXs, VFlex, VFlexCC, VFlexCS} from 'views/bits/UtilityTags.js';
import {Box, Button, Center, Image, Input, Radio, RadioGroup, SimpleGrid, Switch} from "@chakra-ui/react";
import {useAuth} from "services/useAuth";
import {templateDefs} from "../TemplatePicker/TemplatePicker";
import {ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";
import {SlSocialInstagram, SlSocialSpotify, SlSocialTwitter} from "react-icons/sl";
import {TfiEmail} from "react-icons/tfi";
import CurrencyIcon from "../LinksArranger/CurrencyIcon";

const sxPreviewWrapper = {
  w: '180px',
  h: '275px',
  position: 'fixed',
  right: '50px',
  top: '200px',
  borderRadius: '10px',
  overflow: 'scroll',
  border: '7px solid black',
  "&::-webkit-scrollbar": {width: "0",},
  boxSizing: 'content-box',
}
const Scaler = ({pct, children})=>(<Box sx={{transform:`scale(${pct}%)`,
  position: 'absolute', top: '-50%', right: '-50%', bottom: '-50%', left: '-50%'}}>{children}</Box>)
export default function LivePreview() {
  const user = useAuth(s=>s.user)
  const [showPreview, setShowPreview] = useState(true);
  const tpl = templateDefs.find(v=>v.label===user.template)
  return (<>

    <Button sx={{w:'12px', h:'40px', position:'fixed', right:'0px', top:'200px', bgColor:'gray.400', borderRadius:'10px 0 0 10px'}}
    onClick={()=>setShowPreview(!showPreview)}>
      {showPreview ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
    </Button>

    {showPreview && (
      <VFlexCS sx={sxPreviewWrapper} id='preview-wrapper'>
        <Scaler pct={50}>
          <VFlexCS gap={1} sx={{w:'100%',h:'auto', py:'12px',...tpl.sxContainer}}>
            {user.image && <Image borderRadius={50} boxSize={16} src='https://picsum.photos/20'/>}
            <HFlexCC><TextXs>{user.name}</TextXs></HFlexCC>
            <HFlexCC><TextXs>{user.greeting}</TextXs></HFlexCC>
            <HFlexSC gap={1}>
              <SlSocialInstagram style={{width:'26px', height:'26px'}}/>
              <SlSocialTwitter style={{width:'26px', height:'26px'}}/>
              <SlSocialSpotify style={{width:'26px', height:'26px'}}/>
              <TfiEmail style={{width:'26px', height:'26px'}}/>
            </HFlexSC>
            <VFlexCC gap={3} mt={2} w='100%'>
              {user.extLinks.map((v, i, a) => (
                <SimpleGrid key={i} sx={{w:'95%',h:'30px', p:'3px', ...tpl.sxRow}}>
                  <Center align='center'>
                    <CurrencyIcon currency={v.currency}/>
                  </Center>
                  <VFlex>
                    <Box fontWeight='bold'>{v.currency}</Box>
                    <Box fontSize='6px'>{v.addr}</Box>
                  </VFlex>
                  <Center align='center'>
                    <CurrencyIcon currency={v.currency}/>
                  </Center>
                </SimpleGrid>
              ))}
            </VFlexCC>
          </VFlexCS>
        </Scaler>
      </VFlexCS>
    )}
  </>)
}
