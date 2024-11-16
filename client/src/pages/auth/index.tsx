/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabsContent, TabsTrigger, Tabs, TabsList } from "@/components/ui/tabs";
import {apiClient} from "@/lib/api-client";
import { useAppStore } from "@/store";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const signupSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const Auth: React.FC = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});


  const navigate = useNavigate();
  const {setUserInfo} = useAppStore();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = loginSchema.safeParse(userInput);
    if (result.success) {
      setErrors({});
      const payload =  {
        email : userInput.email,
        password : userInput.password,
      };

      // WE HAVE TO PASS THIS {withCredentials:true}   to access jwt cookie
      const response = await apiClient.post(LOGIN_ROUTE,payload,{withCredentials:true});
      if(response.data.user.id){
        setUserInfo(response.data.user);
         if(response.data.user.profileSetup){
          navigate("/chat");
         }else{
          navigate("/profile");
         }
      }
    } else {
      const fieldErrors = result.error.errors.reduce((acc, curr) => {
        acc[curr.path[0] as string] = curr.message;
        return acc;
      }, {} as Record<string, string>);
      setErrors(fieldErrors);
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = signupSchema.safeParse(userInput);
    if (result.success) {
      setErrors({});
      const payload =  {
        email : userInput.email,
        password : userInput.password
      };

      // WE HAVE TO PASS THIS {withCredentials:true}   to access jwt cookie
      const response = await apiClient.post(SIGNUP_ROUTE,payload,{withCredentials:true});
      // console.log(response);
      if(response.status === 201 && response.data.user.id){
        setUserInfo(response.data.user);
        navigate("/profile");
      }
    } else {
      const fieldErrors = result.error.errors.reduce((acc, curr) => {
        acc[curr.path[0] as string] = curr.message;
        return acc;
      }, {} as Record<string, string>);
      setErrors(fieldErrors);
    }
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="h-[80vh] w-[80vw] bg-white border-2 border-white text-opacity-90 shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
            </div>
            <p className="font-medium text-center">
              Fill in the details to get started with the best chat app!
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs defaultValue="login" className="w-[70%] m-auto">
              <TabsList className="w-full grid grid-cols-2 bg-transparent">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:shadow-none data-[state=active]:border-b-2 rounded-none data-[state=active]:border-b-purple-500 p-2"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:shadow-none data-[state=active]:border-b-2 rounded-none data-[state=active]:border-b-purple-500 p-2"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form
                  action=""
                  className="mt-10 flex flex-col gap-4 items-center justify-center"
                  onSubmit={handleLogin}
                >
                  <div className="w-full">
                    <Input
                      type="email"
                      name="email"
                      value={userInput.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div className="w-full">
                    <Input
                      type="password"
                      name="password"
                      value={userInput.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                    />
                    {errors.password && (
                      <p className="text-xs text-red-600 mt-1">{errors.password}</p>
                    )}
                  </div>
                  <Button className="w-full" type="submit">
                    Login
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="signup">
                <form
                  action=""
                  className="mt-10 flex flex-col gap-4 items-center justify-center"
                  onSubmit={handleSignup}
                >
                  <div className="w-full">
                    <Input
                      type="email"
                      name="email"
                      value={userInput.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div className="w-full">
                    <Input
                      type="password"
                      name="password"
                      value={userInput.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                    />
                    {errors.password && (
                      <p className="text-xs text-red-600 mt-1">{errors.password}</p>
                    )}
                  </div>
                  <div className="w-full">
                    <Input
                      type="password"
                      name="confirmPassword"
                      value={userInput.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                  <Button className="w-full" type="submit">
                    Signup
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex items-center justify-center">
          <img src="" alt="bg-img" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
