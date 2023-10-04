
import { Divider, Image } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute top-3 right-3">
      {theme == 'dark' ?
        <div className="flex justify-center w-8 h-8">
          <button onClick={() => setTheme('light')}>
            <Image
              alt="Moon Outline - Iconfinder"
              src="/sun_icon.png"
            />
          </button>
        </div>
        :
        <div className="flex justify-center w-8 h-8d">
          <button onClick={() => setTheme('dark')}><Image
            alt="Sun icon - Iconfinder"
            src="/moon_icon.png"
          /></button>
        </div>
      }
    </div>
  )
};