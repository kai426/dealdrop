import AddProductForm from "@/components/AddProductForm";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { Bell, Rabbit, Shield, TrendingDown } from "lucide-react";
import Image from "next/image";
import { getProducts } from "./actions";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const products = user ? await getProducts(): [];

  const FEATURES = [
    {
      icon: Rabbit,
      title: "Extremamente Rápido",
      description:
        "O Deal Drop extrai preços em segundos, lidando com JavaScript e conteúdo dinâmico",
    },
    {
      icon: Shield,
      title: "Sempre Confiável",
      description:
        "Funciona em todos os principais sites de e-commerce com proteção anti-bot integrada",
    },
    {
      icon: Bell,
      title: "Alertas Inteligentes",
      description: "Seja notificado instantaneamente quando os preços caírem abaixo do seu alvo",
    },
  ];

  return (
    <main className="min-h-screen bg-linear-to-br from-orange-50 via-white">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src={"/deal-drop-logo.png"} alt="Deal Drop Logo"
              width={600}
              height={200}
              className="h-10 w-auto"
            /> 
          </div>

          <AuthButton user={user} />
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-6 py-2 rounded-full text-sm font-medium mb-6">Feito com ❤️ por Kaíky Medeiros Gonçalves</div>
          
          <h2 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">Nunca Perca uma Queda de Preço</h2>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Acompanhe preços de qualquer site de e-commerce. Receba alertas instantâneos quando os preços caírem. Economize dinheiro sem esforço.
          </p>

          {/* Adicionar Produto */}
          <AddProductForm user={user} />

          {/* Funcionalidades */}
          {products.length === 0 && (
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
              {FEATURES.map(({icon: Icon, title, description}) => (
                <div
                  key={title}
                  className="bg-white p-6 rounded-xl border border-gray-200"
                  >
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {user && products.length > 0 && (
        <section className="max-w-7xl mx-auto pb-20 px-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Seus Produtos</h3>
            <span className="text-sm text-gray-500">
              {products.length} {products.length === 1 ? 'produto' : 'produtos'}
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 items-start">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {user && products.length === 0 && (
        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12">
            <TrendingDown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Ainda não há produtos
            </h3>
            <p className="text-gray-600">Adicione produtos para receber alertas personalizados e economizar nas suas compras.</p> 
          </div>
        </section>
      )}
    </main>
  );
}
