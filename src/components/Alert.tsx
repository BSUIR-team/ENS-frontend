import { ReactNode, createContext, useContext, useState } from "react";

interface Props {
  children: ReactNode;
}

const AlertContext = createContext((message: string) => {
  console.log(message);
});

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    console.log("Error using context");
  }
  return context;
};

export const Alert = ({ children }: Props) => {
  const [isClosed, setClosed] = useState(true);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");

  const showAlert = (newMessage: string, newType = "success") => {
    setMessage(newMessage);
    setType(newType);
    setClosed(false);
  };

  const hideAlert = () => {
    setClosed(true);
  };

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      {isClosed || (
        <div className={"alert " + type}>
          <button
            onClick={() => {
              hideAlert();
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <p>{message}</p>
        </div>
      )}
    </AlertContext.Provider>
  );
};
