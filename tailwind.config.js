import { nextui } from "@nextui-org/react"
/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    layout: {
      spacingUnit: 4, // in px
      disabledOpacity: ".5", // this value is applied as opacity-[value] when the component is disabled
      dividerWeight: "1px", // h-divider the default height applied to the divider component
      fontSize: {
        tiny: "0.75rem", // text-tiny
        small: "0.875rem", // text-small
        medium: "1rem", // text-medium
        large: "1.125rem", // text-large
      },
      lineHeight: {
        tiny: "1rem", // text-tiny
        small: "1.25rem", // text-small
        medium: "1.5rem", // text-medium
        large: "1.75rem", // text-large
      },
      radius: {
        small: "8px", // rounded-small
        medium: "12px", // rounded-medium
        large: "14px", // rounded-large
      },
      borderWidth: {
        small: "1px", // border-small
        medium: "2px", // border-medium (default)
        large: "3px", // border-large
      }
    },
    themes: {
      light: {
        colors: {
          primary: {
            50:"#f0fdfa",
            100:"#ccfbf1",
            200:"#99f6e4",
            300:"#5eead4",
            400:"#2dd4bf",
            500:"#14b8a6",
            600:"#0d9488",
            700:"#0f766e",
            800:"#115e59",
            900:"#134e4a",
            950:"#042f2e",
            DEFAULT:"#14b8a6",
          },
          warning:{    
            50:"#fefce8",
            100:"#fef9c3",
            200:"#fef08a",
            300:"#fde047",
            400:"#facc15",
            500:"#eab308",
            600:"#ca8a04",
            700:"#a16207",
            800:"#854d0e",
            900:"#713f12",
            950:"#422006",
            DEFAULT:"#facc15",
          },
          danger: {
            50:"#fff1f2",
            100:"#ffe4e6",
            200:"#fecdd3",
            300:"#fda4af",
            400:"#fb7185",
            500:"#f43f5e",
            600:"#e11d48",
            700:"#be123c",
            800:"#9f1239",
            900:"#881337",
            950:"#4c0519",
            DEFAULT: "#e11d48",
          },
          focus: "#000000"
        },
        layout: {
          boxShadow: {
            // shadow-small
            small:
              "0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 2px 10px 0px rgb(0 0 0 / 0.06), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
            // shadow-medium
            medium:
              "0px 0px 15px 0px rgb(0 0 0 / 0.03), 0px 2px 30px 0px rgb(0 0 0 / 0.08), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
            // shadow-large
            large:
              "0px 0px 30px 0px rgb(0 0 0 / 0.04), 0px 30px 60px 0px rgb(0 0 0 / 0.12), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
          },
        },
      },
      dark: {
        colors: {
          primary: {
            50:"#f0fdfa",
            100:"#ccfbf1",
            200:"#99f6e4",
            300:"#5eead4",
            400:"#2dd4bf",
            500:"#14b8a6",
            600:"#0d9488",
            700:"#0f766e",
            800:"#115e59",
            900:"#134e4a",
            950:"#042f2e",
            DEFAULT:"#115e59",
          },
          warning:{    
            50:"#fefce8",
            100:"#fef9c3",
            200:"#fef08a",
            300:"#fde047",
            400:"#facc15",
            500:"#eab308",
            600:"#ca8a04",
            700:"#a16207",
            800:"#854d0e",
            900:"#713f12",
            950:"#422006",
            DEFAULT:"#eab308",
          },
          danger: {
            50:"#fff1f2",
            100:"#ffe4e6",
            200:"#fecdd3",
            300:"#fda4af",
            400:"#fb7185",
            500:"#f43f5e",
            600:"#e11d48",
            700:"#be123c",
            800:"#9f1239",
            900:"#881337",
            950:"#4c0519",
            DEFAULT:"#9f1239",
          },
          focus: "#000000"
        },
        layout: {
          boxShadow: {
            // shadow-small
            small:
              "0px 0px 5px 0px rgb(0 0 0 / 0.05), 0px 2px 10px 0px rgb(0 0 0 / 0.2), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
            // shadow-medium
            medium:
              "0px 0px 15px 0px rgb(0 0 0 / 0.06), 0px 2px 30px 0px rgb(0 0 0 / 0.22), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
            // shadow-large
            large:
              "0px 0px 30px 0px rgb(0 0 0 / 0.07), 0px 30px 60px 0px rgb(0 0 0 / 0.26), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
          },
        },
      },
    }
  })]
}

