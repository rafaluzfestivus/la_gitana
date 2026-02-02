"use client";

import { useState } from "react";
import { recoverCustomerPassword } from "@/lib/shopify";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function RecoverPage() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await recoverCustomerPassword(email);
            if (res && res.customerUserErrors && res.customerUserErrors.length > 0) {
                setStatus("error");
                setMessage(res.customerUserErrors[0].message);
            } else {
                setStatus("success");
                setMessage("Se houver uma conta associada a este email, enviaremos instruções para redefinir sua senha.");
            }
        } catch (error) {
            setStatus("error");
            setMessage("Ocorreu um erro. Tente novamente.");
        }
    };

    return (
        <div className="min-h-screen bg-lead-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-lead-800 border border-white/5 rounded-xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="font-serif text-3xl text-cream-100 mb-2">Recuperar Senha</h1>
                    <p className="text-cream-100/60 text-sm">Digite seu email para receber as instruções</p>
                </div>

                {status === "success" ? (
                    <div className="text-center">
                        <div className="bg-green-500/10 border border-green-500/20 text-green-200 text-sm p-4 rounded mb-6">
                            {message}
                        </div>
                        <Link href="/login">
                            <Button variant="outline" className="w-full">Voltar para o Login</Button>
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {status === "error" && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-200 text-sm p-3 rounded text-center">
                                {message}
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

                        <Button className="w-full" size="lg" disabled={status === "loading"}>
                            {status === "loading" ? "Enviando..." : "Enviar Email"}
                        </Button>

                        <div className="text-center">
                            <Link href="/login" className="text-cream-100/40 text-sm hover:text-white transition-colors">
                                Cancelar
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
