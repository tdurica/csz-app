import { Link } from "react-router-dom";
import { VFlex } from './bits/UtilityTags.js';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {useCallback, useState} from "react";
import {Box, Button, Card} from "@chakra-ui/react";
import LinksDnd from "./LinksArranger/LinksDnD";
import LinkAdd from "./LinksArranger/LinkAdd";
import TemplatePicker from "./TemplatePicker/TemplatePicker";

export default function TbDesigner() {

  return (
    <VFlex>
      <LinkAdd/>
      <br/>
      <LinksDnd/>
      {/*<LinksArranger/>*/}
      <TemplatePicker/>
    </VFlex>
  )
}
