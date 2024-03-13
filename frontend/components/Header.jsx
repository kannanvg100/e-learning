'use client'
import { Avatar } from '@nextui-org/react'
import { Bell, ChevronDown, Mail, Moon } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Header() {
    const user = useSelector(state => state.user)
  return (
    <div className='flex gap-3 items-center'>
        <Mail size={16}/>
        <Bell size={16}/>
        <Moon size={16}/>
        <Avatar name="E" size='md'/>
        <p>{user?.name || 'User'}</p>
        <ChevronDown size={16}/>
    </div>
  )
}
