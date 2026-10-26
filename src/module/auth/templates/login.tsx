"use client"

import Link from "next/link";
import{useForm} from "react-hook-form";
import {email, z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const validationSchema = z.object({
    email: z.string().trim().min(1, {error: "Email is required."}).pipe(z.email({error: "Enter a valid email address."})),
    password: z.string().min(1, "Password is required.").min(8, {error: "Password must be at least 8 characters."}).regex(/[^a-zA-Z0-9]/, {error: "Password must contain at least one special character."})
})

type Schema = z.infer<typeof validationSchema> 

const submitData = (data: Schema) => {
console.log(data)
}

const LoginForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({resolver: zodResolver(validationSchema) })
  return (
    <>
      <div className="mb-5">
        <h1 className="text-[1.5rem] font-semibold">Welcome back to Shop</h1>
      </div>
      <form className="space-y-4" noValidate onSubmit={handleSubmit(submitData)}>
        <div>
          <label htmlFor="email" className="block text-sm ">
            Email
          </label>
          <input
          {...register("email")}
            type="email"
            id="email"
            className="border border-border p-3 rounded-input w-full mt-1"
          />
          {errors.email && <p className="text-sm text-error">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm">
            Password
          </label>
          <input
          {...register("password")}

            type="password"
            id="password"
            className="border border-border p-3 rounded-input w-full mt-1"
          />
          {errors.password && <p className="text-sm text-error">{errors.password.message}</p>}

        </div>

        <button className="w-full bg-primary text-white px-6 py-3 rounded-button text-sm font-semibold cursor-pointer">
          Log In
        </button>
      </form>
      <p className="text-center text-sm mt-5 text-primary">
        New to Shop? 
         <Link href="/signup" className="text-success underline">
        Create an Account
        </Link>
      </p>
    </>












  );
};

export default LoginForm;
