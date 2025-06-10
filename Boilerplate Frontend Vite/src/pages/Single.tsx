import { Link } from "react-router-dom"
import Action from "../components/Action"

const Home = () => (
  <div
    style={{
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <Link to="/">
      <Action>go to home</Action>
    </Link>
  </div>
)

export default Home
