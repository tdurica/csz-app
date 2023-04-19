import {
  ButtonGroup, Editable, EditablePreview, EditableInput, EditableTextarea, Flex, Heading, Box, SimpleGrid,
  IconButton, Input, Tooltip, useEditableControls, useBreakpointValue,
} from "@chakra-ui/react";
import {CheckIcon, CloseIcon, EditIcon} from "@chakra-ui/icons";
import {useAuth} from "services/useAuth";
import {VFlex} from "../bits/UtilityTags";

function EditableControls() {
  const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps
  } = useEditableControls();
  return isEditing && (
    <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
      <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
      <IconButton icon={<CloseIcon boxSize={3} />} {...getCancelButtonProps()}/>
    </ButtonGroup>
  );
}

export default function EditableCtrl({propName, label, textarea=false, sx={}}) {
  const propValue = useAuth(s=>s.user[propName])

  const onSubmit = async(value)=>{
    useAuth.getState()._updateUser({[propName]:value}).then()
  }

  const rsvWidth = useBreakpointValue(['250px','320px','380px'])

  return (<VFlex sx={sx}>
    <Heading size='sm'>{label}</Heading>
    <Editable
      as={SimpleGrid}
      defaultValue={propValue} isPreviewFocusable={true} selectAllOnFocus={false}
      onSubmit={onSubmit}
      sx={{
        borderRadius:'10px',mt:1, h:'42px',
        w: rsvWidth,
        gridTemplateColumns:`${rsvWidth} 80px`,
        gridTemplateRows:`42px`,
        position:'relative',
      }}
    >
      <Tooltip label="Click to edit">
        <EditablePreview
          sx={{
            // position: 'absolute', right: '0', left: '0',
            // w: rsvWidth,
            display:'flex', alignItems:'center',px:4,
            //h: '42px',// py:2, px:4,
            bgColor:'gray.50',
            whiteSpace: 'nowrap', overflow: 'hidden',
          }}
          // border='1px solid lightgray'
          _hover={{
            background: "gray.200"
          }}
        />
      </Tooltip>
      {textarea?
        <EditableTextarea py={2} px={4}/>
        :<EditableInput py={2} px={4}/>
      }
      {/*<Input py={2} px={4} as={textarea?EditableTextarea:EditableInput} />*/}
      <EditableControls />
    </Editable>
  </VFlex>);
}
