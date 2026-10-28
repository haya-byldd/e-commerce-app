"use client";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const schema = z
  .object({
    firstName: z.string().trim().min(1, { error: "First name is required." }),
    lastName: z.string().trim().optional(),
    email: z
      .string()
      .trim()
      .min(1, "Email is required.")
      .pipe(z.email({ error: "Enter a valid email address." })),
    phoneNumber: z
      .string()
      .trim()
      .min(1, "Phone number is required")
      .regex(/^[0-9]{10}$/, { error: "Phone number must contain 10-digits." }),
    password: z
      .string()
      .min(1, "Password is required.")
      .min(8, "Password must be at least 8 character long.")
      .regex(/[^a-zA-Z0-9]/, {
        error: "Password must contain at least one special charater.",
      }),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    subscribe: z.boolean(),
    termsCondition: z.boolean().refine((val) => val === true, {
      error: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Password do not match",
    path: ["confirmPassword"],
  });

type SignupData = z.infer<typeof schema>;
const errorClass = "text-sm text-error";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupData>({ resolver: zodResolver(schema) });

  const handleSignUp = async (data: SignupData) => {
    try {
      const response = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save user.");
      }
      toast.success("Account created successfully!");
      reset();
    } catch (error) {
      console.log("Error saving user:", error);
      toast.error("Failed to create account. Please try again.");
    }
  };
  return (
    <>
      <div className="mb-5">
        <h1 className="text-[1.5rem] font-semibold">Create Account to Shop</h1>
      </div>
      <form
        className="space-y-4"
        noValidate
        onSubmit={handleSubmit(handleSignUp)}
      >
        <div>
          <label htmlFor="firstName" className="block text-sm ">
            First name
          </label>
          <input
            {...register("firstName")}
            type="text"
            id="firstName"
            className="border border-border p-3 rounded-input w-full mt-1"
          />
          {errors.firstName && (
            <p className={errorClass}>{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm">
            Last name
          </label>
          <input
            {...register("lastName")}
            type="text"
            id="lastName"
            className="border border-border p-3 rounded-input w-full mt-1"
          />
          {errors.lastName && (
            <p className={errorClass}>{errors.lastName.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="border border-border p-3 rounded-input w-full mt-1"
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm">
            PhoneNumber
          </label>
          <input
            {...register("phoneNumber")}
            type="tel"
            id="phoneNumber"
            className="border border-border p-3 rounded-input w-full mt-1"
          />
          {errors.phoneNumber && (
            <p className={errorClass}>{errors.phoneNumber.message}</p>
          )}
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
          {errors.password && (
            <p className={errorClass}>{errors.password.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm">
            Confirm password
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
            className="border border-border p-3 rounded-input w-full mt-1"
          />
          {errors.confirmPassword && (
            <p className={errorClass}>{errors.confirmPassword.message}</p>
          )}
        </div>
        <div className="flex space-x-1">
          <input {...register("subscribe")} type="checkbox" id="subscribe" />
          <label htmlFor="subscribe" className="text-sm ">
            Subscribe to newsletter!
          </label>
        </div>

        <div className="flex space-x-1">
          <input
            {...register("termsCondition")}
            type="checkbox"
            id="termsCondition"
          />

          <label htmlFor="termsCondition" className="text-sm ">
            I agree to the Terms and Conditions
          </label>
        </div>
        {errors.termsCondition && (
          <p className={errorClass}>{errors.termsCondition.message}</p>
        )}

        <button
          disabled={isSubmitting}
          className="w-full bg-primary text-white px-6 py-3 rounded-button text-sm font-semibold cursor-pointer"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </form>
      <p className="text-center text-sm mt-5 text-primary">
        Already have an account?
        <Link href="/login" className="text-success underline">
          Log In
        </Link>
      </p>
    </>
  );
};

export default SignUpForm;
