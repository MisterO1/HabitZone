import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Target, Trophy, ArrowRight, CheckCircle, Star } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">HabitZone</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Fonctionnalités
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              Comment ça marche
            </a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              Témoignages
            </a>
          </nav>
          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Se connecter
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Commencer</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
            🚀 Nouveau : Défis de groupe en temps réel
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-balance mb-6 font-[family-name:var(--font-playfair)]">
            Développez vos <span className="text-primary">habitudes</span> ensemble
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 leading-relaxed">
            Rejoignez vos amis, collègues ou communautés pour vous motiver mutuellement à travers des défis quotidiens
            visibles sur un calendrier partagé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-6">
                Créer mon premier groupe
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            {/* <Button variant="outline" size="lg">
              Voir la démo
            </Button> */}
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative">
            <img
              src="/groupe-d-amis-motiv-s-regardant-un-calendrier-part.png"
              alt="Groupe d'amis utilisant HabitZone ensemble"
              className="rounded-2xl shadow-2xl mx-auto"
            />
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold animate-bounce">
              +127% de réussite en groupe !
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
              Pourquoi choisir HabitZone ?
            </h2>
            <p className="text-xl text-muted-foreground text-balance">
              Des fonctionnalités pensées pour maximiser votre motivation collective
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Calendrier partagé</CardTitle>
                <CardDescription>
                  Visualisez les progrès de tout votre groupe sur un calendrier interactif en temps réel
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Défis de groupe</CardTitle>
                <CardDescription>
                  Créez et participez à des défis quotidiens avec vos amis, collègues ou communautés
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Motivation collective</CardTitle>
                <CardDescription>Encouragez-vous mutuellement et célébrez vos victoires ensemble</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-[family-name:var(--font-playfair)]">Comment ça marche ?</h2>
            <p className="text-xl text-muted-foreground">Trois étapes simples pour transformer vos habitudes</p>
          </div>

          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-4">
                    1
                  </div>
                  <h3 className="text-2xl font-semibold">Créez votre groupe</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Invitez vos amis, collègues ou membres de votre communauté à rejoindre votre groupe HabitZone. Plus
                  vous êtes nombreux, plus la motivation est forte !
                </p>
              </div>
              <div className="flex-1">
                <img src="/interface-de-cr-ation-de-groupe-avec-avatars-d-ami.png" alt="Création de groupe" className="rounded-lg shadow-lg" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-4">
                    2
                  </div>
                  <h3 className="text-2xl font-semibold">Définissez vos défis</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Choisissez ensemble les habitudes que vous voulez développer : sport, lecture, méditation,
                  alimentation saine... Les possibilités sont infinies !
                </p>
              </div>
              <div className="flex-1">
                <img src="/calendrier-color--avec-diff-rents-d-fis-d-habitude.png" alt="Définition des défis" className="rounded-lg shadow-lg" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-4">
                    3
                  </div>
                  <h3 className="text-2xl font-semibold">Progressez ensemble</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Suivez vos progrès et ceux de votre groupe sur le calendrier partagé. Encouragez-vous, célébrez vos
                  victoires et restez motivés ensemble !
                </p>
              </div>
              <div className="flex-1">
                <img src="/groupe-de-personnes-c-l-brant-leurs-succ-s-avec-de.png" alt="Progression collective" className="rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
              Ils ont transformé leurs habitudes
            </h2>
            <p className="text-xl text-muted-foreground">
              Découvrez comment HabitZone a aidé des milliers de personnes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center mb-4">
                  <img src="/portrait-femme-souriante-professionnelle.png" alt="Marie" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold">Marie L.</h4>
                    <p className="text-sm text-muted-foreground">Équipe marketing</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  "Grâce à HabitZone, notre équipe fait du sport ensemble tous les matins. La motivation collective est
                  incroyable !"
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center mb-4">
                  <img src="/portrait-homme-souriant-d-contract-.png" alt="Thomas" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold">Thomas R.</h4>
                    <p className="text-sm text-muted-foreground">Étudiant</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  "Mes amis et moi avons réussi à lire 24 livres cette année grâce aux défis lecture. C'est magique !"
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center mb-4">
                  <img src="/portrait-femme-souriante--nergique.png" alt="Sophie" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold">Sophie M.</h4>
                    <p className="text-sm text-muted-foreground">Maman de 2 enfants</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  "Entre mamans, on se motive pour prendre soin de nous. 10 minutes de méditation par jour, ça change
                  tout !"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6 font-[family-name:var(--font-playfair)]">
            Prêt à transformer vos habitudes ?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            Rejoignez des milliers de personnes qui ont déjà changé leur vie grâce à HabitZone
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/register">
              <Button size="lg">
                Commencer gratuitement
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            {/* <Link href="/demo">
              <Button size="lg">
                Planifier une démo
              </Button>
            </Link> */}
          </div>
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-primary mr-2" />
              Gratuit pendant 30 jours
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-primary mr-2" />
              Aucune carte requise
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-primary mr-2" />
              Support 24/7
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold">HabitZone</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                La plateforme qui transforme vos habitudes grâce à la motivation collective.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Produit</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Fonctionnalités
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Tarifs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Intégrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Centre d'aide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Communauté
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    À propos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Carrières
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 HabitZone. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}