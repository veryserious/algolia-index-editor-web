import React from "react";

/**
 * ModalContext
 * Context for the modal component to manage its state
 * @param {boolean} open - whether the modal is open or not
 * @param {object} hit - the hit to be edited or deleted
 * @param {string} variant - the variant of the modal, either "edit" or "delete"
 * @param {function} toggle - toggles the modal open or closed
 * @param {function} setActiveHit - sets the hit to be edited or deleted
 * @param {function} setEdit - sets the modal variant to "edit"
 * @param {function} setDelete - sets the modal variant to "delete"
 * @returns {object} ModalContext
 *
 * Currently contains logic surrounding the hit (see hit and setActiveHit p)
 */

type ModalContextType = {
  open: boolean;
  hit: any; // TODO: type this
  variant: "edit" | "delete";
  toggle: () => void;
  setActiveHit: (hit: any) => void;
  setEdit: () => void;
  setDelete: () => void;
};

const ModalContext = React.createContext<ModalContextType>({
  open: false,
  hit: {},
  variant: "edit",
  toggle: () => {},
  setActiveHit: () => {},
  setEdit: () => {},
  setDelete: () => {},
});

export function useModal() {
  const { open, hit, variant, toggle, setActiveHit, setEdit, setDelete } =
    React.useContext(ModalContext);
  return { open, hit, variant, toggle, setActiveHit, setEdit, setDelete };
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [hit, setHit] = React.useState<any>({}); // TODO: type this
  const [open, setOpen] = React.useState(false);
  const [variant, setVariant] = React.useState<"edit" | "delete">("edit"); // ["edit", "delete" as const]
  const toggle = () => setOpen(!open);
  const setActiveHit = (hit: any) => setHit(hit); // TODO: type this
  const setEdit = () => setVariant("edit");
  const setDelete = () => setVariant("delete");

  return (
    <ModalContext.Provider
      value={{ open, hit, variant, toggle, setActiveHit, setEdit, setDelete }}
    >
      {children}
    </ModalContext.Provider>
  );
}
