"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home(){
  const router = useRouter();

  const handleNavigation = () => {
    router.push('/review');
  };

  return (
    <div >
      <main >
     <p className="text-xl text-red-500 m-4">this is the home page!!</p>   
        <button onClick={handleNavigation} className="border-2 border-black bg-green-600 p-2 m-4 ">Go to Review Page</button>
      </main>
    </div>
  );
};
