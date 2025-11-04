import Head from "next/head";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

const AppWithoutSSR = dynamic(() => import("@/App"), { ssr: false });

const team = [
    {
        name: "Augustin Verissimo",
        role: "Co-développeur Epigusto",
        github: "https://github.com/GusEpitech",
        linkedin: "https://www.linkedin.com/in/augustin-verissimo-a48b95231/",
    },
    {
        name: "Tom Pilate",
        role: "Co-développeur Epigusto",
        github: "https://github.com/TPilate",
        linkedin: "https://www.linkedin.com/in/tom-pilate-2b49091b7/",
    },
    {
        name: "Brahim Boulahia",
        role: "Co-développeur Epigusto",
        github: "https://github.com/SnowDiles",
        linkedin: "https://www.linkedin.com/in/brahim-boulahia/",
    },
];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://epigusto.vercel.app";
const seoTitle = "Epigusto – Crédits du runner hackathon";
const seoDescription =
    "Découvrez l'équipe Epigusto, un runner 2D conçu en 48 heures lors du hackathon Epitech avec Augustin Verissimo, Tom Pilate et Brahim Boulahia.";

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Epigusto",
    url: siteUrl,
    inLanguage: "fr-FR",
    description: seoDescription,
    author: team.map((member) => ({
        "@type": "Person",
        name: member.name,
        jobTitle: member.role,
        sameAs: [member.github, member.linkedin],
    })),
    applicationCategory: "Game",
    gamePlatform: "Web",
    operatingSystem: "Web Browser",
};

export default function Home() {
    const [isCreditsOpen, setCreditsOpen] = useState(false);

    return (
        <>
            <Head>
                <title>{seoTitle}</title>
                <meta name="description" content={seoDescription} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content="Epigusto, jeu 2D, hackathon Epitech, Augustin Verissimo, Tom Pilate, Brahim Boulahia, runner rétro" />
                <meta name="author" content="Augustin Verissimo, Tom Pilate, Brahim Boulahia" />
                <meta property="og:title" content={seoTitle} />
                <meta property="og:description" content={seoDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={siteUrl} />
                <meta property="og:locale" content="fr_FR" />
                <meta property="og:site_name" content="Epigusto" />
                <meta property="og:image" content={`${siteUrl}/icon.png`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={seoTitle} />
                <meta name="twitter:description" content={seoDescription} />
                <meta name="twitter:image" content={`${siteUrl}/icon.png`} />
                <link rel="canonical" href={siteUrl} />
                <link rel="icon" href="/icon.png" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            </Head>
            <main className={`${styles.main} ${inter.className}`}>
                <div className={styles.gameSection}>
                    <div className={styles.gameWrapper}>
                        <AppWithoutSSR />
                    </div>
                    <button className={styles.creditsButton} onClick={() => setCreditsOpen(true)}>
                        Crédits du projet
                    </button>
                </div>

                <section className={styles.teamSection} id="credits">
                    <h1 className={styles.teamTitle}>Équipe Epigusto</h1>
                    <div className={styles.teamGrid}>
                        {team.map((member) => (
                            <article key={member.name} className={styles.teamCard}>
                                <h2>{member.name}</h2>
                                <p>{member.role}</p>
                                <div className={styles.teamLinks}>
                                    <a href={member.github} target="_blank" rel="noreferrer">GitHub</a>
                                    <a href={member.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </main>

            {isCreditsOpen && (
                <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="credits-title">
                    <div className={styles.modalCard}>
                        <div className={styles.modalHeader}>
                            <h2 id="credits-title">Crédits & making-of</h2>
                            <button
                                className={styles.closeButton}
                                type="button"
                                onClick={() => setCreditsOpen(false)}
                                aria-label="Fermer la fenêtre des crédits"
                            >
                                ×
                            </button>
                        </div>
                        <div className={styles.modalContent}>
                            <p>
                                Epigusto a été forgé pendant le hackathon Epitech 2024 en 48 heures. Le moteur Phaser, les sprites, la bande son et le leaderboard ont été assemblés dans l'urgence pour capturer l'énergie de l'évènement.
                            </p>
                            <ul>
                                {team.map((member) => (
                                    <li key={member.name}>
                                        <strong>{member.name}</strong> — {member.role}
                                        {" "}
                                        <a href={member.github} target="_blank" rel="noreferrer">GitHub</a>
                                        {" · "}
                                        <a href={member.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                                    </li>
                                ))}
                            </ul>
                            <p>
                                Merci d'essayer Epigusto&nbsp;! Partagez vos scores et vos trouvailles pour soutenir les projets nés en plein rush.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
