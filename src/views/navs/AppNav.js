import {
  Box, Portal,Center,
  Link, Button, Image, MenuButton, Menu, MenuList, MenuDivider, MenuItem, Avatar,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { HFlexCC, IBtn, VFlexCC } from '../bits/UtilityTags.js';
import { NavLink, useNavigate,Outlet, useLocation,  } from 'react-router-dom';
import { useDeviceMode } from '../../theme/foundations/breakpoints.js';
import { FaUserCircle } from 'react-icons/fa';
// import { useAtom } from 'jotai';
// import { appNavDrawerOpenAtom } from '../../services/atoms.js';
import BrandLogoTitle from "assets/CSZWhiteLogo.png";
// import BrandLogo from "assets/logos/brand-logo.svg";
// import { CISVG_FrogeNavBack } from '../../assets/Brand.js';
import { useAppStore } from '../../services/useAppStore.js';
import {ExternalLinkIcon, HamburgerIcon} from '@chakra-ui/icons';
import { useAuth, authState } from '../../services/useAuth.js';
import AuthModal from '../auth/AuthModal.js';
import {createBrowserHistory} from "history";
const history = createBrowserHistory();


export default function AppNav(props) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(`loc: `, location);
  const [isMobile, isDesktop] = useDeviceMode()
  const isAuthenticated = useAuth(s=>s.isAuthenticated)
  const user = useAuth(s=>s.user)
  // const [get_appNavDrawerOpen, set_appNavDrawerOpen] = useAtom(appNavDrawerOpenAtom)
  // const [get_fixedRightDist, set_fixedRightDist] = useState('10px')

  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
  let navbarColor = "transparent";
  let navbarBg = "none";
  let navbarBorder = "transparent";
  let paddingX = "15px";
  const adminRoutes = ['/dash','/settings','/subscriptions','/wallet-history','/wallet-history',]
  const sxNavBtn = {
    color: 'global.bg',
    bgColor: 'gray.300',
    h: '2.5rem', w: '2.5rem',
    borderRadius: '7px',
    _hover: { bgColor: 'gray.500', },
  }
  return (<>
      <Portal>
        <Box zIndex='1000' position="fixed" w='100vw' top="0" left="0" right="0">

          <HFlexCC id="__AppNavbar" justify='space-between' top="10px" right="24px">
            <Image src={BrandLogoTitle} h={['70px','70px','90px']} cursor='pointer' onClick={()=>{navigate('/')}}/>
            <HFlexCC mr={3}>
              {adminRoutes.indexOf(location.pathname)<0 &&
                <Link href='downloads/CoinStarz Pitchdeck 1.83.docx.pdf' isExternal mr={3}>
                  Pitch Deck <ExternalLinkIcon mt={-1}/>
                </Link>
              }

              {isAuthenticated ? (<>
                  {adminRoutes.indexOf(location.pathname)<0 ? (<>
                    <Link as={NavLink} to="/dash" mr={3} color='gray.550'>Dashboard</Link>
                  </>) : (<>
                    <Link as={NavLink} to="/dash" mr={3} color='gray.550'>Dashboard</Link>
                    <Link as={NavLink} to="/wallet-history" mr={3} color='gray.550'>Wallet History</Link>
                  </>)}
                  <Menu>
                    <MenuButton as={Center} cursor={'pointer'}>
                      <IBtn sx={{ ...sxNavBtn, borderRadius:'50px' }} I={FaUserCircle}/>
                    </MenuButton>
                    <MenuList alignItems={'center'}>
                      <Center fontSize={12}>Logged in as:</Center>
                      <br />
                      <Center>
                        <Avatar
                          size={'lg'}
                          src={'https://avatars.dicebear.com/api/male/username.svg'}
                        />
                      </Center>
                      <br />
                      <VFlexCC>
                        <Box>{user.email}</Box>
                        <Box>{user.name}</Box>
                      </VFlexCC>
                      <br />
                      <MenuDivider />
                      <MenuItem onClick={()=>{navigate('/settings')}}>Account Settings</MenuItem>
                      <MenuItem onClick={()=>{
                        authState()._logout().then()
                        navigate('/')
                      }}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                  <Box ml="8px" w={{ base: '100%', md: 'unset' }}>
                    {isMobile && adminRoutes.indexOf(location.pathname)>-1 && (
                      <Center id="AppMenuIcon"
                              onClick={() => useAppStore.getState().set_appNavDrawerOpen(!useAppStore.getState().appNavDrawerOpen)}
                              cursor='pointer'
                              sx={sxNavBtn}>
                        <HamburgerIcon boxSize={5}/>
                      </Center>
                    )}
                  </Box>
                </>)
                :(<>

                  <Button onClick={()=>{
                    // useAppStore.getState().set_authModalIsOpen(true, 'login')
                    navigate('/login')
                    // authState().logInWithEmailAndPassword()
                  }}>Log in</Button>
                  <Button ml={2} onClick={()=>{
                    useAppStore.getState().set_authModalIsOpen(true, 'signup')

                    // authState().registerWithEmailAndPassword()
                    }}>Sign up</Button>
                </>)}
            </HFlexCC>
          </HFlexCC>
        </Box>
      </Portal>
      <AuthModal/>
      <Outlet/>

    </>
  );
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {width,height};
}
