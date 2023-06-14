import React from "react";

/**
 * HitContext
 * Context for the hit component to manage its state
 * @param {object} hit - the hit to be edited or deleted
 * @param {function} setActiveHit - sets the hit to be edited or deleted
 * @returns {object} HitContext
 *
 */

type HitStatus = "edit" | "pending" | "delete" | "deleted" | undefined;
type ObjectID = string;

type HitContextType = {
  hit: any; // TODO: type this
  deletedHits: ObjectID[];
  pendingHits: ObjectID[];
  status: HitStatus;
  setActiveHit: (hit: any) => void;
  setStatus: (status: HitStatus) => void; // set to "edit" or "delete" enum
  updateDeletedHits: (hit: any) => void; // TODO: type this
  updatePendingHits: (hit: any) => void; // TODO: type this
};

const HitContext = React.createContext<HitContextType>({
  hit: {},
  deletedHits: [],
  pendingHits: [],
  status: undefined,
  setActiveHit: () => {},
  setStatus: () => {},
  updateDeletedHits: () => {},
  updatePendingHits: () => {},
});

export function useHit() {
  const {
    hit,
    deletedHits,
    pendingHits,
    status,
    setActiveHit,
    updateDeletedHits,
    updatePendingHits,
    setStatus,
  } = React.useContext(HitContext);
  return {
    hit,
    deletedHits,
    pendingHits,
    status,
    setActiveHit,
    updateDeletedHits,
    updatePendingHits,
    setStatus,
  };
}

export function HitProvider({ children }: { children: React.ReactNode }) {
  const [hit, setHit] = React.useState<any>({}); // TODO: type this
  const [status, setStatus] = React.useState<HitStatus>(undefined);
  const [pendingHits, setPendingHits] = React.useState<ObjectID[]>([]);
  const [deletedHits, setDeletedHits] = React.useState<ObjectID[]>([]);
  const setActiveHit = (hit: any) => setHit(hit); // TODO: type this

  // refactor functions to use objectID instead of hit
  // add utility function to make DRY
  function updatePendingHits(hit: any) {
    const { objectID } = hit;
    const pendingHitsCopy = [...pendingHits];
    const hitIndex = pendingHitsCopy.indexOf(objectID);
    if (hitIndex > -1) {
      pendingHitsCopy.splice(hitIndex, 1);
      setPendingHits(pendingHitsCopy);
    } else {
      setPendingHits([...pendingHitsCopy, objectID]);
    }
  }

  // refactor functions to use objectID instead of hit
  function updateDeletedHits(hit: any) {
    const { objectID } = hit;
    const deletedHitsCopy = [...deletedHits];
    const hitIndex = deletedHitsCopy.indexOf(objectID);
    if (hitIndex > -1) {
      deletedHitsCopy.splice(hitIndex, 1);
      setDeletedHits(deletedHitsCopy);
    } else {
      setDeletedHits([...deletedHitsCopy, objectID]);
    }
  }

  return (
    <HitContext.Provider
      value={{
        hit,
        deletedHits,
        pendingHits,
        status,
        setActiveHit,
        updateDeletedHits,
        updatePendingHits,
        setStatus,
      }}
    >
      {children}
    </HitContext.Provider>
  );
}
