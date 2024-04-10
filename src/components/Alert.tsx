import { ReactNode, useState } from "react";
import { AlertContext, AlertType } from "../hooks/useAlert";

interface Props {
  children: ReactNode;
}

export const Alert = ({ children }: Props) => {
  const [isClosed, setClosed] = useState(true);
  const [message, setMessage] = useState("");
  const [type, setType] = useState(AlertType.SUCCESS);

  let timeout = 0;

  const showAlert = (
    newMessage: string,
    newType: AlertType = AlertType.SUCCESS
  ) => {
    clearTimeout(timeout);
    setMessage(newMessage);
    setType(newType);
    setClosed(false);
    timeout = setTimeout(() => {
      setClosed(true);
    }, 6000);
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
