import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div
          class="bg-gray-200 lg:w-full mb-20"
          style={{ height: "1px" }}
        ></div>
        <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <div>
            <p class="text-sm font-bold leading-10">Products</p>
            <p class="text-sm text-gray-500 leading-10">Bag</p>
            <p class="text-sm text-gray-500 leading-10">Tees</p>
            <p class="text-sm text-gray-500 leading-10">Objects</p>
            <p class="text-sm text-gray-500 leading-10">Home Goods</p>
            <p class="text-sm text-gray-500 leading-10">Accessories</p>
          </div>
          <div>
            <p class="text-sm font-bold leading-10">Customer Service</p>
            <p class="text-sm text-gray-500 leading-10">Contact</p>
            <p class="text-sm text-gray-500 leading-10">Shipping</p>
            <p class="text-sm text-gray-500 leading-10">Returns</p>
            <p class="text-sm text-gray-500 leading-10">Warranty</p>
            <p class="text-sm text-gray-500 leading-10">Secure payment</p>
            <p class="text-sm text-gray-500 leading-10">FAQ</p>
            <p class="text-sm text-gray-500 leading-10">Find a store</p>
          </div>
          <div>
            <p class="text-sm font-bold leading-10">Company</p>
            <p class="text-sm text-gray-500 leading-10">Who we are</p>
            <p class="text-sm text-gray-500 leading-10">Sustainability</p>
            <p class="text-sm text-gray-500 leading-10">Press</p>
            <p class="text-sm text-gray-500 leading-10">Careers</p>
            <p class="text-sm text-gray-500 leading-10">Terms & Conditions</p>
            <p class="text-sm text-gray-500 leading-10">Privacy</p>
          </div>
          <div>
            <p class="text-sm font-bold leading-10">Legal</p>
            <p class="text-sm text-gray-500 leading-10">Terms of Service</p>
            <p class="text-sm text-gray-500 leading-10">Return Policy</p>
            <p class="text-sm text-gray-500 leading-10">Privacy Policy</p>
            <p class="text-sm text-gray-500 leading-10">Shipping Policy</p>
          </div>
        </div>
        <div
          class="bg-gray-200 lg:w-full mt-20 mb-10"
          style={{ height: "1px" }}
        ></div>
        <p class="text-sm text-gray-500 text-center">
          Copyright © 2022 Fatikshop Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
