import { ReactNode, useState } from "react";
import { AlertAction, AlertContext, AlertType } from "../hooks/useAlert";
import MessageBox from "./MessageBox";
import Confirmation from "./Confirmation";

interface Props {
  children: ReactNode;
}

export const Alert = ({ children }: Props) => {
  const [isClosed, setClosed] = useState(true);
  const [message, setMessage] = useState("");
  const [type, setType] = useState(AlertType.SUCCESS);
  const [action, setAction] = useState(() => () => {});

  let timeout = 0;

  const showAlert = (newAlert: AlertAction) => {
    clearTimeout(timeout);
    setMessage(newAlert.message);
    setType(newAlert.type);
    setClosed(false);
    if (newAlert.type == AlertType.CONFIRM) {
      setAction(() => () => {
        newAlert.continueAction();
      });
    } else {
      timeout = setTimeout(() => {
        setClosed(true);
      }, 6000);
    }
  };

  const hideAlert = () => {
    setClosed(true);
  };

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      {isClosed ||
        (type == AlertType.CONFIRM ? (
          <Confirmation action={action} hide={hideAlert}>
            {message}
          </Confirmation>
        ) : (
          <MessageBox type={type} hide={hideAlert}>
            {message}
          </MessageBox>
        ))}
    </AlertContext.Provider>
  );
};
