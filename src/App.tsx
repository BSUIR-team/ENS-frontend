import UnauthorizedPage from "./components/UnauthorizedPage";
import AuthorizedPage from "./components/AuthorizedPage";
import { Alert } from "./components/Alert";
import { useTypedSelector } from "./hooks/useTypedSelector";

function App() {
  const isAuthorized = useTypedSelector((state) => state.user.logged);
  return (
    <Alert>{isAuthorized ? <AuthorizedPage /> : <UnauthorizedPage />}</Alert>
  );
}

export default App;
