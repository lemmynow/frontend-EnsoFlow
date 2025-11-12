"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/hooks/useUser";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: user, isLoading, isError } = useUser();

  useEffect(() => {
    if (!isLoading && (isError || !user)) {
      router.push("/login");
    }
  }, [user, isLoading, isError, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
