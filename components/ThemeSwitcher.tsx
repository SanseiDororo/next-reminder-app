'use client'

import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  //using this for avoiding hydration errors
  //runs only ones
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  return (
    <div>
      <Tabs defaultValue={theme}>
        <TabsList className="flex gap-4 border dark:border-neutral-800 dark:bg-[#030303]">
          <TabsTrigger value="light" onClick={(e) => setTheme('light')}>
            <SunIcon className="h-[1.2rem] w-[1.2rem]" />
          </TabsTrigger>
          <TabsTrigger value="dark" onClick={(e) => setTheme('dark')}>
            <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0" />
          </TabsTrigger>
          <TabsTrigger value="system" onClick={(e) => setTheme('system')}>
            <DesktopIcon className="h-[1.2rem] w-[1.2rem]" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
export default ThemeSwitcher
