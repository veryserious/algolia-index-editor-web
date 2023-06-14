import React from "react";
import { Stack, Tooltip, SvgIcon } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useModal } from "@/features/Modal";
import { HitProps } from "./Hit";

export default function HitActions({ hit }: HitProps) {
  const {
    toggle: toggleModal,
    setActiveHit,
    setEdit: setModalToEdit,
    setDelete: setModalToDelete,
  } = useModal();

  return (
    <Stack direction="row" spacing={2}>
      <Tooltip title="Edit">
        <SvgIcon
          onClick={() => {
            setActiveHit(hit);
            setModalToEdit();
            toggleModal();
          }}
        >
          <EditIcon />
        </SvgIcon>
      </Tooltip>
      <Tooltip title="Delete">
        <SvgIcon
          color="error"
          onClick={() => {
            setActiveHit(hit);
            setModalToDelete();
            toggleModal();
          }}
        >
          <DeleteIcon />
        </SvgIcon>
      </Tooltip>
    </Stack>
  );
}
