"use client";
import Image from "next/image";
import OrderStatusStepper from "./components/statusStepper";
import OrderProductList from "./components/orderList";
import { Search } from "lucide-react";

const products = [
	{
		img: "/images/product.png",
		name: "Product Name",
		color: "Black",
		size: "Large",
		qty: 2,
		price: 34.0,
	},
	{
		img: "/images/product.png",
		name: "Product Name",
		color: "Black",
		size: "Large",
		qty: 2,
		price: 34.0,
	},
];

export default function Page() {
	return (
		<div className="flex flex-col  h-screen w-full">
			<div className="p-8 w-full">
				<div className="flex items-center justify-between py-10 mx-6">
					<div className="flex items-center gap-2 text-[18px]">
						<button className="">&larr;</button>
						<h1 className=" font-bold">Order Details</h1>
					</div>
          <div className="flex items-center gap-4 border p-2 rounded-xl shadow-sm">
            <Search className="text-gray-400" />
						<input
							type="text"
							placeholder="Search Account"
							className=""
						/>
					</div>
					
				</div>
        <div className="bg-white  p-4 mt-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-3xl font-bold mb-2">Order Confirmed</div>
              <div className="text-gray-400 mb-6 text-xl">
                Order ID #ADI-1254512
              </div>
            </div>
            <Image
              src="/images/brand.png"
              alt="Brand"
              width={70}
              height={40}
            />
          </div>
					
					<OrderStatusStepper currentStep={2} />
					<OrderProductList
						products={products}
						address="House Number 2345, 516 Chandler Groves, New Mexico"
					/>
				</div>
			</div>
		</div>
	);
}