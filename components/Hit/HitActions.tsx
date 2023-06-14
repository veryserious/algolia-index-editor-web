import React from "react";
import { Stack, Tooltip, SvgIcon } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useModal } from "@/features/Modal";
import type { Hit as AlgoliaHit } from "instantsearch.js/es/types";
import { Product } from "@/types";
interface HitActionsProps {
  hit: AlgoliaHit<Product>;
}

export default function HitActions({ hit }: HitActionsProps) {
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
