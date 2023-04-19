import { Link } from "react-router-dom";
import {HFlex, VFlex} from './bits/UtilityTags.js';
import {useCallback, useEffect, useState} from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading, Popover, PopoverTrigger, PopoverBody, PopoverCloseButton,
  PopoverContent, PopoverHeader, PopoverArrow,PopoverFooter,
  SimpleGrid,
  Switch, useBoolean
} from "@chakra-ui/react";
import AcctLinksDnD from "./LinksArranger/AcctLinksDnD";
import AcctLinksAdder from "./LinksArranger/AcctLinksAdder";
import TemplatePicker from "./TemplatePicker/TemplatePicker";
import SocLinksDnD from "./LinksArranger/SocLinksDnD";
import SocLinksAdder from "./LinksArranger/SocLinksAdder";
import {authState, useAuth} from "../services/useAuth";
import NftLinksAdder from "./LinksArranger/NftLinksAdder";
import NftLinksDnD from "./LinksArranger/NftLinksDnD";
import ColorPopover from "./bits/ColorPopover";
import PropSwitch from "./bits/PropSwitch";


export default function TbDesigner() {
  const showSocLinks = useAuth(s=>s.user.showSocLinks)
  const showTabAccs = useAuth(s=>s.user.showTabAccs)
  const showTabNfts = useAuth(s=>s.user.showTabNfts)
  const socLinksColor = useAuth(s=>s.user.socLinksColor)

  return (
    <VFlex>
      <PropSwitch heading='Show Social Link Icons' helpText='Toggle the link icons on your page.' propName='showSocLinks'/>
      {showSocLinks && (
        <VFlex gap={2}>
        <Heading size='sm'>Icon Color</Heading>
        <ColorPopover initColor={socLinksColor} path={'socLinksColor'} onSave={(savedColor)=>{
          useAuth.getState()._updatePaths({socLinksColor:savedColor}).catch()
        }}/>
        <SocLinksAdder/>
        <SocLinksDnD/>
        <br/>
      </VFlex>)}

      <PropSwitch heading='Show Accounts Tab' helpText='Toggle the accounts tab on your page.' propName='showTabAccs'/>
      {showTabAccs && (
        <VFlex gap={2}>
          <AcctLinksAdder/>
          <AcctLinksDnD/>
          <br/>
        </VFlex>
      )}
      <PropSwitch heading='Show NFT Tab' helpText='Toggle the NFT tab on your page.' propName='showTabNfts'/>
      {showTabNfts && (<VFlex gap={2}>
        <PropSwitch heading='' helpText='Make NFT Tab the first tab' propName='showTabNftsAsFirst'/>
        <NftLinksAdder/>
        <NftLinksDnD/>
      </VFlex>)}

      <TemplatePicker/>
    </VFlex>
  )
}
