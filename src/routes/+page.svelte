<script lang="ts">
  import { techStack } from "$lib/techStack.js";
  import { onMount } from "svelte";

  export let data;

  let techStackData = techStack;
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
  $: paginatedRepos = repos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

    allRepos = data.allRepos;

    repos = allRepos
      .filter((r) => !r.fork)
      .filter((r) => !r.name.startsWith(".github"))
      .sort(
        (a, b) =>
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
      )
      .reverse();

    const seen = new Set();
    organizations = data.orgResult;

    loading = false;
  });
</script>

<div class="hero modern-hero">
  <div class="hero-content">
    <h1>Hey, I'm Jesper <span class="wave">👋</span></h1>
    <p class="subtitle">
      Passionate developer, open source enthusiast and always up for new
      challenges.
    </p>
    <div class="cta-buttons">
      <a href="#projects" class="cta-primary">View My Work</a>
      <a
        href="https://github.com/xyzjesper"
        target="_blank"
        class="cta-secondary"
      >
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path
            fill="currentColor"
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
          />
        </svg>
        GitHub
      </a>
      <a
        href="https://discord.com/users/850470027026759690"
        target="_blank"
        class="cta-secondary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="20"
          height="20"
          viewBox="0 -28.5 256 256"
          version="1.1"
          preserveAspectRatio="xMidYMid"
        >
          <g>
            <path
              d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
              fill="#5865F2"
              fill-rule="nonzero"
            >
            </path>
          </g>
        </svg>
        Discord
      </a>
      <a
        href="https://modrinth.com/user/xyzjesper"
        target="_blank"
        class="cta-secondary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 512 514"
          class="modrinth-icon text-brand"
          data-v-e2ec24a7=""
          ><path
            fill="currentColor"
            fill-rule="evenodd"
            d="M503.16 323.56c11.39-42.09 12.16-87.65.04-132.8C466.57 54.23 326.04-26.8 189.33 9.78 83.81 38.02 11.39 128.07.69 230.47h43.3c10.3-83.14 69.75-155.74 155.76-178.76 106.3-28.45 215.38 28.96 253.42 129.67l-42.14 11.27c-19.39-46.85-58.46-81.2-104.73-95.83l-7.74 43.84c36.53 13.47 66.16 43.84 77 84.25 15.8 58.89-13.62 119.23-67 144.26l11.53 42.99c70.16-28.95 112.31-101.86 102.34-177.02l41.98-11.23a210.2 210.2 0 0 1-3.86 84.16z"
            clip-rule="evenodd"
          ></path><path
            fill="currentColor"
            d="M321.99 504.22C185.27 540.8 44.75 459.77 8.11 323.24A257.6 257.6 0 0 1 0 275.46h43.27c1.09 11.91 3.2 23.89 6.41 35.83 3.36 12.51 7.77 24.46 13.11 35.78l38.59-23.15c-3.25-7.5-5.99-15.32-8.17-23.45-24.04-89.6 29.2-181.7 118.92-205.71 17-4.55 34.1-6.32 50.8-5.61L255.19 133c-10.46.05-21.08 1.42-31.66 4.25-66.22 17.73-105.52 85.7-87.78 151.84 1.1 4.07 2.38 8.04 3.84 11.9l49.35-29.61-14.87-39.43 46.6-47.87 58.9-12.69 17.05 20.99-27.15 27.5-23.68 7.45-16.92 17.39 8.29 23.07s16.79 17.84 16.82 17.85l23.72-6.31 16.88-18.54 36.86-11.67 10.98 24.7-38.03 46.63-63.73 20.18-28.58-31.82-49.82 29.89c25.54 29.08 63.94 45.23 103.75 41.86l11.53 42.99c-59.41 7.86-117.44-16.73-153.49-61.91l-38.41 23.04c50.61 66.49 138.2 99.43 223.97 76.48 61.74-16.52 109.79-58.6 135.81-111.78l42.64 15.5c-30.89 66.28-89.84 118.94-166.07 139.34"
          ></path></svg
        >
        Modrinth
      </a>
      <a href="mailto:hey@xyzjesper.dev" target="_blank" class="cta-secondary">
        <svg
          fill=""
          viewBox="0 0 24 24"
          id="gmail"
          width="20"
          height="20"
          data-name="Flat Color"
          xmlns="http://www.w3.org/2000/svg"
          class="icon flat-color"
          stroke=""
          ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g><g id="SVGRepo_iconCarrier"
            ><path
              id="primary"
              d="M22,7.43V19a1,1,0,0,1-1,1H17a1,1,0,0,1-1-1V10.86a1,1,0,0,1,.35-.76l4-3.43a1,1,0,0,1,1.07-.15A1,1,0,0,1,22,7.43ZM3.65,6.67a1,1,0,0,0-1.07-.15A1,1,0,0,0,2,7.43V19a1,1,0,0,0,1,1H7a1,1,0,0,0,1-1V10.86a1,1,0,0,0-.35-.76Z"
              style="fill: #ffffff;"
            ></path><path
              id="secondary"
              d="M20,4.32a3.38,3.38,0,0,0-3.66.51L12,8.56,7.65,4.83A3.42,3.42,0,0,0,2,7.43a1,1,0,0,0,.35.76l9,7.71a1,1,0,0,0,1.3,0l9-7.71A1,1,0,0,0,22,7.43,3.37,3.37,0,0,0,20,4.32Z"
              style="fill: #ffffff;"
            ></path></g
          ></svg
        >
        hey@xyzjesper.dev
      </a>
      <a href="/blog" target="_blank" class="cta-secondary">
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="20"
          height="20"
          viewBox="0 0 32.00 32.00"
          enable-background="new 0 0 32 32"
          xml:space="preserve"
          fill="#ffffff"
          stroke="#ffffff"
          stroke-width="1.7600000000000002"
          ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g><g id="SVGRepo_iconCarrier">
            <g>
              <path
                fill="#ffffff"
                d="M30.5,0h-29C0.673,0,0,0.673,0,1.5v8C0,10.327,0.673,11,1.5,11h29c0.827,0,1.5-0.673,1.5-1.5v-8 C32,0.673,31.327,0,30.5,0z M31,9.5c0,0.275-0.225,0.5-0.5,0.5h-29C1.225,10,1,9.775,1,9.5v-8C1,1.225,1.225,1,1.5,1h29 C30.775,1,31,1.225,31,1.5V9.5z"
              ></path>
              <path
                fill="#ffffff"
                d="M31.5,12.5c-0.276,0-0.5,0.224-0.5,0.5v17.5c0,0.275-0.225,0.5-0.5,0.5h-29C1.225,31,1,30.775,1,30.5V13 c0-0.276-0.224-0.5-0.5-0.5S0,12.724,0,13v17.5C0,31.327,0.673,32,1.5,32h29c0.827,0,1.5-0.673,1.5-1.5V13 C32,12.724,31.776,12.5,31.5,12.5z"
              ></path>
              <path
                fill="#ffffff"
                d="M13.5,27c0.827,0,1.5-0.673,1.5-1.5v-8c0-0.827-0.673-1.5-1.5-1.5h-8C4.673,16,4,16.673,4,17.5v8 C4,26.327,4.673,27,5.5,27H13.5z M5,25.5v-8C5,17.225,5.225,17,5.5,17h8c0.275,0,0.5,0.225,0.5,0.5v8c0,0.275-0.225,0.5-0.5,0.5h-8 C5.225,26,5,25.775,5,25.5z"
              ></path>
              <path
                fill="#ffffff"
                d="M18,18h9c0.276,0,0.5-0.224,0.5-0.5S27.276,17,27,17h-9c-0.276,0-0.5,0.224-0.5,0.5S17.724,18,18,18z"
              ></path>
              <path
                fill="#ffffff"
                d="M18,22h9c0.276,0,0.5-0.224,0.5-0.5S27.276,21,27,21h-9c-0.276,0-0.5,0.224-0.5,0.5S17.724,22,18,22z"
              ></path>
              <path
                fill="#ffffff"
                d="M18,26h9c0.276,0,0.5-0.224,0.5-0.5S27.276,25,27,25h-9c-0.276,0-0.5,0.224-0.5,0.5S17.724,26,18,26z"
              ></path>
            </g>
          </g></svg
        >
        Blog
      </a>
      <a
        href="https://www.youtube.com/@xyzjesper"
        target="_blank"
        class="cta-secondary"
      >
        <svg
          height="20"
          width="20"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 461.001 461.001"
          xml:space="preserve"
          fill="#000000"
          ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g><g id="SVGRepo_iconCarrier">
            <g>
              <path
                style="fill:#F61C0D;"
                d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728 c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137 C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607 c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"
              ></path>
            </g>
          </g></svg
        >
        Youtube
      </a>
      <a
        href="https://twitch.tv/jesforge"
        target="_blank"
        class="cta-secondary"
      >
        <img
          src="https://www.vectorlogo.zone/logos/twitch/twitch-icon.svg"
          alt="Twitch Logo"
          width="20"
          height="20"
        />
        Twitch
      </a>
      <a href="https://xyzjesper.link" target="_blank" class="cta-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-ellipsis-icon lucide-ellipsis"
          ><circle cx="12" cy="12" r="1" /><circle
            cx="19"
            cy="12"
            r="1"
          /><circle cx="5" cy="12" r="1" /></svg
        >
        More
      </a>
    </div>
  </div>
  <div class="hero-scroll-indicator">
    <span></span>
  </div>
