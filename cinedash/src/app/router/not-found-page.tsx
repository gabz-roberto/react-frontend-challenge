import { Link } from "@tanstack/react-router";

import { buttonVariants } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="space-y-4 text-center">
        <p className="text-sm text-muted-foreground">Erro 404</p>

        <h1 className="text-3xl font-bold">Página não encontrada</h1>

        <p className="text-muted-foreground">
          A página que você tentou acessar não existe.
        </p>

        <Link to="/discover" className={buttonVariants()}>
          Voltar para Discover
        </Link>
      </div>
    </div>
  );
}
