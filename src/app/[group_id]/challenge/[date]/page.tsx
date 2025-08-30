"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ChevronLeft, Users, MessageCircle, Heart, ThumbsUp, Star, Send, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

// Types
interface Member {
  id: string
  name: string
  avatar: string
  completed: boolean
  completedAt?: string
  thought?: string
  sentiment?: "positive" | "motivated" | "proud"
}

interface ChallengeDetail {
  date: string
  title: string
  description: string
  category: string
  difficulty: number
  members: Member[]
  totalMembers: number
  completionRate: number
  allThoughts: {
    id: string
    author: string
    avatar: string
    message: string
    sentiment: "positive" | "motivated" | "proud"
    timestamp: string
    votes: number
  }[]
}

// Données simulées
const mockChallengeDetail: ChallengeDetail = {
  date: "2024-01-15",
  title: "10 minutes de méditation",
  description:
    "Prenez 10 minutes pour méditer et vous recentrer. Utilisez une application comme Headspace ou simplement concentrez-vous sur votre respiration.",
  category: "Bien-être mental",
  difficulty: 2,
  totalMembers: 12,
  completionRate: 67,
  members: [
    {
      id: "1",
      name: "Marie Leblanc",
      avatar: "/portrait-femme-souriante-professionnelle.png",
      completed: true,
      completedAt: "08:30",
      thought: "Moment de paix incroyable ce matin ! La méditation m'aide vraiment à commencer la journée du bon pied.",
      sentiment: "positive",
    },
    {
      id: "2",
      name: "Thomas Keller",
      avatar: "/portrait-homme-souriant-d-contract-.png",
      completed: true,
      completedAt: "07:15",
      thought: "Difficile au début mais tellement ressourçant. Je sens déjà une différence dans ma gestion du stress.",
      sentiment: "motivated",
    },
    {
      id: "3",
      name: "Sophie Martin",
      avatar: "/portrait-femme-souriante--nergique.png",
      completed: true,
      completedAt: "12:45",
      thought: "Ma concentration s'améliore de jour en jour ! Merci à tous pour la motivation.",
      sentiment: "proud",
    },
    {
      id: "4",
      name: "Alex Rodriguez",
      avatar: "/portrait-homme-souriant-d-contract-.png",
      completed: true,
      completedAt: "19:20",
      thought: "Session du soir parfaite pour décompresser après le travail.",
      sentiment: "positive",
    },
    {
      id: "5",
      name: "Emma Dubois",
      avatar: "/portrait-femme-souriante--nergique.png",
      completed: true,
      completedAt: "06:00",
      thought: "Réveil en douceur avec 10 minutes de méditation. Journée productive garantie !",
      sentiment: "motivated",
    },
    {
      id: "6",
      name: "Lucas Petit",
      avatar: "/portrait-homme-souriant-d-contract-.png",
      completed: true,
      completedAt: "13:30",
      thought: "Pause méditation au bureau, mes collègues me regardent bizarrement mais je m'en fiche ! 😄",
      sentiment: "proud",
    },
    {
      id: "7",
      name: "Nina Silva",
      avatar: "/portrait-femme-souriante-professionnelle.png",
      completed: true,
      completedAt: "21:00",
      thought: "Méditation avant de dormir, sommeil de qualité assuré.",
      sentiment: "positive",
    },
    {
      id: "8",
      name: "Paul Moreau",
      avatar: "/portrait-homme-souriant-d-contract-.png",
      completed: true,
      completedAt: "11:15",
      thought: "J'ai utilisé l'app Headspace, session guidée parfaite pour débuter.",
      sentiment: "motivated",
    },
    { id: "9", name: "Léa Bernard", avatar: "/portrait-femme-souriante--nergique.png", completed: false },
    { id: "10", name: "Hugo Roux", avatar: "/portrait-homme-souriant-d-contract-.png", completed: false },
    { id: "11", name: "Camille Blanc", avatar: "/portrait-femme-souriante-professionnelle.png", completed: false },
    { id: "12", name: "Julien Noir", avatar: "/portrait-homme-souriant-d-contract-.png", completed: false },
  ],
  allThoughts: [
    {
      id: "1",
      author: "Marie Leblanc",
      avatar: "/portrait-femme-souriante-professionnelle.png",
      message:
        "Moment de paix incroyable ce matin ! La méditation m'aide vraiment à commencer la journée du bon pied. Je recommande la technique de respiration 4-7-8, très efficace pour se détendre rapidement.",
      sentiment: "positive",
      timestamp: "08:30",
      votes: 5,
    },
    {
      id: "2",
      author: "Thomas Keller",
      avatar: "/portrait-homme-souriant-d-contract-.png",
      message:
        "Difficile au début mais tellement ressourçant. Je sens déjà une différence dans ma gestion du stress au travail. Les premières minutes sont toujours les plus compliquées mais après ça va tout seul !",
      sentiment: "motivated",
      timestamp: "07:15",
      votes: 8,
    },
    {
      id: "3",
      author: "Sophie Martin",
      avatar: "/portrait-femme-souriante--nergique.png",
      message:
        "Ma concentration s'améliore de jour en jour ! Merci à tous pour la motivation. C'est fou comme 10 petites minutes peuvent changer toute une journée. Je me sens plus présente et moins dispersée.",
      sentiment: "proud",
      timestamp: "12:45",
      votes: 12,
    },
    {
      id: "4",
      author: "Alex Rodriguez",
      avatar: "/portrait-homme-souriant-d-contract-.png",
      message:
        "Session du soir parfaite pour décompresser après le travail. J'ai médité sur ma terrasse en écoutant les oiseaux, moment magique ! Qui d'autre médite dehors ?",
      sentiment: "positive",
      timestamp: "19:20",
      votes: 3,
    },
    {
      id: "5",
      author: "Emma Dubois",
      avatar: "/portrait-femme-souriante--nergique.png",
      message:
        "Réveil en douceur avec 10 minutes de méditation. Journée productive garantie ! Fini les réveils stressants, maintenant je prends le temps de me centrer avant de commencer.",
      sentiment: "motivated",
      timestamp: "06:00",
      votes: 7,
    },
  ],
}

