import { useForm } from "react-hook-form"
import { signInSchema } from "../../utils/validation"
import { yupResolver } from "@hookform/resolvers/yup"
import AuthInput from "./AuthInput"
import { useDispatch, useSelector } from "react-redux"
import { PulseLoader } from "react-spinners"
import { Link, useNavigate } from "react-router-dom"
import {  loginUser } from "../../features/userSlice"



const LoginForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState : {errors} 
  }= useForm({
    resolver : yupResolver(signInSchema)
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {status,error} = useSelector((state) => state.user)

  const onSubmit  = async (values) => {
   const res =  await dispatch(loginUser(values))
   if(res?.payload?.user){
    navigate("/")
   }
  }

  console.log(error)

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-md space-y-8 p-10 rounded-xl dark:bg-dark_bg_2"> 
      <div className="text-center dark:text-dark_text_1">
      <h2 className="mt-6 text-3xl font-bold">Welcome back</h2>
      <p className="mt-2 text-sm">Sign in</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}  className=" mt-6 space-y-6">

        <AuthInput
        name="email"
        type="email"
        placeholder="Email address"
        register={register}
        error={errors?.email?.message}
        />
      
        <AuthInput
        name="password"
        type="password"
        placeholder="Password"
        register={register}
        error={errors?.password?.message}
        />


      {
        error ? <div>
          <p className="text-red-400">{error}</p>
        </div> : null
      }

        <button className=" w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 
        shadow-lg cursor-pointer transition ease-in duration-300" type="submit">
          {status==="loading" ? <PulseLoader color="#fff" size={16}/>:"Sign in"}
        </button>

        <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
          <span>you do not have an account ?</span>
          <Link to="/register" className="hover:underline cursor-pointer transition ease-in duration-300">Sign Up</Link>
        </p>
      </form>
      </div>
    </div>
  )
}

export default LoginForm