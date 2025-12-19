"use client"

import { deleteProduct } from "@/app/actions";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { ChevronDown, ChevronUp, ExternalLink, Trash2, TrendingDown } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import PriceChart from "./PriceChart";

const ProductCard = ({ product }) => {
    const [showChart, setShowChart] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Tem certeza que deseja deletar este produto?")) return;

        // Lógica para deletar o produto
        setDeleting(true);
        const result = await deleteProduct(product.id);

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success(result.message || "Produto deletado com sucesso!");
            setUrl('');
        }

        setDeleting(false);
    }

    return (
        <Card className={"hover:shadow-lg transition-shadow"}>
            <CardHeader className={'pb-3'}>
                <div className="flex gap-4">
                    {product.image_url ? (
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-md border"
                        />
                    ) : (
                        // Imagem placeholder ou nada
                        <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-md border text-xs text-gray-400">
                            Sem imagem
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                            {product.name}
                        </h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-orange-500">
                                {product.current_price} {product.currency}
                            </span>

                            <Badge variant={'secondary'} className={'gap-1'}>
                                <TrendingDown className="w-3 h-3" />
                                Rastreando
                            </Badge>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowChart(!showChart)}
                        className={'gap-1 cursor-pointer'}
                    >
                        {showChart ? (
                            <>
                                <ChevronUp className="h-4 w-4" />
                                Ocultar
                            </>
                        ) : (
                            <>
                                <ChevronDown className="h-4 w-4" />
                                Exibir
                            </>
                        )}
                    </Button>

                    <Button variant="outline" size="sm" asChild className={'gap-1 cursor-pointer'}>
                        <Link href={product.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            Ver Produto
                        </Link>
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDelete}
                        disabled={deleting}
                        className={'text-red-600 hover:text-red-700 hover:bg-red-50 gap-1 cursor-pointer'}
                    >
                        <Trash2 className="h-4 w-4" />
                        {deleting ? 'Deletando...' : 'Deletar'}
                    </Button>
                </div>
            </CardContent>
            {showChart && (
                <CardFooter className={'pt-0'}>
                    <PriceChart productId={product.id} />
                </CardFooter>
            )}
        </Card>
    )
}

export default ProductCard