const getSentimentIcon = (sentiment: string) => {
  switch (sentiment) {
    case "positive":
      return <Heart className="w-4 h-4 text-pink-500" />
    case "motivated":
      return <ThumbsUp className="w-4 h-4 text-blue-500" />
    case "proud":
      return <Star className="w-4 h-4 text-yellow-500" />
    default:
      return <MessageCircle className="w-4 h-4 text-gray-500" />
  }
}

const getSentimentLabel = (sentiment: string) => {
  switch (sentiment) {
    case "positive":
      return "Positif"
    case "motivated":
      return "Motivé"
    case "proud":
      return "Fier"
    default:
      return "Neutre"
  }
}

const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case "positive":
      return "bg-pink-100 text-pink-700 border-pink-200"
    case "motivated":
      return "bg-blue-100 text-blue-700 border-blue-200"
    case "proud":
      return "bg-yellow-100 text-yellow-700 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

export default function ChallengeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedSentiment, setSelectedSentiment] = useState<string>("")
  const [newThought, setNewThought] = useState("")
  const [votedThoughts, setVotedThoughts] = useState<Set<string>>(new Set())

  const groupId = params.group_id as string
  const date = params.date as string

  const completedMembers = mockChallengeDetail.members.filter((m) => m.completed)
  const pendingMembers = mockChallengeDetail.members.filter((m) => !m.completed)

  const handleVote = (thoughtId: string) => {
    if (!votedThoughts.has(thoughtId)) {
      setVotedThoughts((prev) => new Set([...prev, thoughtId]))
      // Ici on ferait l'appel API pour voter
    }
  }

  const handleSubmitThought = () => {
    if (newThought.trim() && selectedSentiment) {
      // Ici on ferait l'appel API pour ajouter la pensée
      setNewThought("")
      setSelectedSentiment("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push(`/${groupId}/calendar`)}
            className="text-orange-600 hover:text-orange-700 mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Retour au calendrier
          </Button>
        </div>

        {/* Détails du défi */}
        <Card className="mb-6 bg-white/90 backdrop-blur-sm border-orange-200">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl font-playfair text-gray-800 mb-2">{mockChallengeDetail.title}</CardTitle>
                <p className="text-gray-600 mb-4">{mockChallengeDetail.description}</p>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                    {mockChallengeDetail.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < mockChallengeDetail.difficulty ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">Difficulté</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-orange-600 mb-1">{mockChallengeDetail.completionRate}%</div>
                <div className="text-sm text-gray-600">
                  {completedMembers.length}/{mockChallengeDetail.totalMembers} membres
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={mockChallengeDetail.completionRate} className="h-2" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Participants */}
          <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-600" />
                Participants
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Membres ayant complété */}
              <div>
                <h4 className="font-medium text-green-700 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Défi relevé ({completedMembers.length})
                </h4>
                <div className="space-y-2">
                  {completedMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-3 p-2 rounded-lg bg-green-50 border border-green-200"
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-800">{member.name}</div>
                        {member.completedAt && (
                          <div className="text-xs text-gray-600">Complété à {member.completedAt}</div>
                        )}
                      </div>
                      {member.sentiment && getSentimentIcon(member.sentiment)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Membres en attente */}
              {pendingMembers.length > 0 && (
                <div>
                  <h4 className="font-medium text-orange-700 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    En attente ({pendingMembers.length})
                  </h4>
                  <div className="space-y-2">
                    {pendingMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center gap-3 p-2 rounded-lg bg-orange-50 border border-orange-200"
                      >
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="font-medium text-sm text-gray-800">{member.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Ajouter une pensée */}
          <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-orange-600" />
                Partager votre expérience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Comment s'est passé votre défi aujourd'hui ? Partagez vos pensées, difficultés ou réussites..."
                value={newThought}
                onChange={(e) => setNewThought(e.target.value)}
                className="min-h-[100px]"
              />

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Comment vous sentez-vous ?</label>
                <div className="flex gap-2">
                  {[
                    { value: "positive", label: "Positif", icon: Heart, color: "pink" },
                    { value: "motivated", label: "Motivé", icon: ThumbsUp, color: "blue" },
                    { value: "proud", label: "Fier", icon: Star, color: "yellow" },
                  ].map((sentiment) => {
                    const Icon = sentiment.icon
                    const isSelected = selectedSentiment === sentiment.value
                    return (
                      <button
                        key={sentiment.value}
                        onClick={() => setSelectedSentiment(sentiment.value)}
                        className={`
                          flex items-center gap-2 px-3 py-2 rounded-lg border transition-all
                          ${
                            isSelected
                              ? getSentimentColor(sentiment.value)
                              : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                          }
                        `}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{sentiment.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <Button
                onClick={handleSubmitThought}
                disabled={!newThought.trim() || !selectedSentiment}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                <Send className="w-4 h-4 mr-2" />
                Partager ma pensée
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Toutes les pensées */}
        <Card className="mt-6 bg-white/90 backdrop-blur-sm border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-orange-600" />
              Toutes les pensées ({mockChallengeDetail.allThoughts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockChallengeDetail.allThoughts.map((thought) => (
                <div
                  key={thought.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={thought.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {thought.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-gray-800">{thought.author}</span>
                        <Badge variant="outline" className={getSentimentColor(thought.sentiment)}>
                          {getSentimentIcon(thought.sentiment)}
                          <span className="ml-1">{getSentimentLabel(thought.sentiment)}</span>
                        </Badge>
                        <span className="text-xs text-gray-500">{thought.timestamp}</span>
                      </div>
                      <p className="text-gray-700 mb-3">{thought.message}</p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVote(thought.id)}
                          disabled={votedThoughts.has(thought.id)}
                          className={`
                            text-xs h-8 px-3
                            ${
                              votedThoughts.has(thought.id)
                                ? "text-orange-600 bg-orange-50"
                                : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                            }
                          `}
                        >
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {thought.votes + (votedThoughts.has(thought.id) ? 1 : 0)}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}