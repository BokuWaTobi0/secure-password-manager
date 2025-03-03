import PropTypes from "prop-types";
import { createContext, useCallback, useContext, useState } from "react";

const KeyGenerationContext=createContext();
export const KeyGenerationProvider=({children})=>{

    const [userKeys,setUserKeys]=useState(null);

    const generateKeysFromPassword = useCallback((password,salt)=>{
        return new Promise((resolve,reject)=>{
            const worker = new Worker(new URL("../utils/web-workers/keyWorker.js",import.meta.url))
            
            worker.postMessage({password,salt});
            worker.onmessage=(event)=>{
                if(event.data.error){
                    reject(event.data.error);
                }else{
                    setUserKeys({
                        userAes128Key:event.data.aes128Key,
                        userAes256Key:event.data.aes256Key
                    })
                    resolve(event.data);
                }
                worker.terminate();
            }
            worker.onerror=(error)=>{
                reject(error.message);
                worker.terminate();
            }
        })
    },[]);

    return(
        <KeyGenerationContext.Provider value={{
            userKeys,
            generateKeysFromPassword
        }}>
            {children}
        </KeyGenerationContext.Provider>
    )
}
KeyGenerationProvider.propTypes={
    children:PropTypes.node,
}
export const useKeyGenerationContext=()=>useContext(KeyGenerationContext);