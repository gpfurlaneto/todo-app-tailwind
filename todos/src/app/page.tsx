import Image from "next/image";
import { useEffect } from "react";
import axios from "axios";
import Todos from "@/components/Todos";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Todos />
    </main>
  );
}
