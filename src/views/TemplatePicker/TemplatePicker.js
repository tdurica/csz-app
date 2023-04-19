import React, {Component, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {Box, Button, Center, Flex, Heading, HStack, Image, SimpleGrid, Text} from "@chakra-ui/react";
import {BsInfoCircle} from "react-icons/bs";
import {HFlex, HFlexSC, VFlex, VFlexCC} from "../bits/UtilityTags";
import {FaPallet} from "react-icons/fa";
import {MdGradient, MdImage, MdOutlinePalette} from "react-icons/md";
import {useAuth} from "../../services/useAuth";
import {ColorWheelSvg} from "../../assets/Brand";
import TemplateCreator from "./TemplateCreator";
import {templateDefs} from "../../data/templateDefs";

export function getBackgroundSx(backgroundSpec){
  const {bgType,bgFlatColor,bgGrdColor1,bgGrdColor2,bgGrdDir,bgImage} = backgroundSpec;
  if(bgType==='flat'){
    return {bgColor: bgFlatColor}
  }
  if(bgType==='gradient'){
    return {bgGradient: `linear(${bgGrdDir}, ${bgGrdColor1}, ${bgGrdColor2})`}
  }
  if(bgType==='photo'){
    return {
      bgImage:`url('${bgImage}')`,
      bgPosition:'center', bgSize:'cover',
      bgRepeat:'no-repeat'
    }
  }
}

export default function TemplatePicker(){
  const activeTemplate = useAuth(s=>s.user.template)
  const customTpl = useAuth(s=>s.user.customTpl)

  const [showTplCreator, setShowTplCreator] = useState();
  const [items, setItems] = useState();
  const [cards, setCards] = useState()

  useEffect(()=>{
  },[])
  const onSelectTemplate = (label) => {
    useAuth.getState()._updateUser({template:label}).then()
  }
  const onSelectCreateYourOwn = () => {
    setShowTplCreator(!showTplCreator)
  }
  return (<>
    <br/>
    <HFlex>
      <Heading size='md' mb={3}>Themes</Heading>
      <Button ml={3} size='sm' onClick={onSelectCreateYourOwn}>{showTplCreator?'Cancel':'Create'}</Button>
    </HFlex>
    {showTplCreator && (<TemplateCreator onClose={onSelectCreateYourOwn}/>)}
    <SimpleGrid columns={3} gap={3} maxWidth='600px'>
      <VFlex p={4} gap={4} borderRadius='7px'
             border={activeTemplate==="Custom"?'3px dashed pink':'none'}
             onClick={()=>{onSelectTemplate("Custom")}}
      >
        <VFlex sx={getBackgroundSx(customTpl.backgroundSpec)} p={4} gap={4} borderRadius='7px'>
          <br/>
          <Box sx={customTpl.acctCardSpec} w='100%' h='20px'/>
          <Box sx={customTpl.acctCardSpec} w='100%' h='20px'/>
          <Box sx={customTpl.acctCardSpec} w='100%' h='20px'/>
          <Box sx={customTpl.acctCardSpec} w='100%' h='20px'/>
        </VFlex>
        <Center>Custom</Center>
      </VFlex>
      {templateDefs.map((v,i)=> {
        const {bgType,bgFlatColor,bgGrdColor1,bgGrdColor2,bgGrdDir,bgImage} = v.backgroundSpec
        return (
          <VFlex key={v.label} p={4} gap={4} borderRadius='7px'
                 border={activeTemplate === v.label ? '3px dashed pink' : 'none'}
                 onClick={() => {
                   onSelectTemplate(v.label)
                 }}
          >
            <VFlex sx={getBackgroundSx(v.backgroundSpec)} p={4} gap={4} borderRadius='7px'>
              <br/>
              <Box sx={v.acctCardSpec} w='100%' h='20px'/>
              <Box sx={v.acctCardSpec} w='100%' h='20px'/>
              <Box sx={v.acctCardSpec} w='100%' h='20px'/>
              <Box sx={v.acctCardSpec} w='100%' h='20px'/>
            </VFlex>
            <Center>{v.label}</Center>
          </VFlex>
        )
      })}
    </SimpleGrid>
  </>)
}
