<script lang="ts">
    import {onMount} from "svelte";

    const users = [
        "xyzjesper",
        "nexocrew-HQ",
        "Crystopia",
        "DisBotDevelopment",
        "xyzspace-dev",
        "DevelopmentStorage"
    ];

    let repos: any[] = [];
    let languageStats: Record<string, number> = {};
    let loading = true;

    const langColors: Record<string, string> = {
        JavaScript: "#f1e05a",
        TypeScript: "#3178c6",
        Kotlin: "#a97bff",
        Python: "#3572A5",
        HTML: "#e34c26",
        CSS: "#563d7c",
        PHP: "#4F5D95",
        Go: "#00ADD8",
        Rust: "#dea584",
        Java: "#b07219",
        CSharp: "#178600",
        Shell: "#89e051",
        C: "#555555",
        CPlusPlus: "#f34b7d",
        Swift: "#ffac45",
        Dart: "#00B4AB",
        Ruby: "#701516",
        Scala: "#c22d40",
        Haskell: "#5e5086",
        Elixir: "#6e4a7e",
        Lua: "#000080",
        R: "#198CE7",
        Perl: "#0298c3",
        ObjectiveC: "#438eff",
        PowerShell: "#012456",
        Assembly: "#6E4C13",
        CoffeeScript: "#244776",
        FSharp: "#b845fc",
        Nim: "#f3d400",
        OCaml: "#3be133",
        Crystal: "#000100",
        V: "#5d87bf",
        Zig: "#ec915c",
        Nix: "#7e7eff",
        default: "#7289da"
    };

    $: if (!loading && repos.length > 0) {
        languageStats = {};
        for (const repo of repos) {
            if (repo.language) {
                languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
            }
        }
    }

    // Pagination
    let currentPage = 1;
    const itemsPerPage = 6;

    $: totalPages = Math.ceil(repos.length / itemsPerPage);
    $: paginatedRepos = repos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    function nextPage() {
        if (currentPage < totalPages) currentPage++;
    }

    function prevPage() {
        if (currentPage > 1) currentPage--;
    }

    function goToPage(page: number) {
        currentPage = page;
    }

    onMount(async () => {
        let allRepos: any[] = [];
        for (const user of users) {
            const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=100`);
            if (res.ok) {
                const data = await res.json();
                allRepos = allRepos.concat(data);
            }
        }

        repos = allRepos
            .filter(r => !r.fork)
            .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
            .reverse();

        loading = false;
    });
</script>

<!-- HTML -->
<div class="hero">
    <h1>Hey, I'm Jesper 👋</h1>
    <p>
        Passionate developer, open source enthusiast and always up for new challenges.<br>
        I love building cool things with modern tech and collaborating in creative teams.
    </p>
</div>

<div class="about">
    <strong>About me:</strong><br>
    I'm Jesper – fullstack developer with a focus on modern web technologies, backend architecture and
    community projects.<br>
    Whether Discord bots, panels, APIs, games or complex web apps: I focus on quality, clean code and teamwork.<br><br>
    <em>Currently active at <b>Crystopia</b> and <b>DisBot</b>. Always open to exciting projects!</em>
</div>

<section class="tech-area">
    <div class="tech-title">Mein Tech Stack</div>
    <div class="tech-grid">
        {#each Object.entries(languageStats).sort((a, b) => b[1] - a[1]) as [lang, count]}
            <div class="tech-card" style="--lang-color:{langColors[lang] || langColors.default}">
                <div class="tech-dot"/>
                <div class="tech-name">{lang}</div>
                <div class="tech-count">{count} Repo{count > 1 ? 's' : ''}</div>
            </div>
        {/each}
    </div>
</section>


<section class="projects-section">
    <div class="projects-title">Projekte & Open Source</div>
    {#if loading}
        <p style="text-align:center; color:#7289da;">Lade Projekte...</p>
    {:else if repos.length === 0}
        <p style="text-align:center; color:#b9bbbe;">Keine Projekte gefunden.</p>
    {:else}
        <div class="projects-grid">
            {#each paginatedRepos as repo}
                <div class="project-card">
                    <div class="project-header">
                        <img src={repo.owner.avatar_url} alt="Owner"/>
                        <a class="project-title" href={repo.html_url} target="_blank" rel="noopener">
                            {repo.name}
                        </a>
                    </div>
                    <div class="project-desc">{repo.description}</div>
                    <div class="project-meta">
                        {#if repo.language}
                            <span class="lang-badge"
                                  style="--lang-color:{langColors[repo.language] || langColors.default}">
                                <span class="lang-dot"
                                      style="background:{langColors[repo.language] || langColors.default}"></span>
                                {repo.language}
                            </span>
                        {/if}
                        <div class="petzchen">
                            <span title="Stars">
                                <svg viewBox="0 0 16 16"><path
                                        d="M8 12.027l4.472 2.951-1.18-5.08L15 6.545l-5.19-.447L8 1.5 6.19 6.098 1 6.545l3.708 3.353-1.18 5.08z"/></svg>
                                {repo.stargazers_count}
                            </span>
                            <span title="Forks">
                                <svg viewBox="0 0 16 16"><path
                                        d="M5 3.09V2a2 2 0 1 0-2 2h1.09A5.022 5.022 0 0 0 8 7.917 5.022 5.022 0 0 0 11.91 4H13a2 2 0 1 0-2-2v1.09A5.022 5.022 0 0 0 8 8.083 5.022 5.022 0 0 0 4.09 12H3a2 2 0 1 0 2 2v-1.09A5.022 5.022 0 0 0 8 8.083a5.022 5.022 0 0 0 3.91 3.917V14a2 2 0 1 0 2-2h-1.09A5.022 5.022 0 0 0 8 8.083z"/></svg>
                                {repo.forks_count}
                            </span>
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <!-- Pagination -->
        <div class="pagination">
            <button on:click={prevPage} disabled={currentPage === 1}>Zurück</button>
            {#each Array(totalPages) as _, i}
                <button class:active={i + 1 === currentPage} on:click={() => goToPage(i + 1)}>
                    {i + 1}
                </button>
            {/each}
            <button on:click={nextPage} disabled={currentPage === totalPages}>Weiter</button>
        </div>
    {/if}
</section>
<br/><br/><br/>

<style>
    :root {
        --primary: #7289da;
        --accent: #00d1b2;
        --bg: #1e1f23;
        --card-bg: #2b2d31;
        --border: #3a3d41;
        --text-main: #ffffff;
        --text-muted: #b9bbbe;
        --shadow: rgba(0, 0, 0, 0.4);
    }

    a {
        color: var(--primary);
        text-decoration: none;
        transition: color 0.2s ease;
    }

    a:hover {
        color: var(--accent);
    }

    .hero {
        max-width: 800px;
        margin: 80px auto 40px;
        padding: 0 20px;
        text-align: center;
    }

    .hero h1 {
        font-size: 3.5rem;
        font-weight: 800;
        margin-bottom: 20px;
    }

    .hero p {
        font-size: 1.3rem;
        color: var(--text-muted);
        max-width: 600px;
        margin: 0 auto;
    }

    .about {
        max-width: 800px;
        margin: 0 auto 80px;
        background: linear-gradient(145deg, #232427, #1b1c1f);
        padding: 24px;
        border-radius: 16px;
        border: 1px solid var(--border);
        box-shadow: 0 6px 14px var(--shadow);
        font-size: 1.05rem;
        color: #d3d3d3;
    }

    .about strong {
        color: var(--text-main);
    }

    .about em {
        margin-top: 16px;
        color: #a3a3a3;
        display: block;
    }

    .tech-area {
        max-width: 1000px;
        margin: 60px auto;
        padding: 0 20px;
    }

    .tech-title {
        font-size: 2.2rem;
        text-align: center;
        margin-bottom: 30px;
        font-weight: 700;
        color: var(--text-main);
    }

    .tech-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 20px;
    }

    .tech-card {
        background: var(--card-bg);
        border: 1px solid var(--border);
        border-left: 6px solid var(--primary);
        border-left-color: var(--lang-color);
        border-radius: 12px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
        box-shadow: 0 4px 12px var(--shadow);
        transition: transform 0.2s ease;
    }

    .tech-card:hover {
        transform: translateY(-4px);
    }

    .tech-dot {
        width: 12px;
        height: 12px;
        background: var(--lang-color);
        border-radius: 50%;
    }

    .tech-name {
        font-weight: 600;
        font-size: 1.1rem;
        color: var(--text-main);
    }

    .tech-count {
        font-size: 0.85rem;
        color: var(--text-muted);
    }


    .projects-title {
        font-size: 2.5rem;
        text-align: center;
        margin-bottom: 40px;
        font-weight: 700;
    }

    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 24px;
    }

    .project-card {
        background: var(--card-bg);
        border-radius: 16px;
        padding: 20px;
        margin-left: 10px;
        border: 1px solid var(--border);
        box-shadow: 0 4px 12px var(--shadow);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .project-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
    }

    .project-header {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .project-header img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid var(--primary);
    }

    .project-title {
        font-size: 1.1rem;
        font-weight: 600;
    }

    .project-desc {
        font-size: 0.95rem;
        color: var(--text-muted);
        min-height: 48px;
        flex-grow: 1;
    }

    .project-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.85rem;
    }

    .lang-badge {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 4px 10px;
        border-radius: 8px;
        background: #37393f;
    }

    .lang-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }

    .petzchen {
        display: flex;
        gap: 16px;
    }

    .petzchen span {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .petzchen svg {
        width: 14px;
        height: 14px;
        fill: var(--text-muted);
    }

    .pagination {
        display: flex;
        justify-content: center;
        gap: 12px;
        margin-top: 40px;
        flex-wrap: wrap;
    }

    .pagination button {
        background: linear-gradient(135deg, #40444b, #2f3136);
        border: none;
        color: white;
        padding: 8px 18px;
        font-size: 14px;
        border-radius: 12px;
        cursor: pointer;
        transition: background 0.2s ease, transform 0.2s ease;
    }

    .pagination button:hover:not(:disabled) {
        background: var(--primary);
        transform: scale(1.05);
    }

    .pagination button.active {
        background: var(--accent);
        font-weight: bold;
    }

    .pagination button:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }

    @media (max-width: 768px) {
        .hero h1 {
            font-size: 2.5rem;
        }

        .projects-title {
            font-size: 1.8rem;
        }

        .projects-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        }
    }
</style>
