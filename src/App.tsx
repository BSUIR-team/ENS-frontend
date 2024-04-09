import { useState } from "react";
import UnauthorizedPage from "./components/UnauthorizedPage";
import AuthorizedPage from "./components/AuthorizedPage";
import { Alert } from "./components/Alert";

function App() {
  const [isAuthorized, setAuthorized] = useState(false);
  return (
    <Alert>
      {isAuthorized ? (
        <AuthorizedPage setAuthorized={setAuthorized} />
      ) : (
        <UnauthorizedPage setAuthorized={setAuthorized} />
      )}
    </Alert>
  );
}

export default App;
