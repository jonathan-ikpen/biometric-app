// utils/privateRoute.tsx
"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/utils/contextfile";

interface PrivateRouteProps {
    // You can define any additional props that your WrappedComponent accepts
}

export default function PrivateRoute (WrappedComponent: React.ComponentType<PrivateRouteProps>) {
    const Wrapper: React.FC<PrivateRouteProps> = (props) => {
        const { isAuthenticated } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!isAuthenticated) {
                router.push('/login');
            }
        }, [isAuthenticated]);

        // Render the wrapped component if the user is authenticated
        return <>{isAuthenticated ? <WrappedComponent {...props} /> : null}</>;
    };

    return Wrapper;
};

