import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <nav className="flex max-w-7xl mx-auto py-5 justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Presento</h1>
        </div>
        <div className="flex gap-4">
          <Link href={`/login`}>
            <Button>Log-In</Button>
          </Link>
          <Link href={`/sign-up`}>
            <Button>Sign-Up</Button></Link>
        </div>
      </nav>
    </>
  );
}
