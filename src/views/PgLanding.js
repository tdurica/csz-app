import {
  Box,
  Button, Card, CardBody, CardFooter, CardHeader,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  Portal, SimpleGrid,
  Stack,
  Text,
  useTheme, chakra, Divider, Spacer,
} from '@chakra-ui/react';
import React from 'react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import AppNav from './navs/AppNav.js';
import {HFlex, VFlex, VFlexCC} from './bits/UtilityTags.js';
import BignetPng from "assets/pictures/bignet.png";
import HoCSZPng from "assets/HoCSZ.png";
import HoIGPng from "assets/HoIG.png";
import FedCSZPng from "assets/FedCSZ.png";
import CreatorsPng from "assets/Creators.png";
import BigonePng from "assets/pictures/bigone.png";
import BoatPng from "assets/pictures/boat.png";
import LassoPng from "assets/pictures/lasso.png";
import MenuiconPng from "assets/pictures/menuicon.png";
import ModeratePng from "assets/pictures/moderate.png";
import SignificantPng from "assets/pictures/significant.png";
import SmallnetPng from "assets/pictures/smallnet.png";
import AppFooter from './navs/AppFooter.js';
import {motion, AnimatePresence} from "framer-motion";
import {useAppStore} from "../services/useAppStore";

export default function PgLanding() {
  const nav = useNavigate()
  const theme = useTheme()
  const limitWidth = {
    base:'98%',
    md:'95%',
    lg:'860px',
  }
  const Spacer = ()=>(<Box sx={{
    bgGradient:'linear(90deg,  blue.900, black)',
    shadow:'0px 0px 11px 11px black',
    h:'20px',w:'100%', zIndex:'1',
  }} />);
  return (
    // <Flex flexDirection="column" flexGrow='1' pt="75px">


      <>
        <Flex w='100%' h='90px' bgGradient='linear(90deg,  #271457, #3c2283)' shadow='0px 0px 14px 14px black' zIndex='1'/>

        <VFlexCC w='100%' id='top' bgGradient='linear(0deg,  blue.950, blue.750)' color={'white'}>
          <HStack w={limitWidth} my={10} h={'700px'} justify={'center'}>

            <VFlex w='50%' textAlign='center' gap={8} align='center'>
              <Heading size='lg'>GET PAID WITH CRYPTO NOW</Heading>
              <Text>
                We support stars, online and offline,<br/>
                who produce high quality content.
              </Text>
              <HFlex flexWrap='wrap' justify='center' gap='15px'>
                <Button variant='feature'>Pitchdeck</Button>
                <Button variant='feature'>Join Our Telegram</Button>
              </HFlex>
              <Button variant='solidPink'>Buy CoinStarz Tokens</Button>
            </VFlex>
            <Flex alignItems='center' w='50%'>
              <AnimatePresence>
                <motion.img
                  style={{zIndex: '1', height: '400px', position:'absolute'}}
                  key={HoCSZPng} src={HoCSZPng}
                  initial={{x: 300, opacity: 0}}
                  animate={{x: 140, opacity: 1}}
                  transition={{ease: "linear", duration: 2}}
                />
                <motion.img
                  style={{zIndex: '1', height: '400px', position:'absolute'}}
                  key={HoIGPng} src={HoIGPng}
                  initial={{x: 300, opacity: 0}}
                  animate={{x: 0, opacity: 1}}
                  transition={{ease: "linear", duration: 3}}
                />
              </AnimatePresence>
            </Flex>

          </HStack>
        </VFlexCC>

        <Spacer/>

        <VFlexCC w='100%' bgGradient='linear(#F2587A, black)' color={'white'}>
          <HStack w={limitWidth} my={10} h={'700px'} justify={'center'}>

            <VFlex w='50%' textAlign='center' gap={8} align='center'>
              <chakra.em size='lg'>What is CoinStarz?</chakra.em>
              <Heading size='lg'>CoinStarz Platform</Heading>
              <Text>
                CoinStarz makes Crypto and NFTs easier to use.
              </Text>
              <Text>
                We provide a platform to help you put all of your
                crypto addresses in one place: making it easier
                for you to accept many various Cryptos or trade NFTs.
              </Text>
              <Text>
                Everyone can be a star and start accepting crypto today!
              </Text>
              <Button variant='solidPink' onClick={()=>{
                useAppStore.getState().set_authModalIsOpen(true, 'signup')
              }}>Sign Up</Button>
            </VFlex>
            <Flex alignItems='center' w='50%'>
              <AnimatePresence>
                <motion.img
                  style={{zIndex: '1', height: '400px', position:'absolute'}}
                  key={FedCSZPng} src={FedCSZPng}
                  initial={{x: 300, opacity: 0}}
                  animate={{x: 0, opacity: 1}}
                  transition={{ease: "linear", duration: 2}}
                />
              </AnimatePresence>
            </Flex>

          </HStack>
        </VFlexCC>

        <Spacer/>

        <VFlexCC w='100%' bgGradient='linear(210deg,#160b32 20%, #D058D0)' color={'white'}>
          <HStack w={limitWidth} my={10} h={'700px'} justify={'center'}>

            <VFlex w='50%' textAlign='center' gap={8} align='center'>
              <chakra.em size='lg'>Coming Soon!</chakra.em>
              <Heading size='lg'>CoinStarz Token</Heading>
              <Text>
                Receive your crypto directly, with no middleman,
                banking app, or website that gets a cut of your
                hard-earned pay.
              </Text>
              <Text>
                You will only need ONE click to our platform to display
                all the cryptocurrencies that you accept, with all of
                their corresponding addresses, ready to go.
              </Text>
              <Button variant='solidPink' onClick={()=>{
                // useAppStore.getState().set_authModalIsOpen(true, 'signup')
              }}>Token Info</Button>
            </VFlex>
            <Flex alignItems='center' w='50%'>
              <AnimatePresence>
                <motion.img
                  style={{zIndex: '1', height: '400px', position:'absolute'}}
                  key={CreatorsPng} src={CreatorsPng}
                  initial={{x: 300, opacity: 0}}
                  animate={{x: 0, opacity: 1}}
                  transition={{ease: "linear", duration: 2}}
                />
              </AnimatePresence>
            </Flex>

          </HStack>
        </VFlexCC>

        <Spacer/>

        <VFlexCC w='100%' bgGradient='linear(90deg, #F2587A, #160b32)' color={'white'}>
          <HStack w={limitWidth} my={10} h={'700px'} justify={'center'}>

            <VFlex w='50%' textAlign='center' gap={8} align='center'>
              <Heading size='lg'>Ready to start accepting crypto?</Heading>
              <Text>
                Crypto as a payment method is inevitable.
                You want to be on the leading-edge of this
                highly innovative frontier.
              </Text>
              <Button variant='solidPink' onClick={()=>{
                useAppStore.getState().set_authModalIsOpen(true, 'signup')
              }}>Token Info</Button>
            </VFlex>
          </HStack>
        </VFlexCC>

        <Spacer/>

        <AppFooter />


      </>

  );
}
