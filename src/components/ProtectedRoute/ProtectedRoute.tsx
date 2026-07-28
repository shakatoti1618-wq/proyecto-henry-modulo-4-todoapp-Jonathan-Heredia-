import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "firebase/auth";

import { observeAuth } from "../../services/auth"

interface ProtectedRouteProps {
    children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = observeAuth((currentUser) => {
            setUser(currentUser);
            setLoading(false);

        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;