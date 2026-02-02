"use client";

import { useCustomer } from "@/context/CustomerContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Package, MapPin, User as UserIcon, LogOut } from "lucide-react";

export default function AccountPage() {
    const { customer, isAuthenticated, isLoading, logout } = useCustomer();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading || !customer) {
        return (
            <div className="min-h-screen bg-cream-100 flex items-center justify-center">
                <p className="text-earth-900 animate-pulse">Carregando...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream-100 pt-32 pb-16 px-4 md:px-8">
            <div className="container mx-auto max-w-5xl">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="font-serif text-3xl text-earth-900 mb-2">Minha Conta</h1>
                        <p className="text-earth-900/60">Bem-vindo de volta, {customer.firstName}</p>
                    </div>
                    <Button variant="outline" onClick={logout} className="flex items-center gap-2">
                        <LogOut className="h-4 w-4" /> Sair
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Orders */}
                    <div className="md:col-span-2 space-y-6">
                        <h2 className="font-serif text-xl text-earth-900 flex items-center gap-2">
                            <Package className="h-5 w-5" /> Meus Pedidos
                        </h2>
                        {customer.orders?.edges?.length > 0 ? (
                            <div className="space-y-4">
                                {customer.orders.edges.map(({ node: order }) => (
                                    <div key={order.id} className="bg-white p-6 rounded-lg shadow-sm border border-earth-900/10">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="font-bold text-earth-900">Pedido #{order.orderNumber}</p>
                                                <p className="text-sm text-earth-900/60">{new Date(order.processedAt).toLocaleDateString()}</p>
                                            </div>
                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                                Confirmado
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            {order.lineItems.edges.map(({ node: item }, i) => (
                                                <div key={i} className="flex justify-between text-sm">
                                                    <span className="text-earth-900/80">{item.title} x{item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-earth-900/10 flex justify-between items-center text-sm font-medium">
                                            <span>Total</span>
                                            <span>{order.totalPrice.amount} {order.totalPrice.currencyCode}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-8 rounded-lg border border-earth-900/10 text-center">
                                <p className="text-earth-900/50 mb-4">Você ainda não tem pedidos.</p>
                                <Link href="/">
                                    <Button>Começar a Comprar</Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Sidebar: Address & Profile */}
                    <div className="space-y-8">
                        {/* Profile Card */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-earth-900/10">
                            <h2 className="font-serif text-lg text-earth-900 flex items-center gap-2 mb-4">
                                <UserIcon className="h-4 w-4" /> Dados Pessoais
                            </h2>
                            <div className="text-sm text-earth-900/80 space-y-1">
                                <p><span className="font-medium">Nome:</span> {customer.firstName} {customer.lastName}</p>
                                <p><span className="font-medium">Email:</span> {customer.email}</p>
                            </div>
                        </div>

                        {/* Address Card */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-earth-900/10">
                            <h2 className="font-serif text-lg text-earth-900 flex items-center gap-2 mb-4">
                                <MapPin className="h-4 w-4" /> Endereço Padrão
                            </h2>
                            {customer.defaultAddress ? (
                                <div className="text-sm text-earth-900/80 space-y-1">
                                    <p>{customer.defaultAddress.address1}</p>
                                    <p>{customer.defaultAddress.city}, {customer.defaultAddress.country}</p>
                                    <p>{customer.defaultAddress.zip}</p>
                                </div>
                            ) : (
                                <p className="text-sm text-earth-900/50">Nenhum endereço cadastrado.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
