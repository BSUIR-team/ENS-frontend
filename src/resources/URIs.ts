const API_URI: string = "http://ens-back.api:8080";
export const AUTH_URI: string = API_URI + "/auth/authenticate";
export const REGISTER_URI = API_URI + "/auth/signup";
export const UPDATE_URI = API_URI + "";
export const RECIPIENTS_URI = API_URI + "/recipients/";
export const TEMPLATES_URI = API_URI + "/templates/";
export const TEMPLATES_RECIPIENTS_URI = (id: number) => { return TEMPLATES_URI + id + "/recipients"}
export const NOTIFICATIONS_URI = API_URI + "/notifications/";
export const FILE_URI = API_URI + "/recipients/file"