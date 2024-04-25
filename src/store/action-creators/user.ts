import { Dispatch } from "redux"
import { User, UserAction, UserActions } from "../../types/User"
import axios, { AxiosResponse } from "axios"
import { RECIPIENTS_URI, AUTH_URI, UPDATE_URI, TEMPLATES_URI, NOTIFICATIONS_URI, FILE_URI, TEMPLATES_RECIPIENTS_URI } from "../../resources/URIs"
import { UserResponse } from "../../types/UserResponse"
import { Contact } from "../../types/Contact"
import { Template } from "../../types/Template"

const JWT_KEY: string = "jwt";
const TIMEOUT_MILLIS: number = 7000;

export const logIn = (user: User) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActions.WAIT, payload: {user: user, logged: false, loading: true}});

            await axios.post(AUTH_URI, user, {
                timeout: TIMEOUT_MILLIS
            }).then((response: AxiosResponse<UserResponse, any>)=>{ 
                localStorage.setItem(JWT_KEY, response.data.jwt);
                return new User(user.email, user.password, response.data.username, response.data.contacts, response.data.templates);  
            }).then(async (userInfo: User) => {
                let jwt = localStorage.getItem(JWT_KEY);
                if(!jwt) {               
                    dispatch({type: UserActions.LOG_OUT})
                }
                await axios.get(RECIPIENTS_URI, {
                    headers: {
                        Authorization: jwt
                    },
                    timeout: TIMEOUT_MILLIS
                }).then((response: AxiosResponse<Contact[], any>)=>{
                    userInfo = {...userInfo, contacts: response.data};
                    dispatch({type: UserActions.LOG_IN, payload: {user: userInfo, logged: true, loading: false}});
                }).catch(()=>{throw new Error()});
                await axios.get(TEMPLATES_URI, {
                    headers: {
                        Authorization: jwt
                    },
                    timeout: TIMEOUT_MILLIS
                }).then((response: AxiosResponse<Template[], any>)=>{
                    dispatch({type: UserActions.LOG_IN, payload: {user: {...userInfo, templates: response.data}, logged: true, loading: false}});
                }).catch(()=>{throw new Error()});
            }).catch(()=> {
                throw new Error();
                // dispatch({type: UserActions.LOG_IN, payload: {user: user, logged: true, loading: false}});
            })
        }
        catch(e) {
            dispatch({type: UserActions.ERROR, message: "failedLogIn"});
        }
    }
}

export const logOut = () => {
    return (dispatch: Dispatch<UserAction>) => {
        dispatch({type:UserActions.LOG_OUT});
    }
}

export const update = (user: User) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActions.WAIT, payload: {user: user, logged: true, loading: true}});
            let jwt = localStorage.getItem(JWT_KEY);
            if(!jwt) {               
                dispatch({type: UserActions.LOG_OUT})
            }
            await axios.put(UPDATE_URI, user, {
                headers: {
                    Authorization : jwt
                },
                timeout: TIMEOUT_MILLIS
            }).then((response: AxiosResponse<User, any>) => {
                user = {...user, username: response.data.username, email: response.data.email}
                dispatch({type: UserActions.UPDATE, payload: {user: user, logged: true, loading: false}});
            }).catch(()=>{
                throw new Error();
            });
        }
        catch(e) {
            dispatch({type: UserActions.ERROR, message: "failedUpdate"});
        }
    }
}

export const updateFromFile = (user: User, contacts: File) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActions.WAIT, payload: {user: user, logged: true, loading: true}});
            let jwt = localStorage.getItem(JWT_KEY);
            if(!jwt) {               
                dispatch({type: UserActions.LOG_OUT})
            }
            await axios.post(FILE_URI, {file: contacts}, {
                headers : {
                    Authorization : jwt,
                    "Content-Type": "multipart/form-data"
                },
                timeout: TIMEOUT_MILLIS
            }).then((response: AxiosResponse<boolean, any>)=>{
                // user = {...user, contacts: [...user.contacts, response.data]}
                if(response.data)
                    dispatch({type: UserActions.UPDATE, payload: {user: {...user}, logged: true, loading: false}});
            }).catch(() => {
                throw new Error();
            });
            await axios.get(RECIPIENTS_URI, {
                headers: {
                    Authorization: jwt
                },
                timeout: TIMEOUT_MILLIS
            }).then((response: AxiosResponse<Contact[], any>)=>{
                user = {...user, contacts: response.data};
                dispatch({type: UserActions.LOG_IN, payload: {user: user, logged: true, loading: false}});
            }).catch(()=>{throw new Error()});
        }
        catch(e) {
            dispatch({type: UserActions.ERROR, message: "failedUpdate"});        
        }
    }
}

export const clearError = () => {
    return (dispatch: Dispatch<UserAction>) => {
        dispatch({type: UserActions.ERROR, message: ""});
    }
}

export const addContact = (user: User, contact: Contact) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActions.WAIT, payload: {user: user, logged: true, loading: true}});
            let jwt = localStorage.getItem(JWT_KEY);
            if(!jwt) {               
                dispatch({type: UserActions.LOG_OUT})
            }
            await axios.post(RECIPIENTS_URI, contact, {headers: {Authorization: jwt},timeout: TIMEOUT_MILLIS}).then((response: AxiosResponse<Contact, any>)=>{
                user.contacts.push(response.data);
                dispatch({type: UserActions.UPDATE, payload: {user: user, logged: true, loading: false}});
            }).catch(()=> {
                throw new Error();
            });
        }
        catch(e) {
            dispatch({type: UserActions.ERROR, message: "failedUpdate"});  
        }
    }
}

