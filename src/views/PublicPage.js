import { Link, useLoaderData } from "react-router-dom";
import {HFlexCC, HFlexSC, TextXs, VFlex, VFlexCC, VFlexCS} from './bits/UtilityTags.js';
import {Box, Center, Image, SimpleGrid} from "@chakra-ui/react";
import {SlSocialInstagram, SlSocialSpotify, SlSocialTwitter} from "react-icons/sl";
import {TfiEmail} from "react-icons/tfi";
import CurrencyIcon from "./LinksArranger/CurrencyIcon";
import React from "react";
import {templateDefs} from "./TemplatePicker/TemplatePicker";

export default function PublicPage({user}) {
  const tpl = templateDefs.find(v=>v.label===user.template)

  return (
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
  )
}
