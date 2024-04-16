import { createContext, useContext } from "react";

export enum AlertType {SUCCESS = "success", FAIL = "fail", CONFIRM = "confirm"}

interface MessageAlert {
  type: AlertType.SUCCESS | AlertType.FAIL;
  message: string;
}

interface ConfirmationAlert {
  type: AlertType.CONFIRM;
  message: string;
  continueAction: () => void;
}

export type AlertAction = MessageAlert | ConfirmationAlert;

export const AlertContext = createContext((alert: AlertAction) => {
    console.log(alert);
});
  
export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
      console.log("Error using context");
    }
    return context;
};