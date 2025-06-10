import { IAction } from "./Action.d"

const Action = ({ onClick, children }: IAction) => (
  <button data-testid="button" onClick={onClick}>
    {children}
  </button>
)

export default Action
