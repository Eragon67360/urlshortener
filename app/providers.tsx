
import React, { ReactNode } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'sonner';
export function Providers({ children }: { children: ReactNode }) {
    return (
        <NextUIProvider>
            {children}
            <Toaster position="bottom-center" richColors />
        </NextUIProvider>
    )
}
