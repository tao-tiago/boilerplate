import { Link } from "react-router-dom"

// Components Internal
import Action from "../../components/Action"
import { Loading } from "../../components/Loading"

// Hooks
import { useHome } from "../../hooks/useHomePage"

const Home = () => {
  const { data, isLoading, refetch } = useHome()

  return (
    <>
      {isLoading && <Loading />}

      {!isLoading && (
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "50px"
          }}
        >
          <ul>
            {data.map((item) => (
              <>
                <li key={item.id}>{item.name}</li>
              </>
            ))}
          </ul>

          <Link to="/single">
            <Action>go to single</Action>
          </Link>

          <Action onClick={() => refetch()}>refresh data</Action>
        </div>
      )}
    </>
  )
}

export default Home
