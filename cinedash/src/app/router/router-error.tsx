import { Button } from "@/components/ui/button";

interface RouterErrorProps {
  error: unknown;
  reset: () => void;
}

export function RouterError({ error, reset }: RouterErrorProps) {
  const errorMessage =
    error instanceof Error ? error.message : "Erro desconhecido";

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-bold">Algo deu errado</h1>

        <p className="text-sm text-muted-foreground">
          Não foi possível carregar esta página.
        </p>

        {import.meta.env.DEV && (
          <pre className="overflow-auto rounded-lg bg-muted p-4 text-left text-xs">
            {errorMessage}
          </pre>
        )}

        <Button onClick={reset}>Tentar novamente</Button>
      </div>
    </div>
  );
}
