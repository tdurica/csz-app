import React, {useCallback, useEffect, useRef, useState} from "react";
// import { Link } from "react-router-dom";
import {BtnCopyToClipboard, HFlex, HFlexCC, HFlexSC, TextXs, VFlex, VFlexCC, VFlexCS} from './bits/UtilityTags.js';
import {
  Box,
  Button,
  Center,
  Flex,
  Link,
  Image,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Portal,
  Heading, Avatar
} from "@chakra-ui/react";
import {SlSocialInstagram, SlSocialSpotify, SlSocialTwitter} from "react-icons/sl";
import {TfiEmail} from "react-icons/tfi";
import {CopyIcon, LinkIcon} from "@chakra-ui/icons";
import {CopyToClipboardButton} from "../hooks/CTCBButton";
import CryptoIcon from "../hooks/CryptoIcon/CryptoIcon";
import TbDesigner from "./TbDesigner";
import TbSettings from "./TbSettings";
import {abs0} from "./bits/cssHelpers";
import {useAuth} from "../services/useAuth";
import SocLinkIcon from "../hooks/SocLinkIcon/SocLinkIcon";
import {templateDefs} from "../data/templateDefs";
import {TbDotsVertical, TbGridDots, TbGripVertical} from "react-icons/tb";
import {MdOutlineMarkunreadMailbox} from "react-icons/md";
import {getBackgroundSx} from "./TemplatePicker/TemplatePicker";
import {clientOrigin, desktopSidebarWidth} from "../data/constants";
import {useMutationObservable} from "../hooks/useMutationObservable";

function AcctLinks({user, tpl}){
  return user.acctLinks.map((v, i, a) => v.show && (
      <SimpleGrid templateColumns='10% 80% 10%' key={'ppg' + i + v.currency.symbol + v.addr}
                  sx={{h: '44px', p: '3px', ...tpl.acctCardSpec}} my={2}>
        <Center align='center'>
          <CryptoIcon name={v.currency.symbol} size={24}/>
        </Center>
        <VFlex>
          <Box fontWeight='bold'>{v.currency.label}</Box>
          <Box fontSize='8px' fontFamily='fira, monospace'>{v.addr}</Box>
        </VFlex>
        <Center align='center'>
          <BtnCopyToClipboard code={v.addr}/>
        </Center>
      </SimpleGrid>
    ))
}
/*
* photo
* name
* greeting
* tablistTabs
* tablistTabSelected
*
* */
function NftLinks({user, cols, tpl}){
  return (<SimpleGrid columns={cols} spacing={2}>
    {user.nftLinks.map((v, i, a) => v.show && (
      <Link key={i} isExternal href={v.marketUrl} color='black'>
        <VFlex sx={{h: 'auto', p: '3px', alignItems: 'center', ...tpl.nftCardSpec}}>
          <Center align='center'>
            <Image src={v.imageUrl} />
          </Center>
          <Box fontSize='18px' wordBreak='break-word' fontFamily='raleway'>{v.label}</Box>
        </VFlex>
      </Link>
    ))}
    </SimpleGrid>)
}
function SocLinks({user, tpl}){
  return (user.socLinks.map((v, i, a) => {
    const vUrl = v.label==="Email" ? `mailto:${v.url}` : v.url;
      return v.show && (
        <HFlex key={i} sx={{h: 'auto', p: '3px', alignItems: 'center'}}>
          <Link isExternal href={vUrl}>
            <Center align='center' boxSize={26}>
              <SocLinkIcon size={24} name={v.label} iconSet='FlatSolid'/>
            </Center>
          </Link>
        </HFlex>
      )
    })
  )
}

// function TabWrap({user, tpl}){
//   return (
//     <Tabs>
//       <TabList>
//         <Tab>Accounts</Tab>
//         <Tab>NFTs</Tab>
//       </TabList>
//       <TabPanels>
//         <TabPanel>
//           <AcctLinks user={user} tpl={tpl}/>
//         </TabPanel>
//         <TabPanel>
//           <NftLinks user={user} tpl={tpl}/>
//         </TabPanel>
//       </TabPanels>
//     </Tabs>
//   )
//
// }
function scrollbarVisible(element) {
  return element.scrollHeight > element.clientHeight;
}

