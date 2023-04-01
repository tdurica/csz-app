import React, {Component, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {Box, Center, Flex, HStack, Image, SimpleGrid} from "@chakra-ui/react";
import {BsInfoCircle} from "react-icons/bs";
import {VFlex} from "../bits/UtilityTags";
import {FaRegEye} from "react-icons/fa";
import {TbTarget} from "react-icons/tb";
import {RxDragHandleDots2} from "react-icons/rx";
import {useAuth} from "../../services/useAuth";
import CurrencyIcon from "./CurrencyIcon";

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 3;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  // userSelect: "none",
  // padding: grid * 2,
  // margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "white",
  // border: '1px solid gray',
  width: 550
});
const mockExtLinks = [
  {id: '1', currency: 'Bitcoin (BTC)',     addr:'0x6cC5F688a315f3dC28A7781717a9A798a59fDA7b',show:true, hitCount: 0},
  {id: '2', currency: 'Ethereum (ETH)',    addr:'0x454637993a9f8C0013638B8Ae40f63676d557163',show:true, hitCount: 4},
  {id: '3', currency: 'Binance coin (BNB)',addr:'0xC4342d98682045d2f26aFE7e20795c954F760450',show:false, hitCount: 0},
  {id: '4', currency: 'Cardano (ADA)',     addr:'0xF3a8ffEe9c348A954cA9398aB091C9f3F97B1748',show:true, hitCount: 20},
  {id: '5', currency: 'Tether (USDT)',     addr:'0x46beeac36353eC9C94237377c0E2416008362bD2',show:true, hitCount: 0},
  {id: '6', currency: 'USD Coin (USDC)',   addr:'0xF71D6b391746149Af10b7c8b99cc004ee753030A',show:true, hitCount: 10},
]
export default function LinksDnd(){
  const userExtLinks = useAuth(s=>s.user.extLinks)

  const [items, setItems] = useState([]);

  useEffect(()=>{
    setItems(userExtLinks)
  },[userExtLinks])
  const [cards, setCards] = useState()

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const itemsMod = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(itemsMod);
    useAuth.getState()._updateUser({extLinks:itemsMod}).then()
  }
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => (
                <Draggable key={item.currency+item.addr} draggableId={item.currency+item.addr} index={index}>
                  {(provided, snapshot) => (
                    <SimpleGrid
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      justify={'space-between'}
                      templateColumns='4px 10% 65% 10% 9% auto'
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                      sx={{
                        border: '1px solid gray',
                        marginBottom: '.5rem',
                        borderRadius:'5px',
                        overflow:'hidden',
                        // bgColor: 'white',
                        cursor: 'move',
                      }}
                    >
                      <Box h='100%' bgColor='gray.700'/>
                        <Center align='center'>
                          {/*<BsInfoCircle/>*/}
                          <CurrencyIcon currency={item.currency}/>
                        </Center>
                        <VFlex>
                          <Box fontWeight='bold'>{item.currency}</Box>
                          <Box fontSize='12px'>{item.addr}</Box>
                        </VFlex>
                        <Flex align='center'><FaRegEye color={item.show?'green':'red'} onClick={()=>{}}/></Flex>
                        <Flex align='center' gap={1}><TbTarget/>{String(item.hitCount)}</Flex>
                        <Center sx={{bgColor:'gray.100', height:'100%'}} {...provided.dragHandleProps}>
                          <RxDragHandleDots2 style={{color:'white',height:'100%'}}/>
                        </Center>
                    </SimpleGrid>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
}

// Put the thing into the DOM!
