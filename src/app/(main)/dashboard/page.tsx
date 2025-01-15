"use client"
import { SignOutButton, UserButton } from '@clerk/nextjs'
import React from 'react'
import { useRouter } from 'next/navigation'
import router from 'next/router'
import { Button } from "@/components/ui/button"; // Assuming you have a custom button component
import { Sign } from 'crypto'


function Dashboard() {
  const router = useRouter();

  return (
    <div>
      <UserButton />
      <SignOutButton />
      hi
    </div>
  )
}

export default Dashboard
