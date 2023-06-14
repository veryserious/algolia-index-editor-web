import React from "react";
import {
  Alert,
  Box,
  Typography,
  Button,
  Stack,
  FormGroup,
} from "@mui/material";
import { useModal } from "@/features/Modal";
import { useAlgolia } from "@/hooks/useAlgolia";
import { EditableProductFields } from "@/types";
import InputField from "@/components/InputField";
import { toUppercaseFirstLetter } from "@/utils";

/**
 *
 * ModalContent is the component that is rendered inside the Modal component.
 * It is responsible for rendering the content of the modal and handling the
 * logic for editing and deleting records.
 *
 * Currently this contains business logic for display of the hits.
 * Inputs are set dynamically based on the hit object.
 *
 */

export default function ModalContent() {
  const { variant, hit, toggle: toggleModal } = useModal();
  const { objectID, name, description, price, popularity, categories } = hit;

  const [hitState, setHitState] = React.useState<EditableProductFields>({
    name: name,
    description: description,
    price: price,
    popularity: popularity,
    categories: categories,
  });

  const { deleteRecord, updateRecord } = useAlgolia();

  function handleInputChange(e: any) {
    const { name, value } = e.target;
    setHitState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const senteceCaseTitle = toUppercaseFirstLetter(variant);

  return (
    <Box py={4} px={4}>
      <Typography marginBottom={4} variant="h4" component="h2">
        {senteceCaseTitle} Product Record: {objectID}
      </Typography>
      {variant === "edit" && (
        <Stack direction="column" gap={4}>
          <Stack direction="column" gap={3}>
            {/* TODO - extract this to a switch or lookup table */}
            {Object.entries(hitState).map((entry, index) => {
              return (
                <FormGroup key={entry[0] + "-" + index}>
                  <InputField
                    name={entry[0]}
                    value={entry[1]}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              );

              // if (prop[0] === "categories") {
              //   return (
              //     <Box key={index}>
              //       <Typography>{prop[0]}</Typography>
              //       <Typography>{prop[1].join(", ")}</Typography>
              //     </Box>
              //   );
              // }
            })}
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button
              onClick={() => {
                updateRecord({
                  objectID: objectID,
                  ...hitState,
                });
              }}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      )}
      {variant === "delete" && (
        <Stack direction="column" gap={4}>
          <Box>
            <Typography color="warning.main" fontWeight={700}>
              WATCH OUT!
            </Typography>

            <Typography gutterBottom>
              You are about to delete this product: <small>{name}</small>
            </Typography>
            <Typography>
              Are you sure you want to delete this product?
            </Typography>
          </Box>
          <Alert severity="warning">
            This action cannot be undone. Please confirm that you want to
            proceed.
          </Alert>
          <Stack direction="row" spacing={2}>
            <Button onClick={toggleModal}>Cancel</Button>
            <Button
              color="error"
              onClick={() => {
                deleteRecord(objectID);
              }}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      )}
    </Box>
  );
}
