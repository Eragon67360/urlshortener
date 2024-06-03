
import React, { ReactNode } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'sonner';
import { Analytics } from "@vercel/analytics/react"

export function Providers({ children }: { children: ReactNode }) {
    return (
        <NextUIProvider>
            {children}
            <Toaster position="bottom-center" richColors />
            <Analytics/>
        </NextUIProvider>
    )
}
