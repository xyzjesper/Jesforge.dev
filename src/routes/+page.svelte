<script lang="ts">
    import {techStack} from "$lib/techStack.js";
    import {onMount} from "svelte";

    export let data;

    let techStackData = techStack
    let repos: any[] = [];
    let organizations: any[] = [];
    let languageStats: Record<string, number> = {};
    let loading = true;

    const langColors: Record<string, string> = {
        JavaScript: "#F0DB4F",
        TypeScript: "#3178c6",
        Kotlin: "#a97bff",
        Python: "#3572A5",
        HTML: "#e34c26",
        CSS: "#563d7c",
        PHP: "#4F5D95",
        Go: "#00ADD8",
        Rust: "#dea584",
        Svelte: "#ff9800",
        Java: "#f89820",
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
        Laravel: "#F05340",
        Nim: "#f3d400",
        OCaml: "#3be133",
        Crystal: "#000100",
        V: "#5d87bf",
        Zig: "#ec915c",
        Nix: "#7e7eff",
        Jetbrains: "#FE2C6E",
        Bun: "#e2bd8c",
        Git: "",
        Linux: "#ffcc33",
        default: "#7289da",
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

        allRepos = data.allRepos

        repos = allRepos
            .filter(r => !r.fork)
            .filter(r => !r.name.startsWith(".github"))
            .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
            .reverse();

        const seen = new Set();
        organizations = data.orgResult


        loading = false;
    });
</script>

<div class="hero">
    <div class="hero-content">
        <h1>Hey, I'm Jesper <span class="wave">👋</span></h1>
        <p class="subtitle">
            Passionate developer, open source enthusiast and always up for new challenges.
        </p>
        <div class="gradient-bar"></div>
    </div>
</div>

<div class="glass-card about">
    I'm Jesper – fullstack developer with a focus on modern web technologies, backend architecture and
    community projects. Whether Discord bots, panels, APIs, games, CLI's or complex web apps: I focus on quality,
</div>

