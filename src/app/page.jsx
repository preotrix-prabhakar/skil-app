"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home(){
  const router = useRouter();

  const handleNavigation = () => {
    router.push('/review');
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        this is the home page!!
        <button onClick={handleNavigation}>Go to Review Page</button>
      </main>
    </div>
  );
};
