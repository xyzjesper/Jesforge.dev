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
    let loading = true;

    const langColors: any = {
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
        default: "#7289da"
    };

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
    I'm Jesper - fullstack developer with a focus on modern web technologies, backend architecture and
    community projects.<br>
    Whether discord bots, panels, APIs, Games or complex web apps: I focus on quality, clean code and teamwork.<br><br>
    <em>Currently active at <b>Crystopia</b> and <b>DisBot</b>. Always open to exciting projects!</em>
</div>

<section class="projects-section">
    <div class="projects-title">Projekte & Open Source</div>
    {#if loading}
        <p style="text-align:center; color:#7289da;">Lade Projekte...</p>
    {:else}
        {#if repos.length === 0}
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

            <!-- Pagination Controls -->
            <div class="pagination">
                <button on:click={prevPage} disabled={currentPage === 1}>Zurück</button>

                {#each Array(totalPages) as _, i}
                    <button
                            class:active={i + 1 === currentPage}
                            on:click={() => goToPage(i + 1)}>
                        {i + 1}
                    </button>
                {/each}

                <button on:click={nextPage} disabled={currentPage === totalPages}>Weiter</button>
            </div>
        {/if}
    {/if}
</section>

