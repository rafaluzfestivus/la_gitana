"use client";

import { useState } from "react";
import { useCustomer } from "@/context/CustomerContext";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const { register, isLoading } = useCustomer();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await register(email, password, firstName, lastName);
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
                    <h1 className="font-serif text-3xl text-cream-100 mb-2">Criar Conta</h1>
                    <p className="text-cream-100/60 text-sm">Junte-se ao mundo La Gitana</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-200 text-sm p-3 rounded text-center">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-cream-100/80 text-sm uppercase tracking-wider mb-2">Nome</label>
                            <input
                                type="text"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full bg-lead-900 border border-white/10 rounded p-3 text-cream-100 focus:outline-none focus:border-gold-500/50 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-cream-100/80 text-sm uppercase tracking-wider mb-2">Sobrenome</label>
                            <input
                                type="text"
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full bg-lead-900 border border-white/10 rounded p-3 text-cream-100 focus:outline-none focus:border-gold-500/50 transition-colors"
                            />
                        </div>
                    </div>

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
                        <label className="block text-cream-100/80 text-sm uppercase tracking-wider mb-2">Senha</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-lead-900 border border-white/10 rounded p-3 text-cream-100 focus:outline-none focus:border-gold-500/50 transition-colors"
                        />
                    </div>

                    <Button className="w-full mt-4" size="lg" disabled={isLoading}>
                        {isLoading ? "Criando Conta..." : "Criar Conta"}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-cream-100/40 text-sm">
                        Já tem uma conta?{" "}
                        <Link href="/login" className="text-gold-500 hover:text-gold-400 transition-colors">
                            Entrar
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
