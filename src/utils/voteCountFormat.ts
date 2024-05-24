export function voteCountFormat(vote_count: any) {
    if (vote_count < 1000) {
        return `(${vote_count})`
    }
    if (vote_count > 1000 && vote_count < 1000000) {
        return `(${(vote_count / 1000).toFixed(1)}K)`
    }
    if (vote_count > 1000000) {
        return `(${(vote_count / 1000000).toFixed(1)}M)`
    }
}