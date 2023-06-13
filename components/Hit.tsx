import React from "react";
import {
  Box,
  Button,
  InputBase,
  TableCell,
  TableRow,
  SvgIcon,
  Stack,
  Typography,
  Tooltip,
} from "@mui/material";
import type { Hit as AlgoliaHit } from "instantsearch.js/es/types";
import { EditableProductFields, Product } from "@/types";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";

interface HitProps {
  hit: AlgoliaHit<Product>;
}

export default function Hit({ hit }: HitProps) {
  const [editing, setEditing] = React.useState<boolean>(false);
  const [state, setState] = React.useState<EditableProductFields>({
    name: hit.name,
    description: hit.description,
    price: hit.price,
    popularity: hit.popularity,
    categories: hit.categories,
  });

  function handleInputChange(e: any) {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleReset() {
    setEditing(false);
  }

  function handleCancel() {
    setEditing(false);
  }

  // memoize this function
  async function handleDelete(objectID: string) {
    const res = await (
      await fetch("/api/delete", {
        method: "POST",
        body: JSON.stringify({ objectID: objectID }),
      })
    ).json();
  }

  // memoize this function
  // refactor to take product object as argument

  const handleSubmit = async (product: Product) => {
    const res = await (
      await fetch("/api/update", {
        method: "POST",
        body: JSON.stringify(product),
      })
    ).json();
  };

  return (
    <TableRow>
      <TableCell component="th">
        <Image alt={hit.name} src={hit.image} width={50} height={50} />
      </TableCell>
      {/* Clean up and make a bit more readable -- needs method to work with arrays*/}
      {Object.entries(state).map((prop, index) => {
        if (prop[0] === "categories") {
          return (
            <TableCell key={index}>
              <Typography>{prop[1].join(", ")}</Typography>
            </TableCell>
          );
        }
        return (
          <TableCell key={index}>
            {editing ? (
              <InputBase
                value={prop[1]}
                name={prop[0]}
                onBlur={handleReset}
                onChange={handleInputChange}
              />
            ) : (
              <Typography>{prop[1]}</Typography>
            )}
          </TableCell>
        );
      })}

      <TableCell>
        {!editing && (
          <Stack direction="row" spacing={2}>
            <Tooltip title="Edit">
              <SvgIcon
                onClick={() => {
                  setEditing(true);
                }}
              >
                <EditIcon />
              </SvgIcon>
            </Tooltip>
            <Tooltip title="Delete">
              <SvgIcon
                onClick={() => {
                  handleDelete(hit.objectID);
                }}
              >
                <DeleteIcon />
              </SvgIcon>
            </Tooltip>
          </Stack>
        )}

        {editing && (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Tooltip title="Save">
              <Button
                variant="contained"
                type="submit"
                onClick={(e: any) => {
                  e.preventDefault();
                  handleSubmit({
                    objectID: hit.objectID,
                    ...state,
                  });
                  setEditing(false);
                }}
              >
                Save
              </Button>
            </Tooltip>
            <Tooltip title="Cancel">
              <Box
                lineHeight={0}
                sx={{
                  transition: "all 300ms ease",
                  "&:hover": {
                    cursor: "pointer",
                    color: "primary.semi",
                  },
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setEditing(false);
                  handleCancel();
                }}
              >
                <SvgIcon>
                  <CancelIcon />
                </SvgIcon>
              </Box>
            </Tooltip>
          </Stack>
        )}
      </TableCell>
    </TableRow>
  );
}
