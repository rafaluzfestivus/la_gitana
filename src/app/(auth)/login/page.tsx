"use client";

import { useState } from "react";
import { useCustomer } from "@/context/CustomerContext";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { login, isLoading } = useCustomer();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await login(email, password);
        if (res.error) {
            setError(res.error);
        } else {
            router.push("/account");
        }
    };

    return (
        <div className="min-h-screen bg-lead-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-lead-800 border border-white/5 rounded-xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="font-serif text-3xl text-cream-100 mb-2">Bem-vindo</h1>
                    <p className="text-cream-100/60 text-sm">Entre na sua conta La Gitana</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-200 text-sm p-3 rounded text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-cream-100/80 text-sm uppercase tracking-wider mb-2">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-lead-900 border border-white/10 rounded p-3 text-cream-100 focus:outline-none focus:border-gold-500/50 transition-colors"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-cream-100/80 text-sm uppercase tracking-wider">Senha</label>
                            <Link href="/recover" className="text-xs text-gold-500 hover:text-gold-400">
                                Esqueceu a senha?
                            </Link>
                        </div>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-lead-900 border border-white/10 rounded p-3 text-cream-100 focus:outline-none focus:border-gold-500/50 transition-colors"
                        />
                    </div>

                    <Button className="w-full" size="lg" disabled={isLoading}>
                        {isLoading ? "Entrando..." : "Entrar"}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-cream-100/40 text-sm">
                        Ainda não tem conta?{" "}
                        <Link href="/register" className="text-gold-500 hover:text-gold-400 transition-colors">
                            Criar conta
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
