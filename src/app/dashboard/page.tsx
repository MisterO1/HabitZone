"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import {
  Users,
  Target,
  Trophy,
  CalendarIcon,
  CheckCircle,
  Heart,
  MessageCircle,
  TrendingUp,
  Flame,
  Star,
  Plus,
  Settings,
} from "lucide-react"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// Mock data
const userGroups = [
  {
    id: 1,
    name: "Équipe Marketing",
    members: 8,
    activeChallenge: "30 minutes de sport",
    completedToday: 6,
    streak: 12,
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Amis Lecture",
    members: 5,
    activeChallenge: "Lire 30 pages",
    completedToday: 3,
    streak: 8,
    color: "bg-green-500",
  },
  {
    id: 3,
    name: "Famille Santé",
    members: 4,
    activeChallenge: "10 minutes méditation",
    completedToday: 4,
    streak: 15,
    color: "bg-purple-500",
  },
]

const motivationalMessages = [
  {
    id: 1,
    author: "Marie L.",
    group: "Équipe Marketing",
    message: "Excellente séance de sport ce matin ! Qui me rejoint demain ? 💪",
    time: "Il y a 2h",
    likes: 5,
  },
  {
    id: 2,
    author: "Thomas R.",
    group: "Amis Lecture",
    message: "Je viens de finir 'Atomic Habits' - livre incroyable sur les habitudes ! Recommandé 📚",
    time: "Il y a 4h",
    likes: 8,
  },
  {
    id: 3,
    author: "Sophie M.",
    group: "Famille Santé",
    message: "15 jours de méditation consécutifs ! Je me sens tellement plus zen 🧘‍♀️",
    time: "Il y a 6h",
    likes: 12,
  },
]

const todayChallenges = [
  { group: "Équipe Marketing", challenge: "30 minutes de sport", completed: true },
  { group: "Amis Lecture", challenge: "Lire 30 pages", completed: false },
  { group: "Famille Santé", challenge: "10 minutes méditation", completed: true },
]

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <Sidebar>
          <SidebarHeader className="border-b border-border">
            <div className="flex items-center space-x-2 px-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-lg font-bold text-foreground">HabitZone</h1>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
                  <Trophy className="w-4 h-4" />
                  <span>Tableau de bord</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Users className="w-4 h-4" />
                  <span>Mes groupes</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <CalendarIcon className="w-4 h-4" />
                  <span>Calendrier</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <TrendingUp className="w-4 h-4" />
                  <span>Statistiques</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings className="w-4 h-4" />
                  <span>Paramètres</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Bonjour ! Prêt pour vos défis du jour ? 🚀</h1>
            </div>
            <Button>
              <Plus className="w-4 h-4" />
              Nouveau groupe
            </Button>
          </header>

          <div className="flex-1 space-y-6 p-6">
            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Groupes actifs</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">+1 ce mois</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Série actuelle</CardTitle>
                  <Flame className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15</div>
                  <p className="text-xs text-muted-foreground">jours consécutifs</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Défis complétés</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2/3</div>
                  <p className="text-xs text-muted-foreground">aujourd'hui</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Points totaux</CardTitle>
                  <Star className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">+45 aujourd'hui</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard Content */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="calendar">Calendrier</TabsTrigger>
                <TabsTrigger value="groups">Mes groupes</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Today's Challenges */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" />
                        Défis du jour
                      </CardTitle>
                      <CardDescription>Vos objectifs quotidiens</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {todayChallenges.map((challenge, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-3 h-3 rounded-full ${challenge.completed ? "bg-green-500" : "bg-gray-300"}`}
                            />
                            <div>
                              <p className="font-medium">{challenge.challenge}</p>
                              <p className="text-sm text-muted-foreground">{challenge.group}</p>
                            </div>
                          </div>
                          {challenge.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <Button size="sm" variant="outline">
                              Marquer fait
                            </Button>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Group Progress */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        Progrès des groupes
                      </CardTitle>
                      <CardDescription>Performance collective aujourd'hui</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {userGroups.map((group) => (
                        <div key={group.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${group.color}`} />
                              <span className="font-medium">{group.name}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {group.completedToday}/{group.members}
                            </span>
                          </div>
                          <Progress value={(group.completedToday / group.members) * 100} className="h-2" />
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{group.activeChallenge}</span>
                            <span className="flex items-center gap-1">
                              <Flame className="w-3 h-3 text-orange-500" />
                              {group.streak} jours
                            </span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Motivational Messages */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      Messages de motivation
                    </CardTitle>
                    <CardDescription>Encouragements de vos groupes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {motivationalMessages.map((message) => (
                      <div key={message.id} className="p-4 rounded-lg border bg-muted/30">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium">{message.author}</p>
                            <p className="text-xs text-muted-foreground">
                              {message.group} • {message.time}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            <Heart className="w-3 h-3 mr-1" />
                            {message.likes}
                          </Badge>
                        </div>
                        <p className="text-sm">{message.message}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="calendar" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Calendrier des habitudes</CardTitle>
                      <CardDescription>Visualisez vos progrès mensuels</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border"
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Activité du jour sélectionné</CardTitle>
                      <CardDescription>
                        {selectedDate?.toLocaleDateString("fr-FR", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                          <div>
                            <p className="font-medium">30 minutes de sport</p>
                            <p className="text-sm text-muted-foreground">Équipe Marketing</p>
                          </div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                          <div>
                            <p className="font-medium">10 minutes méditation</p>
                            <p className="text-sm text-muted-foreground">Famille Santé</p>
                          </div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-gray-300" />
                          <div>
                            <p className="font-medium">Lire 30 pages</p>
                            <p className="text-sm text-muted-foreground">Amis Lecture</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Marquer fait
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="groups" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {userGroups.map((group) => (
                    <Card key={group.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full ${group.color}`} />
                            {group.name}
                          </CardTitle>
                          <Badge variant="outline">{group.members} membres</Badge>
                        </div>
                        <CardDescription>{group.activeChallenge}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Participation aujourd'hui</span>
                            <span>
                              {group.completedToday}/{group.members}
                            </span>
                          </div>
                          <Progress value={(group.completedToday / group.members) * 100} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm">
                            <Flame className="w-4 h-4 text-orange-500" />
                            <span>{group.streak} jours de série</span>
                          </div>
                          <Button size="sm" variant="outline">
                            Voir détails
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Add New Group Card */}
                  <Card className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer">
                    <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
                      <Plus className="w-8 h-8 text-muted-foreground mb-2" />
                      <h3 className="font-medium mb-1">Créer un nouveau groupe</h3>
                      <p className="text-sm text-muted-foreground">
                        Invitez vos amis à relever de nouveaux défis ensemble
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}