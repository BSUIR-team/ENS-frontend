import UnauthorizedPage from "./components/UnauthorizedPage";
import AuthorizedPage from "./components/AuthorizedPage";
import { Alert } from "./components/Alert";
import { useTypedSelector } from "./hooks/useTypedSelector";
import Loading from "./components/Loading";
import { AlertType, useAlert } from "./hooks/useAlert";

function App() {
  const showAlert = useAlert();
  const isAuthorized = useTypedSelector((state) => state.user.logged);
  const isLoading = useTypedSelector((state) => state.user.loading);
  const failMessage = useTypedSelector((state) => state.user.error);
  if (failMessage != undefined) {
    console.log(failMessage);
    showAlert({ type: AlertType.FAIL, message: failMessage });
  }
  return (
    <Alert>
      {isAuthorized ? <AuthorizedPage /> : <UnauthorizedPage />}
      {isLoading && <Loading />}
    </Alert>
  );
}

export default App;
