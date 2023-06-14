import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import type { Hit as AlgoliaHit } from "instantsearch.js/es/types";
import { Product } from "@/types";
import Image from "next/image";
import HitActions from "./HitActions";
import { grey } from "@mui/material/colors";
import { useHit } from "../context/HitProvider";

export interface HitProps {
  hit: AlgoliaHit<Product>;
  [x: string]: any;
}

function checkHitStatus(
  objectID: string,
  pendingHits: string[],
  deletedHits: string[]
) {
  // not ideal solution as this requires looping through both arrays - O(n^2)
  // better solution would be to use a hash table set at the context level
  let status = "active";
  if (deletedHits.includes(objectID)) {
    status = "deleted";
  } else if (pendingHits.includes(objectID)) {
    status = "pending";
  }
  return status;
}

export default function Hit({ hit }: HitProps) {
  const { name, image } = hit;
  const { pendingHits, deletedHits } = useHit();

  console.log(pendingHits);

  const hitStatus = checkHitStatus(hit.objectID, pendingHits, deletedHits);

  function hitStatusColor(status: string) {
    switch (status) {
      case "pending":
        return "black";
      case "deleted":
        return "red";
      default:
        return "transparent";
    }
  }

  function hitStatusText(status: string) {
    switch (status) {
      case "pending":
        return "updated";
      case "deleted":
        return "deleted";
      default:
        return "";
    }
  }

  // TODO - Add missing image
  // TODO - refactor hitStatus into component and add to HitActions
  // TODO - refactor hitStatus funcs into hash table
  return (
    <Box
      position={"relative"}
      bgcolor={"white"}
      py={2}
      px={2}
      sx={{ borderBottom: `solid 1px ${grey[300]}` }}
    >
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack direction="row" alignItems="center" gap={2}>
          <Box position={"relative"} width={50} height={50}>
            <Image
              alt={name}
              src={image ? image : "/missing-image.jpg"}
              fill
              style={{
                objectFit: "contain",
                objectPosition: "center",
              }}
            />
          </Box>
          <Typography>{name}</Typography>
        </Stack>
        <HitActions hit={hit} />
      </Stack>
      {hitStatus !== "active" && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            bgcolor: hitStatusColor(hitStatus),
            opacity: 0.9,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography color="white">
            Product has been {hitStatusText(hitStatus)}. Refresh the page to
            edit again.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
