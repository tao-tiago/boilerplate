import { ReactElement } from "react"
import { useIsFetching, useIsMutating } from "react-query"

export function Fetching(): ReactElement {
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  const display = isFetching || isMutating ? "flex" : "none"

  return (
    <div
      style={{
        display: display,
        background: "white",
        color: "black",
        width: "100%",
        justifyContent: "center"
      }}
    >
      <span>
        {" "}
        ------------------------- loading...-------------------------{" "}
      </span>
    </div>
  )
}
