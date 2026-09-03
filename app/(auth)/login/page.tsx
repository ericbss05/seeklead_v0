import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 size-80 rounded-full" />
        <div className="absolute -bottom-40 -left-40 size-80 rounded-full" />
      </div>
      <main className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="flex size-10 items-center justify-center rounded-xl">
              <Image src="/logo.svg" alt="logo" width={32} height={32} />
            </div>
            <span className="text-xl font-bold tracking-tight">Seeklead</span>
          </Link>
        </div>
        <LoginForm />
      </main>
    </div>
  );
}