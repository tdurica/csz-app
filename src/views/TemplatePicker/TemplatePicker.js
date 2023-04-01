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


export const templateDefs = [
  {
    label: 'Basics',
    sxContainer:{
      bgColor:'#FFF',
      color:'#555'
    },
    sxRow: {
      borderRadius:'30px',
      bgColor:'#FFF',
      color:'#555',
      shadow:'dark-lg'
    },
  },
  {
    label: 'Green Live',
    sxContainer:{
      bgColor:'#05697f',
      color:'#a6a6a6'
    },
    sxRow: {
      borderRadius:'3px',
      bgColor:'#2b8ea4',
      color:'#c0c0c0',
      shadow:'dark-lg'
    },
  },
  {
    label: 'Electric Blue',
    sxContainer:{
      bgColor:'#0074fd',
      color:'#ffffff'
    },
    sxRow: {
      borderRadius:'3px',
      bgColor:'#00c8ff',
      color:'#ffffff',
      shadow:'dark-lg'
    },
  },
  {
    label: 'Peach Dream',
    sxContainer:{
      bgColor:'#ffab8f',
      color:'#ffffff'
    },
    sxRow: {
      borderRadius:'3px',
      bgColor:'#f8c9ba',
      color:'#4f2e22',
      shadow:'dark-lg'
    },
  },
]
export default function TemplatePicker(){
  const activeTemplate = useAuth(s=>s.user.template)

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
  const FontBox = ({children})=>(<VFlexCC sx={{bgColor:'gray.50',borderRadius:'7px', border:'1px solid gray',h:'30px'}}><Text>{children}</Text></VFlexCC>);

  return (<><br/>
    <HFlex>
      <Heading size='md'>Themes</Heading>
      <Button ml={3 } size='sm' onClick={onSelectCreateYourOwn}>{showTplCreator?'Cancel':'Create'}</Button>
    </HFlex>
    {showTplCreator && (<VFlex border='1px solid gray' bgColor='gray.50' borderRadius='8px' p={3} my={3} w='600px'>
      <HFlexSC justify='space-between'><Heading size='md' my={1}>Create a Theme</Heading><Button size='sm' onClick={onSelectCreateYourOwn}>X</Button></HFlexSC>
      <Heading size='sm' my={3}>Background</Heading>
      <SimpleGrid columns={3} gap={10} maxWidth='600px'>
        <VFlexCC sx={{bgColor:'gray.600',borderRadius:'7px', h:'160px'}}><MdOutlinePalette size='25'/><Text>Flat Color</Text></VFlexCC>
        <VFlexCC sx={{bgColor:'gray.400',borderRadius:'7px', h:'160px'}}><MdGradient size='25'/><Text>Gradient</Text></VFlexCC>
        <VFlexCC sx={{bgColor:'gray.200',borderRadius:'7px', h:'160px'}}><MdImage size='25'/><Text>Upload Photo</Text></VFlexCC>
      </SimpleGrid>
      <HFlex gap={2} my={3}>
        <ColorWheelSvg boxSize={8} onClick={()=>{console.log('TODO: open picker')}}/>
        <Box sx={{bgColor:'#2743b7', boxSize:8, borderRadius:'50px'}}/>
        <Box sx={{bgColor:'#fd5f5f', boxSize:8, borderRadius:'50px'}}/>
        <Box sx={{bgColor:'#b333de', boxSize:8, borderRadius:'50px'}}/>
        <Box sx={{bgColor:'#ff7e4c', boxSize:8, borderRadius:'50px'}}/>
      </HFlex>
      <Heading size='sm' my={3}>Buttons</Heading>
      <SimpleGrid columns={3} gap={3} maxWidth='600px'>
        <Box sx={{bgColor:'black',borderRadius:'50px', h:'30px'}}/>
        <Box sx={{bgColor:'black',borderRadius:'7px', h:'30px'}}/>
        <Box sx={{bgColor:'black',borderRadius:'0', h:'30px'}}/>
        <Box sx={{bgColor:'white',borderRadius:'50px', h:'30px', border:'1px solid black'}}/>
        <Box sx={{bgColor:'white',borderRadius:'7px', h:'30px', border:'1px solid black'}}/>
        <Box sx={{bgColor:'white',borderRadius:'0', h:'30px', border:'1px solid black'}}/>
      </SimpleGrid>
      <HFlex gap={2} mt={3}>
        <ColorWheelSvg boxSize={8} onClick={()=>{console.log('TODO: open picker')}}/>
        <Box sx={{bgColor:'#2743b7', boxSize:8, borderRadius:'50px'}}/>
        <Box sx={{bgColor:'#fd5f5f', boxSize:8, borderRadius:'50px'}}/>
        <Box sx={{bgColor:'#b333de', boxSize:8, borderRadius:'50px'}}/>
        <Box sx={{bgColor:'#ff7e4c', boxSize:8, borderRadius:'50px'}}/>
      </HFlex>
      <Heading size='sm' my={3}>Fonts</Heading>
      <SimpleGrid columns={3} gap={3} maxWidth='600px'>
        <FontBox>Inter</FontBox>
        <FontBox>Poppins</FontBox>
        <FontBox>Rubik</FontBox>
        <FontBox>Open Sans</FontBox>
        <FontBox>Arial</FontBox>
        <FontBox>Quicksand</FontBox>
        <FontBox>Playfair Display</FontBox>
        <FontBox>Dax</FontBox>
      </SimpleGrid>

    </VFlex>)}
    <SimpleGrid columns={3} gap={3} maxWidth='600px'>
      {templateDefs.map((v,i)=>(
        <VFlex key={v.label} p={4} gap={4} borderRadius='7px'
               border={activeTemplate===v.label?'3px dashed pink':'none'}
               onClick={()=>{onSelectTemplate(v.label)}}
        >
          <VFlex sx={v.sxContainer} p={4} gap={4} borderRadius='7px'>
            <br/>
            <Box sx={v.sxRow} w='100%' h='20px'/>
            <Box sx={v.sxRow} w='100%' h='20px'/>
            <Box sx={v.sxRow} w='100%' h='20px'/>
            <Box sx={v.sxRow} w='100%' h='20px'/>
          </VFlex>
          <Center>{v.label}</Center>
        </VFlex>
      ))}
      <VFlex p={4} gap={4} onClick={onSelectCreateYourOwn} cursor='pointer'>
        <VFlexCC sx={{border:'2px dashed gray', borderRadius:'7px', textAlign:'center'}}
                 p={4} gap={4} h='100%'>
          Create your own
        </VFlexCC>
      </VFlex>
    </SimpleGrid>
  </>)
}

// Put the thing into the DOM!
