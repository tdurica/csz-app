import { Link } from "react-router-dom";
import { VFlex } from './bits/UtilityTags.js';
import {Divider, FormControl, FormHelperText, FormLabel, Input, Radio, RadioGroup, Switch} from "@chakra-ui/react";
import {useAuth} from "../services/useAuth";

export default function TbSettings() {
  const user = useAuth(s=>s.user)
  return (
    <VFlex w='600px'>

      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input placeholder={user.name}/>
      </FormControl>

      <FormControl>
        <FormLabel>Greeting</FormLabel>
        <Input placeholder={user.greeting}/>
      </FormControl>

      <FormControl>
        <FormLabel>Greeting</FormLabel>
        <Input placeholder={user.bio}/>
      </FormControl>

      <Divider/>
      <FormControl>
        <FormLabel>Public Link Handle</FormLabel>
        <Input placeholder={user.pubLinkHandle}/>
      </FormControl>

      <Divider/>
      <FormControl as='fieldset'>
        <FormLabel as='legend' htmlFor={null}>
          Preferred Link
        </FormLabel>
        <RadioGroup defaultValue='Itachi'>
          <VFlex gap={3}>
            <Radio value='Sasuke'><Input disabled placeholder={`coinstarz.link/${user.pubLinkHandle}`}/></Radio>
            <Radio value='Nagato'><Input disabled placeholder={`${user.pubLinkHandle}.coinstarz.link/`}/></Radio>
            <Radio value='Itachi'><Input disabled placeholder={`your domain`}/></Radio>
          </VFlex>
        </RadioGroup>
        <FormHelperText>Select only if you're a fan.</FormHelperText>
      </FormControl>

      <Divider/>
      <FormControl display='flex' alignItems='center'>
        <FormLabel htmlFor='show-csz-credit' mb='0'>
          SHOW COINSTARZ CREDIT
        </FormLabel>
        <Switch id='show-csz-credit' isChecked={user.showCszCredit}
                onChange={ (e)=>{
                  useAuth.getState()._updateUser({showCszCredit:e.currentTarget.checked}).then()
                }}/>
        <FormHelperText>We appreciate you showing our logo credit in the footer, but feel free to hide it.</FormHelperText>
      </FormControl>

      <Divider/>
      <FormControl display='flex' alignItems='center'>
        <FormLabel htmlFor='nsfw-warning' mb='0'>
          NSFW WARNING
        </FormLabel>
        <FormHelperText>Show a warning before displaying your page.</FormHelperText>
        <Switch id='nsfw-warning' />
      </FormControl>
    </VFlex>
  )
}
