'use client';

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, Users, Trophy, CheckCircle, Star } from "lucide-react";
import clsx from "clsx";

// Mock data
const mockGroups = [
	{
		id: 1,
		name: "Sport du matin",
		members: ["Marie", "Thomas", "Sophie"],
		color: "bg-primary/10",
		icon: <Users className="w-6 h-6 text-primary" />,
	},
	{
		id: 2,
		name: "Lecture 2025",
		members: ["Thomas", "Sophie"],
		color: "bg-accent/10",
		icon: <Trophy className="w-6 h-6 text-accent" />,
	},
];

const mockChallenges = [
	{
		id: 1,
		groupId: 1,
		title: "Faire 20 min de sport",
		date: "2025-08-30",
		votes: 2,
		total: 3,
	},
	{
		id: 2,
		groupId: 2,
		title: "Lire 10 pages",
		date: "2025-08-30",
		votes: 1,
		total: 2,
	},
];

const mockMessages = [
	{
		user: "Marie",
		text: "On ne lâche rien, chaque jour compte ! 💪",
	},
	{
		user: "Thomas",
		text: "Bravo à tous pour la régularité, on progresse ensemble ! 🚀",
	},
	{
		user: "Sophie",
		text: "Un petit pas chaque jour, c’est la clé ! 🌱",
	},
];

function AnimatedCalendar({
	challenges,
}: {
	challenges: typeof mockChallenges;
}) {
	// Simple animated calendar mockup
	return (
		<div className="relative bg-card rounded-xl p-6 shadow-lg overflow-hidden">
			<div className="absolute inset-0 animate-pulse bg-gradient-to-br from-primary/10 via-accent/10 to-transparent pointer-events-none" />
			<div className="relative z-10">
				<div className="flex items-center mb-4">
					<Calendar className="w-6 h-6 text-primary mr-2" />
					<h3 className="text-lg font-bold">Calendrier du jour</h3>
				</div>
				<div className="grid grid-cols-2 gap-4">
					{challenges.map((c) => (
						<Card
							key={c.id}
							className="border-2 border-primary/20 hover:border-primary transition-colors"
						>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<CheckCircle
										className={clsx(
											"w-5 h-5",
											c.votes === c.total
												? "text-primary"
												: "text-muted-foreground"
										)}
									/>
									{c.title}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex items-center gap-2 text-sm">
									<span className="font-semibold">
										{c.votes}/{c.total}
									</span>
									<span className="text-muted-foreground">
										ont rempli le défi
									</span>
								</div>
								<div className="mt-2 text-xs text-muted-foreground">
									Groupe :{" "}
									{
										mockGroups.find((g) => g.id === c.groupId)
											?.name
									}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}

export default function DashboardPage() {
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsAuth(true);
		} else {
			window.location.href = "/login";
		}
	}, []);

	if (!isAuth) {
		return <p>Chargement...</p>;
	}

	return (
		<div className="space-y-10">
			{/* Welcome */}
			<div className="mb-6">
				<h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-playfair)]">
					Bienvenue sur votre espace, prêt à relever vos défis ?
				</h1>
				<p className="text-muted-foreground text-lg">
					Retrouvez vos groupes, vos défis quotidiens et la motivation
					collective !
				</p>
			</div>

			{/* Groups */}
			<section>
				<h2 className="text-xl font-semibold mb-4">Mes groupes</h2>
				<div className="flex gap-6 flex-wrap">
					{mockGroups.map((group) => (
						<Card
							key={group.id}
							className="w-64 border-2 hover:border-primary/50 transition-colors"
						>
							<CardHeader>
								<div
									className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${group.color}`}
								>
									{group.icon}
								</div>
								<CardTitle>{group.name}</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex -space-x-2 mb-2">
									{group.members.map((m, i) => (
										<span
											key={i}
											className="inline-block w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold border-2 border-background"
										>
											{m[0]}
										</span>
									))}
								</div>
								<div className="text-xs text-muted-foreground">
									{group.members.length} membres
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			{/* Animated Calendar & Challenges */}
			<section>
				<AnimatedCalendar challenges={mockChallenges} />
			</section>

			{/* Motivation Messages */}
			<section>
				<h2 className="text-xl font-semibold mb-4">
					Messages de motivation
				</h2>
				<div className="grid md:grid-cols-3 gap-6">
					{mockMessages.map((msg, i) => (
						<Card
							key={i}
							className="border-2 border-accent/20 hover:border-accent transition-colors animate-fade-in"
						>
							<CardHeader>
								<div className="flex items-center gap-2 mb-2">
									<Star className="w-5 h-5 text-accent" />
									<span className="font-semibold">{msg.user}</span>
								</div>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground italic">
									"{msg.text}"
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</section>
		</div>
	);
}
