import { SidebarProvider, Sidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { Target } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">HabitZone</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer font-semibold">
                  Tableau de bord
                </span>
              </Link>
              <Link href="/settings">
                <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Paramètres
                </span>
              </Link>
              <Link href="/login">
                <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Déconnexion
                </span>
              </Link>
            </div>
          </div>
        </header>
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-8 bg-background/80">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