</div>

<div class="glass-card about modern-card">
  <div class="about-content">
    <h3>About Me</h3>
    <p>
      I'm Jesper – fullstack developer with a focus on modern web technologies,
      backend architecture and community projects. Whether Discord bots, panels,
      APIs, games, CLI's or complex web apps: I focus on quality, performance
      and user experience.
    </p>
    <div class="about-stats">
      <div class="stat-item">
        <span class="stat-number">3+</span>
        <span class="stat-label">Years Experience</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">84+</span>
        <span class="stat-label"> Repository Projects </span>
      </div>
      <div class="stat-item">
        <span class="stat-number">∞</span>
        <span class="stat-label">Passion</span>
      </div>
    </div>
  </div>
</div>

<section class="section modern-section" id="organizations">
  <div class="section-header">
    <div class="section-title-group">
      <svg viewBox="0 0 24 24" width="28" height="28">
        <path
          fill="var(--accent)"
          d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"
        />
      </svg>
      <h2>Teams I'm in</h2>
    </div>
    <p class="section-subtitle">Collaborative projects and organizations</p>
  </div>

  <div>
    {#if organizations.length === 0}
      <div class="empty-state">
        <svg viewBox="0 0 24 24" width="48" height="48">
          <path
            fill="var(--text-muted)"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
          />
        </svg>
        <p>No organizations found</p>
      </div>
    {:else}
      <div class="org-grid">
        {#each organizations as org}
          <a
            href={`https://github.com/${org.login}`}
            target="_blank"
            class="org-link"
          >
            <div class="org-card modern-org-card">
              <div class="org-avatar-container">
                <img
                  src={org.avatar_url}
                  alt=""
                  class="org-avatar"
                  loading="lazy"
                />
                <div class="org-hover-effect"></div>
              </div>
              <div class="org-name">{org.login}</div>
              <div class="org-view-btn">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    fill="currentColor"
                    d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                  />
                </svg>
              </div>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</section>

<section class="section modern-section">
  <div class="section-header">
    <div class="section-title-group">
      <svg viewBox="0 0 24 24" width="28" height="28">
        <path
          fill="var(--accent)"
          d="M3 3h18v18H3V3zm16 16V5H5v14h14zM8 7h2v8H8zm6 0h2v5h-2z"
        />
      </svg>
      <h2>Tech Stack</h2>
    </div>
    <p class="section-subtitle">Languages & Technologies I work with</p>
  </div>
  <div class="tech-grid modern-tech-grid">
    {#each techStackData as techStackData}
      <a
        href={techStackData.link}
        class="modern-tech-link"
        aria-label={techStackData.name}
      >
        <div
          class="tech-card modern-tech-card"
          style="--lang-color:{techStackData.color}"
        >
          <div class="tech-icon">
            <img
              src={techStackData.iconUrl}
              alt=""
              width="40"
              height="40"
              loading="lazy"
            />
          </div>
          <div class="tech-info">
            <h3>{techStackData.name}</h3>
          </div>
          <div class="tech-hover-bg"></div>
        </div>
      </a>
    {/each}
  </div>
</section>

<section class="section modern-section" id="projects">
  <div class="section-header">
    <div class="section-title-group">
      <svg viewBox="0 0 24 24" width="28" height="28">
        <path
          fill="var(--accent)"
          d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"
        />
      </svg>
      <h2>Projects & Open Source</h2>
    </div>
    <p class="section-subtitle">My recent contributions and creations</p>
  </div>

  {#if loading}
    <div class="loading-state">
      <div class="loading-spinner">
        {#each Array(12) as _, i}
          <div class="spinner-blade" style={`--i:${i}`}></div>
        {/each}
      </div>
      <p>Loading projects...</p>
    </div>
  {:else if repos.length === 0}
    <div class="empty-state">
      <svg viewBox="0 0 24 24" width="48" height="48">
        <path
          fill="var(--text-muted)"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
        />
      </svg>
      <p>No projects found</p>
    </div>
  {:else}
    <div class="projects-grid modern-projects-grid">
      {#each paginatedRepos as repo}
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener"
          class="project-card modern-project-card"
        >
          <div class="project-header">
            <div class="project-avatar-container">
              <img
                src={repo.owner?.avatar_url ?? ""}
                alt="Owner"
                class="project-avatar"
                loading="lazy"
              />
              {#if repo.language}
                <span
                  class="project-lang-badge"
                  style="background:{langColors[repo.language] ||
                    langColors.default}"
                ></span>
              {/if}
            </div>
            <div class="project-title-group">
              <h3 class="project-title">{repo.name}</h3>
              <div class="project-meta">
                <span class="project-visibility">
                  {repo.private ? "Private" : "Public"}
                </span>
              </div>
            </div>
          </div>
          <p class="project-desc">
            {repo.description || "No description provided"}
          </p>
          <div class="project-footer">
            <div class="project-topics">
              {#if repo.topics && repo.topics.length > 0}
                {#each repo.topics.slice(0, 3) as topic}
                  <span class="project-topic">{topic}</span>
                {/each}
              {/if}
            </div>
            <div class="project-stats">
              <div class="stat">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    fill="currentColor"
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  />
                </svg>
                <span>{repo.stargazers_count}</span>
              </div>
              <div class="stat">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    fill="currentColor"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-5-9h10v2H7z"
                  />
                </svg>
                <span>{repo.forks_count}</span>
              </div>
              <div class="project-updated">
                Updated {new Date(repo.pushed_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        </a>
      {/each}
    </div>

    <div class="pagination modern-pagination">
      <button
        on:click={prevPage}
        disabled={currentPage === 1}
        class="pagination-button prev"
        aria-label="Previous page"
      >
        <svg viewBox="0 0 24 24">
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
        </svg>
      </button>
      <div class="pagination-pages">
        {#each Array(totalPages) as _, i}
          <button
            class:active={i + 1 === currentPage}
            on:click={() => goToPage(i + 1)}
            class="pagination-button"
            aria-label={`Page ${i + 1}`}
          >
            {i + 1}
          </button>
        {/each}
      </div>
      <button
        on:click={nextPage}
        disabled={currentPage === totalPages}
        class="pagination-button next"
        aria-label="Next page"
      >
        <svg viewBox="0 0 24 24">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
        </svg>
      </button>
    </div>
  {/if}
</section>

<style>
  :root {
    --bg: #0f0f11;
    --bg-secondary: #1a1a1d;
    --text-main: #f9f9f9;
    --text-muted: #9a9a9a;
    --border: rgba(255, 255, 255, 0.08);
    --border-hover: rgba(255, 255, 255, 0.15);
    --accent: #6366f1;
    --accent-hover: #8183f3;
    --gradient: linear-gradient(135deg, #6366f1, #ec4899);
    --glass: rgba(30, 30, 33, 0.5);
    --radius: 12px;
    --radius-lg: 16px;
    --shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    --shadow-hover: 0 12px 40px rgba(0, 0, 0, 0.4);
    --transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family:
      "Inter",
      -apple-system,
      BlinkMacSystemFont,
      sans-serif;
    background: var(--bg);
    color: var(--text-main);
    line-height: 1.6;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    scroll-behavior: smooth;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* Hero */
  .hero {
    min-height: 100vh;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: radial-gradient(circle at top, #1a1a1a, #0f0f11);
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      rgba(99, 102, 241, 0.1) 0%,
      transparent 70%
    );
    animation: rotate 20s linear infinite;
    z-index: 1;
  }

  .hero-content {
    max-width: 900px;
    position: relative;
    z-index: 2;
    padding: 5rem 0;
  }

  h1 {
    font-size: clamp(2.5rem, 8vw, 4.5rem);
    font-weight: 800;
    background: var(--gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin: 0 0 1.5rem;
    line-height: 1.2;
  }

  .subtitle {
    font-size: clamp(1rem, 4vw, 1.25rem);
    color: var(--text-muted);
    max-width: 650px;
    margin: 0 auto 2.5rem;
    opacity: 0.9;
  }

  .wave {
    animation: wave 2s infinite;
    transform-origin: 70% 70%;
    display: inline-block;
  }

  @keyframes wave {
    0%,
    60%,
    100% {
      transform: rotate(0deg);
    }
    10% {
      transform: rotate(-10deg);
    }
    20% {
      transform: rotate(12deg);
    }
    30% {
      transform: rotate(-8deg);
    }
    40% {
      transform: rotate(6deg);
    }
    50% {
      transform: rotate(0deg);
    }
  }

  .cta-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 2rem;
  }

  .cta-primary,
  .cta-secondary {
    padding: 0.75rem 1.75rem;
    border-radius: var(--radius);
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: var(--transition);
  }

  .cta-primary {
    background: var(--gradient);
    color: white;
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
  }

  .cta-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
  }

  .cta-secondary {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    color: var(--text-main);
  }

  .cta-secondary:hover {
    border-color: var(--border-hover);
    transform: translateY(-2px);
  }

  .hero-scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
  }

  .hero-scroll-indicator span {
    display: block;
    width: 24px;
    height: 24px;
    border-bottom: 2px solid var(--text-muted);
    border-right: 2px solid var(--text-muted);
    transform: rotate(45deg);
    margin: -10px;
    animation: scroll 2s infinite;
    opacity: 0.7;
  }

  .hero-scroll-indicator span:nth-child(2) {
    animation-delay: -0.2s;
  }

  .hero-scroll-indicator span:nth-child(3) {
    animation-delay: -0.4s;
  }

  @keyframes scroll {
    0% {
      opacity: 0;
      transform: rotate(45deg) translate(-10px, -10px);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: rotate(45deg) translate(10px, 10px);
    }
  }

  /* Glass Card */
  .glass-card {
    background: var(--glass);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    padding: 2.5rem;
    margin: 3rem auto;
    max-width: 800px;
    box-shadow: var(--shadow);
    color: var(--text-main);
    transition: var(--transition);
  }

  .glass-card:hover {
    box-shadow: var(--shadow-hover);
  }

  .about-content h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--text-main);
    position: relative;
    display: inline-block;
  }

  .about-content h3::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 50px;
    height: 3px;
    background: var(--gradient);
    border-radius: 3px;
  }

  .about-content p {
    margin-bottom: 2rem;
    color: var(--text-muted);
    line-height: 1.7;
  }

  .about-stats {
    display: flex;
    gap: 2rem;
    margin-top: 2rem;
  }

  .stat-item {
    text-align: center;
  }

  .stat-number {
    font-size: 1.75rem;
    font-weight: 700;
    background: var(--gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: block;
    line-height: 1;
  }

  .stat-label {
    font-size: 0.875rem;
    color: var(--text-muted);
    margin-top: 0.5rem;
    display: block;
  }

  /* Sections */
  .section {
    padding: 6rem 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-header {
    margin-bottom: 3rem;
    text-align: center;
  }

  .section-title-group {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }

  .section-header h2 {
    font-size: clamp(1.75rem, 5vw, 2.5rem);
    margin: 0;
    color: var(--text-main);
    font-weight: 700;
  }

  .section-subtitle {
    color: var(--text-muted);
    font-size: 1.1rem;
    margin: 0;
    opacity: 0.9;
  }

  /* Empty State */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
    text-align: center;
    background: var(--bg-secondary);
    border-radius: var(--radius);
    border: 1px dashed var(--border);
  }

  .empty-state p {
    margin-top: 1rem;
    color: var(--text-muted);
  }

  /* Loading State */
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
  }

  .loading-spinner {
    position: relative;
    width: 60px;
    height: 60px;
    margin-bottom: 1.5rem;
  }

  .spinner-blade {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 3px;
    height: 15px;
    margin-left: -1.5px;
    margin-top: -7.5px;
    background: var(--accent);
    border-radius: 3px;
    transform-origin: center -20px;
    animation: spinner-fade 1s infinite linear;
    opacity: 0;
  }

  @keyframes spinner-fade {
    0% {
      opacity: 0.1;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.1;
    }
  }

  .loading-state p {
    color: var(--text-muted);
  }

  /* Organizations */
  .org-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.5rem;
  }

  .org-card {
    background: var(--bg-secondary);
    padding: 1.5rem;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    transition: var(--transition);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .org-card:hover {
    transform: translateY(-5px);
    border-color: var(--border-hover);
    box-shadow: var(--shadow-hover);
  }

  .org-avatar-container {
    position: relative;
    width: 80px;
    height: 80px;
    margin-bottom: 1.25rem;
  }

  .org-avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    position: relative;
    z-index: 2;
  }

  .org-hover-effect {
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background: var(--gradient);
    border-radius: 50%;
    z-index: 1;
    opacity: 0;
    transition: var(--transition);
  }

  .org-card:hover .org-hover-effect {
    opacity: 0.3;
  }

  .org-name {
    font-weight: 600;
    margin-bottom: 1rem;
    flex-grow: 1;
  }

  .org-view-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    transition: var(--transition);
  }

  .org-card:hover .org-view-btn {
    background: var(--accent);
    color: white;
  }

  /* Tech Stack */
  .tech-tabs {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .tech-tab {
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text-muted);
    font-size: 0.875rem;
    cursor: pointer;
    transition: var(--transition);
  }

  .tech-tab:hover {
    border-color: var(--border-hover);
    color: var(--text-main);
  }

  .tech-tab.active {
    background: var(--accent);
    border-color: var(--accent);
    color: white;
  }

  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1.25rem;
  }

  .tech-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.5rem;
    text-align: center;
    transition: var(--transition);
    position: relative;
    overflow: hidden;
    z-index: 1;
  }

  .tech-card:hover {
    transform: translateY(-5px);
    border-color: var(--border-hover);
    box-shadow: var(--shadow-hover);
  }

  .tech-hover-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--gradient);
    opacity: 0;
    z-index: -1;
    transition: var(--transition);
  }

  .tech-card:hover .tech-hover-bg {
    opacity: 0.1;
  }

  .tech-icon {
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
  }

  .tech-icon img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }

  .tech-info h3 {
    font-size: 1rem;
    margin: 0 0 0.25rem;
  }

  .tech-experience {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  /* Projects */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .project-card {
    background: var(--bg-secondary);
    padding: 1.5rem;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    transition: var(--transition);
    display: flex;
    flex-direction: column;
  }

  .project-card:hover {
    transform: translateY(-5px);
    border-color: var(--border-hover);
    box-shadow: var(--shadow-hover);
  }

  .project-header {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }

  .project-avatar-container {
    position: relative;
    flex-shrink: 0;
  }

  .project-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
  }

  .project-lang-badge {
    position: absolute;
    bottom: -4px;
    right: -4px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid var(--bg-secondary);
  }

  .project-title-group {
    flex-grow: 1;
    text-align: left;
  }

  .project-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0;
    color: var(--text-main);
  }

  .project-meta {
    margin-top: 0.25rem;
  }

  .project-visibility {
    font-size: 0.75rem;
    background: rgba(255, 255, 255, 0.1);
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    display: inline-block;
  }

  .project-desc {
    margin: 0 0 1.5rem;
    font-size: 0.9375rem;
    color: var(--text-muted);
    line-height: 1.6;
    flex-grow: 1;
  }

  .project-footer {
    margin-top: auto;
  }

  .project-topics {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .project-topic {
    font-size: 0.75rem;
    background: rgba(99, 102, 241, 0.2);
    color: var(--accent);
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
  }

  .project-stats {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 0.875rem;
    color: var(--text-muted);
    border-top: 1px solid var(--border);
    padding-top: 1rem;
  }

  .stat {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .project-updated {
    margin-left: auto;
    font-size: 0.8125rem;
  }

  /* Pagination */
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
    gap: 0.5rem;
  }

  .pagination-pages {
    display: flex;
    gap: 0.5rem;
  }

  .pagination-button {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    color: var(--text-main);
    width: 40px;
    height: 40px;
    border-radius: var(--radius);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition);
  }

  .pagination-button:hover:not(:disabled) {
    border-color: var(--border-hover);
    background: var(--bg);
  }

  .pagination-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .pagination-button.active {
    background: var(--accent);
    border-color: var(--accent);
    color: white;
  }

  .pagination-button.prev,
  .pagination-button.next {
    width: auto;
    padding: 0 1rem;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .hero {
      min-height: auto;
      padding-top: 6rem;
      padding-bottom: 4rem;
    }

    .cta-buttons {
      flex-direction: column;
      gap: 0.75rem;
    }

    .cta-primary,
    .cta-secondary {
      width: 100%;
      justify-content: center;
    }

    .about-stats {
      flex-direction: column;
      gap: 1.5rem;
    }

    .section {
      padding: 4rem 1.5rem;
    }

    .org-grid,
    .tech-grid,
    .projects-grid {
      grid-template-columns: 1fr;
    }
  }

  /* Animations */
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* Focus styles */
  a:focus-visible,
  button:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
</style>
