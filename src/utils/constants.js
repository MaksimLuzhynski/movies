export const yearsArrayForSelector = []
for (let i = 2024; i > 1885; i--) {
    yearsArrayForSelector.push(String(i))
}

export const sortArrayForSelector =
    [
        { value: 'original_title.desc', label: 'Most Original Title' },
        { value: 'original_title.asc', label: 'Least Original Title' },
        { value: 'popularity.desc', label: 'Most Popular' },
        { value: 'popularity.asc', label: 'Least Popular' },
        { value: 'revenue.desc', label: 'Most Revenue' },
        { value: 'revenue.asc', label: 'Least Revenue' },
        { value: 'primary_release_date.desc', label: 'Most Release Date' },
        { value: 'primary_release_date.asc', label: 'Least Release Date' },
        { value: 'title.desc', label: 'Most Title' },
        { value: 'title.asc', label: 'Least Title' },
        { value: 'vote_average.desc', label: 'Most Rated' },
        { value: 'vote_average.asc', label: 'Least Rated' },
        { value: 'vote_count.desc', label: 'Most Voted' },
        { value: 'vote_count.asc', label: 'Least Voted' },
    ]