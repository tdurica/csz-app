/*eslint-disable*/
import React from "react";
import {Flex, Image, Link, List, ListItem, Text} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom';
import {HFlex, HFlexCC, VFlexCS} from "../bits/UtilityTags";
import BrandLogoTitle from "../../assets/CSZWhiteLogo.png";
import DiscordPng from 'assets/SMIcons/Discord.png'
import FacebookPng from 'assets/SMIcons/Facebook.png'
import InstagramPng from 'assets/SMIcons/Instagram.png'
import RedditPng from 'assets/SMIcons/Reddit.png'
import TelegramPng from 'assets/SMIcons/Telegram.png'
import TwitterPng from 'assets/SMIcons/Twitter.png'
export default function AppFooter(props) {
  // const linkTeal = "red.200"=
  return (
    <VFlexCS id='AppFooter'
             justifyContent="space-between"
             backgroundColor='black'
             px="20px"
             minHeight="250px"
             gap={6}
    >
      <HFlexCC mt={6} gap={6} flexWrap='wrap'>
        <Image src={BrandLogoTitle} h={['90px','90px','120px']} cursor='pointer' onClick={()=>{navigate('/')}}/>
        <HFlex gap={5}>
          <Image h='60px' src={DiscordPng}/>
          <Image h='60px' src={FacebookPng}/>
          <Image h='60px' src={InstagramPng}/>
          <Image h='60px' src={RedditPng}/>
          <Image h='60px' src={TelegramPng}/>
          <Image h='60px' src={TwitterPng}/>
        </HFlex>
      </HFlexCC>
      <List display="flex" my={{ base: "10px", xl: "15px" }}>
          <ListItem me={{ base: "20px", md: "44px", }}>
            <Text color="gray.400">
              &copy; {1900 + new Date().getYear()},{" "}
              {/* <Link */}
              {/*   as={NavLink} */}
              {/*   color="bog.600" */}
              {/*   to="/" */}
              {/*   target="_parent" */}
              {/* > */}
              {"CoinStarz"}
              {/* </Link> */}
            </Text>

          </ListItem>
          <ListItem me={{ base: "20px", md: "44px", }}>
            <Link href="#top"
                  target="_parent"
                  color="gray.400">
              {"Back to Top"}
            </Link>
          </ListItem>
          <ListItem me={{ base: "20px", md: "44px", }}>
            <Link to="/support" as={NavLink}
                  color="gray.400"
                  target="_parent"
            >
              {"Support"}
            </Link>
          </ListItem>
        </List>

    </VFlexCS>
  );
}
