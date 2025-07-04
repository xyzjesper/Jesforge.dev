export async function load() {
    const users = ["xyzjesper", "nexocrew-HQ", "Crystopia", "DisBotDevelopment", "xyzspace-dev", "DevelopmentStorage"];
    const allRepos = [];

    let token = process.env.GITHUB_AUTH_TOKEN

    console.log("GITHUB_AUTH_TOKEN", token);

    const orgs = await fetch("https://api.github.com/users/xyzjesper/orgs ", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const orgResult = await orgs.json()

    for (const user of users) {
        const res = await fetch(`https://api.github.com/search/repositories?q=user:${user}`, {
            headers: {
                Authorization: `Bearer ${token}`
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
        allRepos,
        orgResult
    };
}
