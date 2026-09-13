import { LoginForm } from "@/features/auth/ui/login-form";

export function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">CineDash</h1>
          <p className="text-muted-foreground">
            Entre para acessar o dashboard de curadoria.
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
