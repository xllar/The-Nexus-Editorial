export const validateEmail = (email:any) =>{
    const regeX = /^(?=.{1,256})(?=.{1,64}@.{1,255}$)(?!.*[_.]{2})[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regeX.test(email)
}