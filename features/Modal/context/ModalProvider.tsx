import { HitProps } from "@/components/Hit/Hit";
import React, { useEffect } from "react";

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
