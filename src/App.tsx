import UnauthorizedPage from "./components/UnauthorizedPage";
import AuthorizedPage from "./components/AuthorizedPage";
import { Alert } from "./components/Alert";
import { useTypedSelector } from "./hooks/useTypedSelector";
import Loading from "./components/Loading";

function App() {
  const isAuthorized = useTypedSelector((state) => state.user.logged);
  const isLoading = useTypedSelector((state) => state.user.loading);
  return (
    <Alert>
      {isAuthorized ? <AuthorizedPage /> : <UnauthorizedPage />}
      {isLoading && <Loading />}
    </Alert>
  );
}

export default App;
