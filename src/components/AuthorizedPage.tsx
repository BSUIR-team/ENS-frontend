interface Props {
  setAuthorized: (e: boolean) => void;
}

const AuthorizedPage = ({ setAuthorized }: Props) => {
  function logout() {
    console.log("logout");
    setAuthorized(false);
  }
  return (
    <div>
      AuthorizedPage
      <button className="btn btn-danger" onClick={logout}>
        Log Out
      </button>
    </div>
  );
};

export default AuthorizedPage;
