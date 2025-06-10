import { ReactElement } from "react"
import { useIsFetching, useIsMutating } from "react-query"

export function Loading(): ReactElement {
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  const display = isFetching || isMutating ? "flex" : "none"

  return (
    <div
      style={{
        position: "fixed",
        zIndex: "9999",
        top: "0",
        left: "0",
        display: display,
        background: "white",
        color: "black",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "28px"
      }}
    >
      <span>Loading...</span>
    </div>
  )
}
