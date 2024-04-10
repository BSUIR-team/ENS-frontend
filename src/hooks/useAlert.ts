import { createContext, useContext } from "react";

export enum AlertType {SUCCESS = "success", FAIL = "fail"}

export const AlertContext = createContext((message: string, type: AlertType = AlertType.SUCCESS) => {
    console.log(message, type);
});
  
export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
      console.log("Error using context");
    }
    return context;
};