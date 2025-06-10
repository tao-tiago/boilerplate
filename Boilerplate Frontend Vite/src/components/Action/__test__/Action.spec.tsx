import { render, fireEvent } from "@testing-library/react"
import Action from "../Action"

describe("<Action />", () => {
  const onClick = jest.fn()

  it("Should click the action", () => {
    const { getByTestId } = render(<Action onClick={onClick}>test</Action>)

    const buttonClick = getByTestId("button")
    fireEvent.click(buttonClick)

    expect(onClick).toBeCalled()
  })
})
