"use client";

import { ReactNode } from "react";
import { CartDrawer } from "@/components/ui";

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <>
            {children}
            <CartDrawer />
        </>
    );
}

export default Providers;
