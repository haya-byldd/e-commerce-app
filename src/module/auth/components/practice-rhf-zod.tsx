"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const labelClass = "mb-2 block text-sm font-medium text-slate-700";
const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";
const errorClass = "mt-1 text-sm text-red-600";

const schema = z.object({
  fullName: z.string().trim().min(1, {error: "Full name is required"}),
  email: z.string().trim().min(1, { error: "Email is required" }).pipe(z.email({ error: "Enter a valid email address" })),
  age: z.number({error: "Age is required"}).min(16, "Age must be at least 16.").max(60, {error: "Age should not be more than 60."}),
  phoneNumber: z.string().trim() .min(1, { error: "Phone number is required" }).regex(/^[0-9]{10}$/, {error: "Phone number must contain 10-digits."}),
  password:  z.string().min(1, { error: "Password is required." }).min(8, { error: "Password must be at least 8 characters." }).regex(/[^a-zA-Z0-9]/, {error: "Password must contain at least one special character."}),
  confirmPassword: z.string().min(1, {error: "Please confirm your password."}),
  gender: z.enum(["male","female"], {error: "You must select a gender."})
 
}).refine((data) => data.password === data.confirmPassword, {error: "Password do not match", path: ["confirmPassword"]} )

type FormData = z.infer<typeof schema>

const formSubmit = (data : FormData) => {
  console.log(data)
}
export default function RHFZod() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({resolver: zodResolver(schema)});

  return (
    <main className="min-h-screen bg-slate-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Create an account</h1>
          <p className="mt-2 text-sm text-slate-500">
            Fill in the details below to create your account.
          </p>
        </div>

        <form noValidate onSubmit={handleSubmit(formSubmit)}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="fullName" className={labelClass}>Full Name</label>
              <input {...register("fullName")} type="text" id="fullName" placeholder="Enter your full name" className={inputClass} />
              {errors.fullName && <p className={errorClass}>{errors.fullName.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>Email</label>
              <input {...register("email")} type="email" id="email" placeholder="example@gmail.com" className={inputClass} />
              {errors.email && <p className={errorClass}>{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="age" className={labelClass}>Age</label>
              <input {...register("age", {valueAsNumber: true})} type="number" id="age" placeholder="Enter your age" className={inputClass} />
              {errors.age && <p className={errorClass}>{errors.age.message}</p>}
            </div>

            <div>
              <label htmlFor="phoneNumber" className={labelClass}>Phone number</label>
              <input {...register("phoneNumber")} type="tel" id="phoneNumber" placeholder="Enter your Phone number" className={inputClass} />
              {errors.phoneNumber && <p className={errorClass}>{errors.phoneNumber.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className={labelClass}>Password</label>
              <input {...register("password")} type="password" id="password" placeholder="Create a password" className={inputClass} />
              {errors.password && <p className={errorClass}>{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className={labelClass}>Confirm password</label>
              <input {...register("confirmPassword")} type="password" id="confirmPassword" placeholder="Confirm your password" className={inputClass} />
              {errors.confirmPassword && <p className={errorClass}>{errors.confirmPassword.message}</p>}
            </div>

            <fieldset>
              <legend className={labelClass}>Gender</legend>
              <div className="flex w-full gap-4 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900">
                <div className="flex items-center gap-1">
                  <input {...register("gender")} type="radio" id="male" value="male" />
                  <label htmlFor="male">Male</label>
                </div>
                <div className="flex items-center gap-1">
                  <input {...register("gender")} type="radio" id="female" value="female" />
                  <label htmlFor="female">Female</label>
                </div>
              </div>
              {errors.gender && <p className={errorClass}>{errors.gender.message}</p>}
            </fieldset>

            <div>
              <label htmlFor="language" className={labelClass}>Language</label>
              <select {...register("language")} id="language" className={inputClass}>
                <option value="" disabled>Select your language</option>
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
              </select>
              {errors.language && <p className={errorClass}>{errors.language.message}</p>}
            </div>

            <fieldset className="col-span-1 md:col-span-2">
              <legend className={labelClass}>Area of Expertise</legend>
              <div className="flex w-full flex-wrap gap-4 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900">
                <div className="flex items-center gap-1">
                  <input {...register("areaOfExpertise")} type="checkbox" id="frontend" value="frontend" />
                  <label htmlFor="frontend">Frontend Development</label>
                </div>
                <div className="flex items-center gap-1">
                  <input {...register("areaOfExpertise")} type="checkbox" id="backend" value="backend" />
                  <label htmlFor="backend">Backend Development</label>
                </div>
                <div className="flex items-center gap-1">
                  <input {...register("areaOfExpertise")} type="checkbox" id="ui/ux" value="uiUx" />
                  <label htmlFor="ui/ux">UI/UX</label>
                </div>
                <div className="flex items-center gap-1">
                  <input {...register("areaOfExpertise")} type="checkbox" id="testing" value="testing" />
                  <label htmlFor="testing">Testing</label>
                </div>
              </div>
              {errors.areaOfExpertise && <p className={errorClass}>{errors.areaOfExpertise.message}</p>}
            </fieldset>

            <div className="col-span-1 md:col-span-2">
              <label htmlFor="bio" className={labelClass}>Bio</label>
              <textarea {...register("bio")} id="bio" placeholder="Write something" className={inputClass} />
              {errors.bio && <p className={errorClass}>{errors.bio.message}</p>}
            </div>
          </div>

          <div className="mt-8">
            <button type="submit" className="w-full rounded-lg bg-indigo-500 py-2 text-md text-white hover:bg-indigo-700">
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
