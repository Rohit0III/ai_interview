"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {

  const { data: session } = authClient.useSession()

  const [email, setEmail] = useState("")
  const [name, setname] = useState("")
  const [password, setpassword] = useState("")

  const Onsubmit = () => {
    authClient.signUp.email({
      email,
      password,
      name,
    }, {
      onError: () => {
        window.alert("Something Went Wrong")
      },
      onSuccess: () => {
        window.alert("Login SuccessFully")
      },

    })
  }

  const OnLogin = () => {
    authClient.signIn.email({
      email,
      password,
    }, {
      onError: () => {
        window.alert("Something Went Wrong")
      },
      onSuccess: () => {
        window.alert("Login SuccessFully")
      },

    })
  }


  if (session) {
    return (
      <div className="felx flex-col p-4 gap-y-4">
        <p>Logged In as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    )
  }



  return (
    <div className="flex flex-col gap-y-10">
      <div className="p-4 flex flex-col gap-y-4">
        <Input
          placeholder="name"
          value={name}
          onChange={(e) => setname(e.target.value)} />

        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />

        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)} />

        <Button onClick={Onsubmit}
        >create new Account</Button>
      </div>

      <div className="p-4 flex flex-col gap-y-4">
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />

        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)} />

        <Button onClick={OnLogin}
        >Login</Button>
      </div>
    </div>

  );
}
