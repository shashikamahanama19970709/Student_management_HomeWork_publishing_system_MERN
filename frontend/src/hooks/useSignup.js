import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup =()=>{
    const [error,setError]=useState(null)
    const [isLoading,setIsLoading]=useState(null)
    const {dispatch} = useAuthContext()


    //when signup ok then set loading and error become null
    const signup =async(email,password)=>{
            setIsLoading(true)
            setError(null)

            const response = await fetch('/api/user/signup',{
                method :'POST',
                headers :{'Content-Type':'aplication/json'},
                body :JSON.stringify({email,password})

            })
            const json=await response.json()
            
            if(!response.ok){
                setIsLoading(false)
                setError(json.error)
            }
            if(response.ok){
                //save the user to local storage
                localStorage.setItem('user',JSON.stringify(json))
                

                //update the auth context
                dispatch({type:'LOGIN',payload:json})
                setIsLoading(false)
            }
    }

    return { signup, isLoading, error }

}
