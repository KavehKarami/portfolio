import Head from "next/head";
import { AnimatedCursor } from "@/components/AnimatedCursor";
import Matrix from "@/components/Matrix";

export default function Home() {
  return (
    <main>
      <Head>
        <title>Kaveh Karami CV</title>
      </Head>
      <Matrix />
      <AnimatedCursor />
    </main>
  );
}