export default function PublicPage({user, liveMode=false}) {
  const tpl = user.template === 'Custom'
    ? user.customTpl
    : templateDefs.find(v=>v.label===user.template);
  const socLinksColor = user.socLinksColor ?? '#FFFFFF'
  const willShowSocLinks = user.showSocLinks && user.socLinks.length>0;
  const willShowAccts = user.showTabAccs && user.acctLinks.length>0;
  const willShowNfts = user.showTabNfts && user.nftLinks.length>0;
  const tablessMode = !!(!willShowAccts || !willShowNfts)
  const [tabIdx, setTabIdx] = useState(tablessMode ? 0 : user.showTabNftsAsFirst?1:0);
  const scrollableRef = useRef(null);
  const [scrollVis, setScrollVis] = useState('0');
  const bypassNsfwWarning = !!(!user.showNsfwWarning || !liveMode)
  const [passedNsfwWarning, setPassedNsfwWarning] = useState(bypassNsfwWarning);
  const [gridCols, setGridCols] = useState(3);


  const onAppMainMutation = useCallback((mutationList) => {
    if(scrollbarVisible(scrollableRef.current)){setScrollVis('1');
    }else{setScrollVis('0');}}, [setScrollVis]);

  useEffect(()=>{
    if(tablessMode){ setTabIdx(tablessMode ? 0 : user.showTabNftsAsFirst?1:0); }
  },[user])

  // if(scrollableRef.current){
    useMutationObservable(scrollableRef.current, onAppMainMutation);
  // }

  return (<>
    {passedNsfwWarning && (
      <Box ref={scrollableRef}
        sx={{
          height: '100%',
          overflowY: "scroll",
          overflowX: "hidden",
          paddingTop:'30px',
          display: 'flex',
          flexDirection: 'column',
          flexBasis: '100vh',
          //backgroundColor: `#000000`,//brand.bg
          backgroundColor: `rgba(17,22,35,${scrollVis})`,//brand.bg
          alignItems: 'center',
          "&::-webkit-scrollbar": {
            width: "6px",
            backgroundColor: 'inherit',
          },
          "&::-webkit-scrollbar-track": {
            width: "2px",
            backgroundColor: 'inherit',
          },
          "&::-webkit-scrollbar-thumb": {
            background: "blue.700",
            borderRadius: "24px",
          },
          ...abs0(),
          ...getBackgroundSx(tpl.backgroundSpec),
        }}>
        <VFlexCS gap={1} sx={{w: '360px', h: '100%', py: '12px'}}>
          {user.image && <Avatar size='xl' src={user.image}/>}
          <VFlexCS gap={1} sx={{...tpl.headlinesSpec.font, color: tpl.headlinesSpec.color}}>
            {user.name&&(<HFlexCC textAlign='center'>{user.name}</HFlexCC>)}
            {user.greeting&&(<HFlexCC textAlign='center'>{user.greeting}</HFlexCC>)}
          </VFlexCS>
          {willShowSocLinks && (
            <HFlexSC gap={1} fill={socLinksColor}>
              <SocLinks user={user} tpl={tpl}/>
              {/*<SlSocialInstagram style={{width: '26px', height: '26px'}}/>*/}
              {/*<SlSocialTwitter style={{width: '26px', height: '26px'}}/>*/}
              {/*<SlSocialSpotify style={{width: '26px', height: '26px'}}/>*/}
              {/*<TfiEmail style={{width: '26px', height: '26px'}}/>*/}
            </HFlexSC>
          )}
          {/*OLD WAY (manually implements "isFitted")*/}
          {/*<Tabs index={tabIdx} onChange={setTabIdx} sx={{display:'flex', w:'350px', alignItems:'center', flexDirection:'column'}}>*/}
          {/*  <TabList hidden={!willShowAccts || !willShowNfts} sx={{w:'100%', mb:'10px', justifyContent:'space-evenly'}}>*/}
          {/*<Tab flexGrow='1' flexBasis='50%' order={tablessMode ? 0 :user.showTabNftsAsFirst?1:0}>Accounts</Tab>*/}
          {/*<Tab flexGrow='1' flexBasis='50%' order={tablessMode ? 0 :user.showTabNftsAsFirst?0:1}>NFTs</Tab>*/}
          <Tabs size={tpl.tabsSpec.size || 'md'} colorScheme={tpl.tabsSpec.colorScheme} variant={tpl.tabsSpec.variant} isFitted index={tabIdx} onChange={setTabIdx} sx={{w:'350px'}}>
            <TabList hidden={!willShowAccts || !willShowNfts} sx={{mb:'10px'}} color={socLinksColor}>
              {/* REMINDER: css prop order={} is unrelated to/independent of tabIdx */}
              <Tab order={tablessMode ? 0 :user.showTabNftsAsFirst?1:0} color={socLinksColor}>Accounts</Tab>
              <Tab order={tablessMode ? 0 :user.showTabNftsAsFirst?0:1} color={socLinksColor}>NFTs</Tab>
            </TabList>
            <TabPanels sx={{display: 'flex', justifyContent: 'center'}}>
              {willShowAccts && (
                <TabPanel w='95%' p={0}>
                  <AcctLinks user={user} tpl={tpl}/>
                </TabPanel>
              )}
              {willShowNfts && (
                <TabPanel w='95%' p={0}>
                  <HFlex justify='center' mb={2} color={socLinksColor}>
                    <Button variant='link' isActive={gridCols===1} onClick={()=>{setGridCols(1)}}><TbDotsVertical color={socLinksColor}/></Button>
                    <Button variant='link' isActive={gridCols===2} onClick={()=>{setGridCols(2)}}><TbGripVertical color={socLinksColor}/></Button>
                    <Button variant='link' isActive={gridCols===3} onClick={()=>{setGridCols(3)}}><TbGridDots color={socLinksColor}/></Button>
                  </HFlex>
                  <NftLinks user={user} tpl={tpl} cols={gridCols}/>
                </TabPanel>
              )}
            </TabPanels>
          </Tabs>

          {/*<VFlexCC gap={3} mt={2} w='100%'>*/}
          {/*  <AcctLinks user={user} tpl={tpl}/>*/}
          {/*</VFlexCC>*/}

          <VFlexCC mt='auto' w='100%'>
            {user.showCszCredit && (<Link href={clientOrigin}>CoinStarz</Link>)}
          </VFlexCC>
        </VFlexCS>
    </Box>)}
    {liveMode && user.showNsfwWarning && !passedNsfwWarning && (
      <Portal>
        <VFlexCC sx={{...abs0(), position:'fixed', bgColor:'white',}} gap={3}>
          <Heading size='md'>NSFW Content</Heading>
          <Box sx={{w: '300px', h: '200px', p:'8px', bgColor:'gray.100', border:'1px solid gray', borderRadius:'7px'}}>
            The user who created the page you're about to view
            has provided this warning regarding NSFW content.
            Are you sure you want to view the page?
          </Box>
          <Button onClick={()=>setPassedNsfwWarning(true)}>I'm sure!</Button>
        </VFlexCC>
      </Portal>
    )}
  </>)
}
