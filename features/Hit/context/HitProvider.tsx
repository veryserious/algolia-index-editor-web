import React from "react";

/**
 * HitContext
 * Context for the hit component to manage its state
 * deleted and pending hits are stored as arrays of objectIDs, this approach was chosen over a hash table set for simplicity
 * however, this approach is not ideal as it requires looping through both arrays to check the status of a hit - O(n^2)
 * a better solution would be to use a hash table set at the context level
 *
 * @param {object} hit - the hit to be edited or deleted
 * @param {string} status - the status of the hit, either "edit", "pending", "delete", or "deleted"
 * @param {array} deletedHits - array of deleted hits
 * @param {array} pendingHits - array of pending hits
 * @param {function} setActiveHit - sets the hit to be edited or deleted
 * @param {function} setStatus - sets the status of the hit
 * @param {function} updateDeletedHits - updates the deleted hits array
 * @param {function} updatePendingHits - updates the pending hits array
 * @returns {object} HitContext
 *
 */

type HitStatus = "edit" | "pending" | "delete" | "deleted" | undefined; // status not currently used but could be useful in the future
type ObjectID = string;

type HitContextType = {
  hit: any; // TODO: type this
  deletedHits: ObjectID[];
  pendingHits: ObjectID[];
  status: HitStatus;
  setActiveHit: (hit: any) => void;
  setStatus: (status: HitStatus) => void;
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
