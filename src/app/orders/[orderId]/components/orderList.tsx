// components/OrderProductList.tsx
import Image from "next/image";
import { MapPin } from "lucide-react";

interface Product {
  img: string;
  name: string;
  color: string;
  size: string;
  qty: number;
  price: number;
}

export default function OrderProductList({ products, address }: { products: Product[]; address: string }) {
  return (
    <div className="bg-white rounded-xl p-4 mt-4 border">
      <div className="mb-2 text-gray-500 text-sm">Ship to</div>
      <div className="flex items-center mb-4 text-gray-700 border-b border-gray-200 pb-4">
        <MapPin className="w-5 h-5 mr-2" />
        {address}
      </div>
      {products.map((product, idx) => (
        <div key={idx} className="flex items-center gap-4 mb-4">
          <Image src={product.img} alt="" width={56} height={56} className="rounded-lg bg-gray-100" />
          <div>
            <div className="font-semibold">{product.name}</div>
            <div className="text-gray-400 text-sm">{product.color} • {product.size}</div>
            <div className="text-gray-400 text-sm">Quantity • {product.qty}</div>
          </div>
          <div className="ml-auto font-semibold">${product.price.toFixed(2)}</div>
        </div>
      ))}
      <div className="flex justify-between items-center mt-2 font-bold text-lg">
        <span>Total Amount</span>
        <span>${products.reduce((sum, p) => sum + p.price, 0).toFixed(2)}</span>
      </div>
    </div>
  );
}