export const deleteContact = (user:User, contactId: number) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            let jwt = localStorage.getItem(JWT_KEY);
            if(!jwt) {               
                dispatch({type: UserActions.LOG_OUT})
            }
            dispatch({type: UserActions.WAIT, payload: {user: user, logged: true, loading: true}});
            await axios.delete(RECIPIENTS_URI + contactId, {headers: {Authorization: jwt},timeout: TIMEOUT_MILLIS}).then((response: AxiosResponse<boolean, any>)=>{
                if(response.data) {
                    dispatch({type: UserActions.UPDATE, payload: {user: {...user, contacts: user.contacts.filter((contact)=>contact.id!=contactId)}, logged: true, loading: false}});
                }
                else {
                    throw new Error();
                }
            }).catch(()=>{
                throw new Error();
            })
        }
        catch(e) {
            dispatch({type: UserActions.ERROR, message: "failedUpdate"}); 
        }
    }
}

export const addTemplate = (user: User, template: Template) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            let jwt = localStorage.getItem(JWT_KEY);
            if(!jwt) {               
                dispatch({type: UserActions.LOG_OUT})
            }
            dispatch({type: UserActions.WAIT, payload: {user: user, logged: true, loading: true}});
            await axios.post(TEMPLATES_URI, {title: template.title, content: template.content}, {
                headers: {
                    Authorization: jwt
                },
                timeout: TIMEOUT_MILLIS
            }).then((response: AxiosResponse<Template, any>)=> {
                return response.data;
            }).then(async (templateInfo: Template)=> {
                let ids = template.recipientIds.map((e) => e.id);
                await axios.post(TEMPLATES_RECIPIENTS_URI(templateInfo.id), {recipientIds: ids}, {
                    headers: {
                        Authorization: jwt
                    },
                    timeout: TIMEOUT_MILLIS
                }).then(() => {
                }).catch(()=>{throw new Error()});
                await axios.get(TEMPLATES_URI, {
                    headers: {
                        Authorization: jwt
                    },
                    timeout: TIMEOUT_MILLIS
                }).then((response: AxiosResponse<Template[], any>)=>{
                    dispatch({type: UserActions.UPDATE, payload: {user: {...user, templates: response.data}, logged: true, loading: false}});
                }).catch(()=>{throw new Error()});
            }).catch(()=>{
                throw new Error();
            });
        }
        catch(e) {
            dispatch({type: UserActions.ERROR, message: "failedUpdate"}); 
        }
    }
}

export const deleteTemplate = (user:User, templateId: number) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            let jwt = localStorage.getItem(JWT_KEY);
            if(!jwt) {               
                dispatch({type: UserActions.LOG_OUT})
            }
            dispatch({type: UserActions.WAIT, payload: {user: user, logged: true, loading: true}});
            axios.delete(TEMPLATES_URI + templateId, {headers: {Authorization: jwt},timeout: TIMEOUT_MILLIS}).then((response: AxiosResponse<boolean, any>)=>{
                if(response.data) {
                    dispatch({type: UserActions.UPDATE, payload: {user: {...user, templates: user.templates.filter((template)=>template.id!=templateId)}, logged: true, loading: false}});
                }
                else {
                    throw new Error();
                }
            }).catch(()=>{
                throw new Error();
            })
        }
        catch(e) {
            dispatch({type: UserActions.ERROR, message: "failedUpdate"}); 
        }
    }
}

export const updateTemplate = (user:User, template: Template) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            let jwt = localStorage.getItem(JWT_KEY);
            if(!jwt) {               
                dispatch({type: UserActions.LOG_OUT})
            }
            dispatch({type: UserActions.WAIT, payload: {user: user, logged: true, loading: true}});
            
            let ids = template.recipientIds.map(e => e.id);
            await axios.put(TEMPLATES_RECIPIENTS_URI(template.id), {recipientIds: ids}, {
                headers: {
                    Authorization: jwt
                },
                timeout: TIMEOUT_MILLIS
            }).then((response: AxiosResponse<Template, any>) => {
                template = response.data;
                user = {...user, templates: user.templates.map((e)=> e.id === template.id ? template : e)};
                dispatch({type: UserActions.UPDATE, payload: {user: user, logged: true, loading: false}});
            }).catch(()=>{throw new Error()})
        }
        catch(e) {
            dispatch({type: UserActions.ERROR, message: "failedUpdate"});
        }
    }
}

export const notify = (user: User, template: Template) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            let jwt = localStorage.getItem(JWT_KEY);
            if(!jwt) {               
                dispatch({type: UserActions.LOG_OUT})
            }
            dispatch({type: UserActions.WAIT, payload: {user: user, logged: true, loading: true}});
            await axios.post(NOTIFICATIONS_URI + template.id, null, {
                headers: {
                    Authorization: jwt
                },
                timeout: TIMEOUT_MILLIS
            }).then((response: AxiosResponse<string, any>) => {
                if(response.data != null) {
                    dispatch({type: UserActions.UPDATE, payload: {user: user, logged: true, loading: false}});
                }
                else {
                    throw new Error();
                }
            }).catch(()=>{throw new Error()})
        }
        catch(e) {
            dispatch({type: UserActions.ERROR, message: "failedNotify"});
        }
    }
}