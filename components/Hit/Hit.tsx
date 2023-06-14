import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import type { Hit as AlgoliaHit } from "instantsearch.js/es/types";
import { Product } from "@/types";
import Image from "next/image";
import HitActions from "./HitActions";
import { grey } from "@mui/material/colors";

export interface HitProps {
  hit: AlgoliaHit<Product>;
  [x: string]: any;
}

export default function Hit({ hit }: HitProps) {
  const { name, image } = hit;

  // TODO - Add missing image
  return (
    <Box
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
          {status && <Typography color="primary">{status}</Typography>}
        </Stack>
        <HitActions hit={hit} />
      </Stack>
    </Box>
  );
}
