// +page.server.ts
import {GITHUB_AUTH_TOKEN} from '$env/static/private';

export async function load() {
    const users = ["xyzjesper", "nexocrew-HQ", "Crystopia", "DisBotDevelopment", "xyzspace-dev", "DevelopmentStorage"];
    const allRepos = [];

    for (const user of users) {
        const res = await fetch(`https://api.github.com/search/repositories?q=user:${user}`, {
            headers: {
                Authorization: `Bearer ${GITHUB_AUTH_TOKEN}`
            }
        });

        if (res.ok) {
            const data = await res.json();
            allRepos.push(...data.items);
        } else {
            console.warn(`Failed to fetch for user ${user}:`, res.statusText);
        }
    }

    return {
        allRepos
    };
}