<section class="section">
    <div class="section-header">
        <h2>Teams I'm in</h2>
        <p class="section-subtitle">Teams I'm working for</p>
    </div>

    <div>
        {#if organizations.length === 0}
            <p>No Organisation found.</p>
        {:else}
            <div class="org-grid">
                {#each organizations as org}
                    <a href={`https://github.com/${org.login}`} target="_blank">
                        <div class="flex justify-center items-center flex-wrap gap-4">
                            <div class="org-card w-100 h-40 rounded-xl flex flex-col items-center justify-center text-center p-4">
                                <img src={org.avatar_url} alt="" class="org-avatar w-20 h-20 rounded-full mb-4"/>
                                <div class="org-name text-lg font-semibold text-white">{org.login}</div>
                            </div>
                        </div>
                    </a>
                {/each}
            </div>
        {/if}
    </div>

</section>


<section class="section">
    <div class="section-header">
        <h2>Tech Stack</h2>
        <p class="section-subtitle">Languages & Technologies I work with</p>
    </div>

    <div class="tech-grid">
        {#each techStackData as techStackData}
            <a href={techStackData.link}>
                <div class="tech-card hover:text-black"
                     style="--lang-color:{techStackData.color}">
                    <div class="tech-icon">
                        <img src={techStackData.iconUrl} alt={techStackData.name} width="100" height="100"/>
                    </div>
                    <div class="tech-info">
                        <h3>{techStackData.name}</h3>
                    </div>
                </div>
            </a>
        {/each}
    </div>
</section>

<section class="section">
    <div class="section-header">
        <h2>Projects & Open Source</h2>
        <p class="section-subtitle">My recent contributions and creations</p>
    </div>

    {#if loading}
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Loading projects...</p>
        </div>
    {:else if repos.length === 0}
        <div class="empty-state">
            <p>No projects found</p>
        </div>
    {:else}
        <div class="projects-grid">
            {#each paginatedRepos as repo}
                <a href={repo.html_url} target="_blank" rel="noopener" class="project-card">
                    <div class="project-header">
                        <img src={repo.owner?.avatar_url ?? ""} alt="Owner" class="project-avatar"/>
                        <div>
                            <h3 class="project-title">{repo.name}</h3>
                            <div class="project-meta">
                                {#if repo.language}
                                    <span class="lang-badge">
                                        <span class="lang-dot"
                                              style="background:{langColors[repo.language] || langColors.default}"></span>
                                        {repo.language}
                                    </span>
                                {/if}
                            </div>
                        </div>
                    </div>
                    <p class="project-desc">{repo.description || 'No description provided'}</p>
                    <div class="project-stats">
                        <div class="stat">
                            <svg viewBox="0 0 16 16">
                                <path d="M8 12.027l4.472 2.951-1.18-5.08L15 6.545l-5.19-.447L8 1.5 6.19 6.098 1 6.545l3.708 3.353-1.18 5.08z"/>
                            </svg>
                            <span>{repo.stargazers_count}</span>
                        </div>
                        <div class="stat">
                            <svg viewBox="0 0 16 16">
                                <path d="M5 3.09V2a2 2 0 1 0-2 2h1.09A5.022 5.022 0 0 0 8 7.917 5.022 5.022 0 0 0 11.91 4H13a2 2 0 1 0-2-2v1.09A5.022 5.022 0 0 0 8 8.083 5.022 5.022 0 0 0 4.09 12H3a2 2 0 1 0 2 2v-1.09A5.022 5.022 0 0 0 8 8.083a5.022 5.022 0 0 0 3.91 3.917V14a2 2 0 1 0 2-2h-1.09A5.022 5.022 0 0 0 8 8.083z"/>
                            </svg>
                            <span>{repo.forks_count}</span>
                        </div>
                        <div class="project-updated">Updated {new Date(repo.pushed_at).toLocaleDateString()}</div>
                    </div>
                </a>
            {/each}
        </div>

        <div class="pagination">
            <button on:click={prevPage} disabled={currentPage === 1} class="pagination-button" aria-label="true">
                <svg viewBox="0 0 24 24">
                    <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
                </svg>
            </button>
            {#each Array(totalPages) as _, i}
                <button class:active={i + 1 === currentPage} on:click={() => goToPage(i + 1)} class="pagination-button">
                    {i + 1}
                </button>
            {/each}
            <button on:click={nextPage} disabled={currentPage === totalPages} class="pagination-button"
                    aria-label="true">
                <svg viewBox="0 0 24 24">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
            </button>
        </div>
    {/if}
</section>

<style>

    @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    }

    .hero {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 6rem 1rem 4rem;
        position: relative;
        overflow: hidden;
    }

    .hero-content {
        max-width: 800px;
        position: relative;
        z-index: 2;
    }

    .hero::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        z-index: 1;
    }

    h1 {
        font-size: 3.5rem;
        font-weight: 800;
        margin-bottom: 1rem;
        background: var(--gradient);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        line-height: 1.2;
    }

    h2 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: var(--text-main);
    }

    h3 {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-main);
    }

    .wave {
        color: var(--text-muted);
        display: inline-block;
        animation: wave 2s infinite;
        transform-origin: 70% 70%;
    }

    @keyframes wave {
        0% {
            transform: rotate(0deg);
        }
        10% {
            transform: rotate(-10deg);
        }
        20% {
            transform: rotate(12deg);
        }
        30% {
            transform: rotate(-10deg);
        }
        40% {
            transform: rotate(9deg);
        }
        50% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }

    .subtitle {
        font-size: 1.25rem;
        color: var(--text-muted);
        max-width: 600px;
        margin: 0 auto 2rem;
    }

    .gradient-bar {
        width: 120px;
        height: 4px;
        background: var(--gradient);
        border-radius: 2px;
        margin: 2rem auto;
    }

    .glass-card {
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-radius: 16px;
        padding: 2rem;
        max-width: 800px;
        margin: 0 auto 4rem;
        box-shadow: var(--shadow);
    }

    .about {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .org-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 1rem;
        margin-top: 2rem;
    }

    .org-card {
        background: var(--bg-light);
        border: 1px solid var(--border);
        color: #fff;
        text-decoration: none;
        border-radius: 12px;
        padding: 1rem;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s ease;
    }

    .org-card:hover {
        transform: translateY(-4px);
    }

    .org-avatar {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 0.5rem;
    }

    .org-name {
        font-weight: bold;
        font-size: 1rem;
        word-break: break-word;
    }

    .section {
        max-width: 1200px;
        margin: 0 auto 6rem;
        padding: 0 1.5rem;
    }

    .section-header {
        text-align: center;
        margin-bottom: 3rem;
    }

    .section-subtitle {
        color: var(--text-muted);
        font-size: 1.1rem;
    }

    .tech-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 5fr));
        gap: 0.5rem;
    }

    .tech-card {
        background: var(--bg-light);
        border-radius: 12px;
        padding: 1.5rem;
        width: 150px;
        height: 200px;
        transition: all 0.3s ease;
        border: 1px solid var(--border);
    }

    .tech-card:hover {
        transform: translateY(-5px);
        border-color: rgba(99, 102, 241, 0.3);
        background: var(--lang-color);
        box-shadow: 0 0 10px var(--lang-color);
    }

    .tech-info h3 {
        margin-bottom: 0.25rem;
        text-align: center;
    }

    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
    }

    .project-card {
        background: var(--bg-light);
        border-radius: 16px;
        padding: 1.75rem;
        transition: all 0.3s ease;
        border: 1px solid var(--border);
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        text-decoration: none;
    }

    .project-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        border-color: rgba(99, 102, 241, 0.3);
    }

    .project-header {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .project-avatar {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        object-fit: cover;
    }

    .project-meta {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
    }

    .lang-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.25rem 0.75rem;
        border-radius: 999px;
        background: rgba(30, 41, 59, 0.8);
        border: 1px solid var(--border);
        font-size: 0.8rem;
        color: var(--text-muted);
    }

    .lang-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }

    .project-desc {
        color: var(--text-muted);
        font-size: 0.95rem;
        flex-grow: 1;
    }

    .project-stats {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        font-size: 0.9rem;
        color: var(--text-muted);
    }

    .stat {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .stat svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
    }

    .project-updated {
        margin-left: auto;
        font-size: 0.8rem;
        opacity: 0.8;
    }

    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.75rem;
        margin-top: 3rem;
    }

    .pagination-button {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: var(--bg-light);
        border: 1px solid var(--border);
        color: var(--text-muted);
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .pagination-button:hover:not(:disabled) {
        background: var(--primary);
        color: white;
        border-color: var(--primary);
        transform: scale(1.1);
    }

    .pagination-button.active {
        background: var(--primary);
        color: white;
        border-color: var(--primary);
        font-weight: 600;
    }

    .pagination-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .pagination-button svg {
        width: 20px;
        height: 20px;
    }

    .loading-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        padding: 4rem 0;
        color: var(--text-muted);
    }

    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(99, 102, 241, 0.2);
        border-top-color: var(--primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .empty-state {
        text-align: center;
        padding: 4rem 0;
        color: var(--text-muted);
    }

    @media (max-width: 768px) {
        h1 {
            font-size: 2.5rem;
        }

        h2 {
            font-size: 2rem;
        }

        .subtitle {
            font-size: 1.1rem;
        }

        .tech-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        }

        .projects-grid {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 480px) {
        h1 {
            font-size: 2rem;
        }

        .hero {
            padding: 4rem 1rem 3rem;
        }

        .tech-grid {
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 1rem;
        }
    }
</style>
