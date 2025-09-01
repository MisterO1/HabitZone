"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Calendar, ChevronLeft, ChevronRight, Users, MessageCircle, Heart, ThumbsUp, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Types pour les données
interface ChallengeDay {
  date: string
  challengeTitle: string
  completedCount: number
  totalMembers: number
  completionRate: number
  topThoughts: {
    id: string
    author: string
    avatar: string
    message: string
    sentiment: "positive" | "motivated" | "proud"
  }[]
  status: "completed" | "in-progress" | "upcoming"
}

interface GroupData {
  id: string
  name: string
  memberCount: number
  currentStreak: number
}

// Données simulées
const mockGroupData: GroupData = {
  id: "fitness-warriors",
  name: "Fitness Warriors",
  memberCount: 12,
  currentStreak: 7,
}

const mockChallengeData: ChallengeDay[] = [
  {
    date: "2024-01-15",
    challengeTitle: "10 minutes de méditation",
    completedCount: 8,
    totalMembers: 12,
    completionRate: 67,
    topThoughts: [
      {
        id: "1",
        author: "Marie L.",
        avatar: "/portrait-femme-souriante-professionnelle.png",
        message: "Moment de paix incroyable ce matin ! 🧘‍♀️",
        sentiment: "positive",
      },
      {
        id: "2",
        author: "Thomas K.",
        avatar: "/portrait-homme-souriant-d-contract-.png",
        message: "Difficile au début mais tellement ressourçant",
        sentiment: "motivated",
      },
      {
        id: "3",
        author: "Sophie M.",
        avatar: "/portrait-femme-souriante--nergique.png",
        message: "Ma concentration s'améliore de jour en jour !",
        sentiment: "proud",
      },
    ],
    status: "completed",
  },
  {
    date: "2024-01-16",
    challengeTitle: "5000 pas minimum",
    completedCount: 10,
    totalMembers: 12,
    completionRate: 83,
    topThoughts: [
      {
        id: "4",
        author: "Alex R.",
        avatar: "/portrait-homme-souriant-d-contract-.png",
        message: "Balade en forêt magnifique aujourd'hui 🌲",
        sentiment: "positive",
      },
      {
        id: "5",
        author: "Emma D.",
        avatar: "/portrait-femme-souriante--nergique.png",
        message: "Mes jambes me remercient déjà !",
        sentiment: "proud",
      },
      {
        id: "6",
        author: "Lucas P.",
        avatar: "/portrait-homme-souriant-d-contract-.png",
        message: "Objectif dépassé : 7500 pas ! 💪",
        sentiment: "motivated",
      },
    ],
    status: "completed",
  },
  {
    date: "2024-01-17",
    challengeTitle: "Boire 2L d'eau",
    completedCount: 6,
    totalMembers: 12,
    completionRate: 50,
    topThoughts: [
      {
        id: "7",
        author: "Nina S.",
        avatar: "/portrait-femme-souriante-professionnelle.png",
        message: "Plus difficile que prévu mais j'y arrive !",
        sentiment: "motivated",
      },
      {
        id: "8",
        author: "Paul M.",
        avatar: "/portrait-homme-souriant-d-contract-.png",
        message: "Ma peau commence déjà à être plus belle ✨",
        sentiment: "positive",
      },
      {
        id: "9",
        author: "Léa B.",
        avatar: "/portrait-femme-souriante--nergique.png",
        message: "Astuce : une bouteille marquée par heure !",
        sentiment: "proud",
      },
    ],
    status: "in-progress",
  },
]

const getSentimentIcon = (sentiment: string) => {
  switch (sentiment) {
    case "positive":
      return <Heart className="w-3 h-3 text-pink-500" />
    case "motivated":
      return <ThumbsUp className="w-3 h-3 text-blue-500" />
    case "proud":
      return <Star className="w-3 h-3 text-yellow-500" />
    default:
      return <MessageCircle className="w-3 h-3 text-gray-500" />
  }
}

const getCompletionColor = (rate: number) => {
  if (rate >= 80) return "bg-green-500"
  if (rate >= 60) return "bg-orange-500"
  if (rate >= 40) return "bg-yellow-500"
  return "bg-red-500"
}

