function fetchMediumPublicationStories(publicationName, containerId) {
    const feedUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${publicationName}`;
    fetch(feedUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
            const stories = data.items;
            const storyData = stories.map(story => {
                const { title, pubDate, author, link, thumbnail, categories } = story;
                const pubDateObj = new Date(pubDate);
                const day = pubDateObj.getDate();
                const month = pubDateObj.toLocaleString('default', { month: 'long' });
                const year = pubDateObj.getFullYear();
                const category = categories[0];
                return { title, pubDate: { day, month, year }, author, link, thumbnail, category};
            });

            const container = document.getElementById(containerId);
            storyData.forEach(story => {
                const storyElement = document.createElement('div');
                storyElement.classList.add('col-xl-4');
                storyElement.classList.add('col-lg-4');
                storyElement.classList.add('col-md-6');
                storyElement.innerHTML =
                    `<div class="blog-item">
                        <div class="position-relative overflow-hidden">
                            <img class="img-fluid" src="${story.thumbnail}" alt="${story.title}" style="height: 300px;">
                        </div>
                        <div class="bg-secondary d-flex">
                            <div
                                class="flex-shrink-0 d-flex flex-column justify-content-center text-center bg-primary text-white px-4">
                                <span>${story.pubDate.day}</span>
                                <h5 class="text-uppercase m-0">${story.pubDate.month}</h5>
                                <span>${story.pubDate.year}</span>
                            </div>
                            <div class="d-flex flex-column justify-content-center py-3 px-4">
                                <div class="d-flex mb-2">
                                    <small class="text-uppercase me-3"><i
                                            class="bi bi-person me-2"></i>${story.author}</small>
                                    <small class="text-uppercase me-3"><i class="bi bi-bookmarks me-2"></i>${story.category}</small>
                                </div>
                                <a class="h4" href="${story.link}">${story.title}</a>
                            </div>
                        </div>
                    </div>`;
                container.appendChild(storyElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Usage example
fetchMediumPublicationStories('itnext', 'stories-container');
