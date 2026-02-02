"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createCustomer, createCustomerAccessToken, getCustomer } from "@/lib/shopify";
import { Customer } from "@/lib/shopifyTypes";
import { useRouter } from "next/navigation";

interface CustomerContextType {
    customer: Customer | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<{ error?: string }>;
    register: (email: string, password: string, firstName: string, lastName: string) => Promise<{ error?: string }>;
    logout: () => void;
    isLoading: boolean;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export function CustomerProvider({ children }: { children: ReactNode }) {
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Check for existing token on mount
    useEffect(() => {
        const init = async () => {
            const storedToken = localStorage.getItem("shopifyCustomerToken");
            if (storedToken) {
                setAccessToken(storedToken);
                await fetchCustomer(storedToken);
            } else {
                setIsLoading(false);
            }
        };
        init();
    }, []);

    const fetchCustomer = async (token: string) => {
        try {
            const data = await getCustomer(token);
            if (data) {
                setCustomer(data);
            } else {
                // Token invalid or expired
                logout();
            }
        } catch (e) {
            console.error(e);
            logout();
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const res = await createCustomerAccessToken({ email, password });

            if (!res) {
                return { error: "Failed to connect to Shopify" };
            }

            if (res.customerUserErrors?.length > 0) {
                return { error: res.customerUserErrors[0].message };
            }

            const token = res.customerAccessToken?.accessToken;
            if (token) {
                localStorage.setItem("shopifyCustomerToken", token);
                setAccessToken(token);
                await fetchCustomer(token);
                router.refresh();
                return {};
            }
            return { error: "Failed to retrieve access token" };
        } catch (error) {
            return { error: "An unexpected error occurred" };
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email: string, password: string, firstName: string, lastName: string) => {
        setIsLoading(true);
        try {
            const res = await createCustomer({ email, password, firstName, lastName });

            if (!res) {
                return { error: "Failed to connect to Shopify" };
            }

            if (res.customerUserErrors?.length > 0) {
                return { error: res.customerUserErrors[0].message };
            }

            // Auto login after register
            if (res.customer?.id) {
                return await login(email, password);
            }
            return { error: "Registration failed" };
        } catch (error) {
            return { error: "An unexpected error occurred" };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("shopifyCustomerToken");
        setAccessToken(null);
        setCustomer(null);
        router.push("/");
        router.refresh();
    };

    return (
        <CustomerContext.Provider value={{ customer, isAuthenticated: !!customer, login, register, logout, isLoading }}>
            {children}
        </CustomerContext.Provider>
    );
}

export function useCustomer() {
    const context = useContext(CustomerContext);
    if (context === undefined) {
        throw new Error("useCustomer must be used within a CustomerProvider");
    }
    return context;
}