export default function GroupCalendarPage() {
  const params = useParams()
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [hoveredDay, setHoveredDay] = useState<string | null>(null)
  const [animatingDays, setAnimatingDays] = useState<Set<string>>(new Set())

  const groupId = params.group_id as string

  // Animation au chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      mockChallengeData.forEach((day, index) => {
        setTimeout(() => {
          setAnimatingDays((prev) => new Set([...prev, day.date]))
        }, index * 100)
      })
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const handleDayClick = (challengeDay: ChallengeDay) => {
    router.push(`/${groupId}/challenge/${challengeDay.date}`)
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Jours vides au début
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    console.log("days:", days)
    return days
  }

  const getChallengeForDate = (day: number) => {
    const dateStr = `2024-01-${day.toString().padStart(2, "0")}`
    return mockChallengeData.find((challenge) => challenge.date === dateStr)
  }

  const days = getDaysInMonth(currentDate)
  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/dashboard")}
              className="text-orange-600 hover:text-orange-700"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Retour au dashboard
            </Button>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-playfair text-gray-800">{mockGroupData.name}</CardTitle>
                  <p className="text-gray-600 mt-1">Calendrier des défis • {mockGroupData.memberCount} membres</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{mockGroupData.currentStreak}</div>
                    <div className="text-sm text-gray-600">jours de suite</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round(
                        mockChallengeData.reduce((acc, day) => acc + day.completionRate, 0) / mockChallengeData.length,
                      )}
                      %
                    </div>
                    <div className="text-sm text-gray-600">taux moyen</div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Calendrier */}
        <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-xl font-playfair">
                <Calendar className="w-5 h-5 text-orange-600" />
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Jours de la semaine */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Grille du calendrier */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => {
                if (!day) {
                  return <div key={index} className="aspect-square" />
                }

                const challenge = getChallengeForDate(day)
                const dateStr = `2024-01-${day.toString().padStart(2, "0")}`
                const isAnimating = animatingDays.has(dateStr)
                const isHovered = hoveredDay === dateStr

                return (
                  <div
                    key={day + Date.now()}
                    className={`
                      aspect-square relative cursor-pointer rounded-lg border-2 transition-all duration-300
                      ${challenge ? "border-orange-200 hover:border-orange-400" : "border-gray-200"}
                      ${isAnimating ? "animate-pulse" : ""}
                      ${isHovered ? "scale-105 shadow-lg" : ""}
                    `}
                    onMouseEnter={() => challenge && setHoveredDay(dateStr)}
                    onMouseLeave={() => setHoveredDay(null)}
                    onClick={() => challenge && handleDayClick(challenge)}
                  >
                    {/* Numéro du jour */}
                    <div className="absolute top-1 left-1 text-sm font-medium text-gray-700">{day}</div>

                    {challenge && (
                      <>
                        {/* Indicateur de completion */}
                        <div className="absolute top-1 right-1">
                          <div className={`w-3 h-3 rounded-full ${getCompletionColor(challenge.completionRate)}`} />
                        </div>

                        {/* Contenu principal */}
                        <div className="p-2 pt-6 h-full flex flex-col justify-between">
                          <div className="text-xs text-gray-600 line-clamp-2">{challenge.challengeTitle}</div>

                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1 text-gray-600">
                              <Users className="w-3 h-3" />
                              {challenge.completedCount}/{challenge.totalMembers}
                            </div>
                            <Badge variant="secondary" className="text-xs px-1 py-0">
                              {challenge.completionRate}%
                            </Badge>
                          </div>
                        </div>

                        {/* Tooltip au survol */}
                        {isHovered && (
                          <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 animate-in fade-in-0 zoom-in-95">
                            <div className="text-sm font-medium text-gray-800 mb-2">{challenge.challengeTitle}</div>
                            <div className="text-xs text-gray-600 mb-3">
                              {challenge.completedCount} sur {challenge.totalMembers} membres ont relevé le défi
                            </div>

                            <div className="space-y-2">
                              <div className="text-xs font-medium text-gray-700">Messages populaires :</div>
                              {challenge.topThoughts.map((thought) => (
                                <div key={thought.id} className="flex items-start gap-2">
                                  <Avatar className="w-6 h-6">
                                    <AvatarImage src={thought.avatar || "/placeholder.svg"} />
                                    <AvatarFallback className="text-xs">
                                      {thought.author
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1">
                                      <span className="text-xs font-medium text-gray-700">{thought.author}</span>
                                      {getSentimentIcon(thought.sentiment)}
                                    </div>
                                    <div className="text-xs text-gray-600 line-clamp-2">{thought.message}</div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="mt-3 pt-2 border-t border-gray-100">
                              <div className="text-xs text-orange-600 font-medium">
                                Cliquez pour voir tous les détails →
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Légende */}
        <Card className="mt-6 bg-white/80 backdrop-blur-sm border-orange-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span>Excellent (80%+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span>Bon (60-79%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span>Moyen (40-59%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span>À améliorer (&lt;40%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}