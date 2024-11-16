/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabsContent, TabsTrigger,Tabs, TabsList } from "@/components/ui/tabs";
import React, { useState } from "react";

const Auth: React.FC = () => {
    const [userInput, setuserInput] = useState({
     email:"",
     password:"",
     confirmPassword:""
    });

    const handleInputChange = (e:any) => {
      const {name, value} = e.target;
      setuserInput((prev)=>({...prev,[name]:value}))
    }

    const handleLogin = () =>{
        
    }
    const handleSignup = () =>{

    }
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
    <TabsTrigger value="login" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 rounded-none data-[state=active]:border-b-purple-500 p-2">Login</TabsTrigger>
    <TabsTrigger value="signup" className="data-[state=active]:shadow-none data-[state=active]:border-b-2 rounded-none data-[state=active]:border-b-purple-500 p-2">Signup</TabsTrigger>
  </TabsList>
  <TabsContent value="login">
  <form action="" className="mt-10 flex flex-col gap-4 items-center justify-center">
  <Input type="email" name="email" value={userInput.email} onChange={handleInputChange} placeholder="Enter your email address" />
    <Input type="password" name="password" value={userInput.password} onChange={handleInputChange} placeholder="Enter your password" />
    <Button className="w-full"onClick={handleLogin}>Login</Button>
  </form>
  </TabsContent>
  <TabsContent value="signup">
  <form action="" className="mt-10 flex flex-col gap-4 items-center justify-center">
  <Input type="email" name="email" value={userInput.email} onChange={handleInputChange} placeholder="Enter your email address" />
    <Input type="password" name="password" value={userInput.password} onChange={handleInputChange} placeholder="Enter your password" />
    <Input type="password" name="confirmPassword" value={userInput.confirmPassword} onChange={handleInputChange} placeholder="Confirm your password" />
    <Button className="w-full"onClick={handleSignup}>Signup</Button>
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
