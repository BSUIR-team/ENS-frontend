import { useState } from "react";
import UnauthorizedPage from "./components/UnauthorizedPage";
import AuthorizedPage from "./components/AuthorizedPage";

function App() {
  const [isAuthorized, setAuthorized] = useState(false);
  return (
    <div>
      {isAuthorized ? (
        <AuthorizedPage setAuthorized={setAuthorized} />
      ) : (
        <UnauthorizedPage setAuthorized={setAuthorized} />
      )}
    </div>
  );
}

export default App;
