import React, {Component, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {Box, Button, Center, Flex, GridItem, HStack, Icon, Image, SimpleGrid, useBreakpointValue} from "@chakra-ui/react";
import {BsInfoCircle} from "react-icons/bs";
import {VFlex, VFlexCC} from "../bits/UtilityTags";
import {FaRegEye, FaTrash} from "react-icons/fa";
import {TbTarget} from "react-icons/tb";
import {RxDragHandleDots2} from "react-icons/rx";
import {useAuth} from "../../services/useAuth";
import SocLinkIcon from "../../hooks/SocLinkIcon/SocLinkIcon";
import {mock_socLinks} from "../../data/mock_socLinks";
import {ChevronDownIcon, ChevronUpIcon} from "@chakra-ui/icons";


const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  // userSelect: "none",
  // padding: grid * 2,
  // margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "plum" : "white",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightpink" : "white",
  // border: '1px solid gray',
  w:'100%', maxWidth: '550px',
});

export default function SocLinksDnD(){
  // const socLinksIconSet = useAuth(s=>s.user.socLinksIconSet)
  const socLinksColor = useAuth(s=>s.user.socLinksColor)
  const socLinks = useAuth(s=>s.user.socLinks)

  const [items, setItems] = useState([]);

  const moveItem = (sourceIndex, destinationIndex) => {
    const newItems = Array.from(items);
    const [removed] = newItems.splice(sourceIndex, 1);
    newItems.splice(destinationIndex, 0, removed);
    setItems(newItems);
  };

  useEffect(()=>{
    setItems(socLinks)
  },[socLinks])

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
    useAuth.getState()._updateUser({socLinks:itemsMod}).then()
  }
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        {/*<Button onClick={()=>{// setItems(mock_socLinks);*/}
        {/*  useAuth.getState()._updateUser({socLinks:mock_socLinks}).then((r)=>{if(r && r.success){}}).catch()*/}
        {/*}}>populate mock data</Button>*/}
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
              {items.map((v, i) => (
                <Draggable key={v.label+v.url} draggableId={v.label+v.url} index={i}>
                  {(_provided, _snapshot) => (
                    <SimpleGrid ref={_provided.innerRef} {..._provided.draggableProps}
                      sx={{
                        gridTemplateColumns:'3px 1fr 25px',
                        border: '1px solid gray', mb: '.5rem', borderRadius:'5px', overflow:'hidden',
                        w:'100%', maxWidth: '550px',
                        ...getItemStyle(_snapshot.isDragging, _provided.draggableProps.style),
                      }}
                    >
                      <Box h='100%' bgColor='gray.700'/>
                      <SimpleGrid
                        templateAreas={useBreakpointValue({
                          base: `"icon label label"
                                 "icon link link"
                                 "c1 c2 c3"`,
                          md: `"icon label c1 c2 c3"
                               "icon link  c1 c2 c3"`,
                        })}
                        templateColumns={useBreakpointValue({
                          base: '50px 1fr 1fr',
                          md: '50px 60% 1fr 1fr 1fr',
                        })}
                        w={useBreakpointValue({
                          base: 'auto',
                          md: '520px',
                        })}
                      >
                        <GridItem area={'icon'} as={Center} fill={socLinksColor}>
                          {/*TODO: iconSet can be dynamic as {user.socLinksIconSet} */}
                          <SocLinkIcon name={v.label} iconSet='FlatSolid' size={24}/>
                        </GridItem>
                        <GridItem area={'label'} as={Box} fontWeight='bold'>
                          {v.label}
                        </GridItem>
                        <GridItem area={'link'} as={Box} fontSize='12px'>
                          {v.url}
                        </GridItem>
                        <GridItem area={'c1'} as={Center}>
                          <Icon as={FaTrash} cursor='pointer' color='gray' _hover={{color:'black'}} onClick={()=>{
                            const itemsMod = items.filter((vv,i,a)=>{
                              return vv.label+vv.url !== v.label+v.url
                            });
                            setItems(itemsMod);
                            useAuth.getState()._updateUser({socLinks:itemsMod}).then()
                          }}/>
                        </GridItem>
                        <GridItem area={'c2'} as={Center}>
                          <FaRegEye color={v.show?'green':'red'} onClick={()=>{
                            let mod = [...items];mod[i] = {...items[i]};mod[i].show = !v.show;
                            useAuth.getState()._updateUser({socLinks:mod}).then().catch()
                          }}/>
                        </GridItem>
                        <GridItem area={'c3'} as={VFlexCC} gap={1}>
                          <Button size='xs' h='14px' variant='unstyled' visibility={i<1?'hidden':'visible'} onClick={()=>{
                            if(i>0) {
                              moveItem(i, i-1);
                              onDragEnd({source:{index:i}, destination:{index:i-1}})
                            }
                          }}><ChevronUpIcon/></Button>
                          <Button size='xs' h='14px' variant='unstyled' visibility={i>=items.length-1?'hidden':'visible'} onClick={()=>{
                            if(i<items.length-1){
                              moveItem(i, i+1);
                              onDragEnd({source:{index:i}, destination:{index:i+1}})
                            }
                          }}><ChevronDownIcon/></Button>
                        </GridItem>
                      </SimpleGrid>
                      <Center sx={{bgColor:'gray.100', height:'100%'}} {..._provided.dragHandleProps}>
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
