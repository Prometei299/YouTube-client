const site = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&type=video&part=snippet&maxResults=16&fields=nextPageToken,items(id(videoId))&q=';

let url;

let nextPage, items;
let arrayCards = [];

nextPage ? url + '&pageToken=' + nextPage : url;

const navdots = document.createElement('div');
navdots.className = 'navdots';

const button1 = document.createElement('div');
button1.className = 'button1';
button1.innerHTML = '1';
button1.dataset.checked = 'true';
button1.dataset.pageNum = '0';
navdots.appendChild(button1);

const button2 = document.createElement('div');
button2.className = 'button2';
button2.innerHTML = '2';
button2.dataset.checked = 'false';
button2.dataset.pageNum = '1';
navdots.appendChild(button2);

const button3 = document.createElement('div');
button3.className = 'button3';
button3.innerHTML = '3';
button3.dataset.checked = 'false';
button3.dataset.pageNum = '2';
navdots.appendChild(button3);

const button4 = document.createElement('div');
button4.className = 'button4';
button4.innerHTML = '4';
button4.dataset.checked = 'false';
button4.dataset.pageNum = '3';
navdots.appendChild(button4);

const windowControl = width => {
    width >= windowControl.prevWindowWidth ? expand(width) : narrow(width);
    windowControl.prevWindowWidth = width;
};

windowControl.prevWindowWidth = window.innerWidth;

window.addEventListener('resize', () => windowControl(window.innerWidth));

const expand = width => {
    let elements = cards.childNodes;

    if (width > 1200) {
        elements[3].dataset.hidden = 'false';
    }

    if (width > 900) {
        elements[2].dataset.hidden = 'false';
    }

    if (width > 700) {
        elements[1].dataset.hidden = 'false';
    }
};

const narrow = width => {
    let elements = cards.childNodes;

    if (width < 1200) {
        elements[3].dataset.hidden = 'true';
    }

    if (width < 900) {
        elements[2].dataset.hidden = 'true';
    }

    if (width < 700) {
        elements[1].dataset.hidden = 'true';
    }
};

function hideCards() {
    cards.innerHTML = '';
    arrayCards.length = 0;

    fetch(url).then(response => response.json()).then(json => {
        nextPage = json.nextPageToken;
        fetch('https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&id=' + json.items.map(el => el.id.videoId).join(',') + '&part=snippet,statistics&fields=items(id,%20snippet(title,description,channelTitle,publishedAt,thumbnails(medium(url))),statistics(viewCount))').then(response => response.json()).then(json => {
            items = json.items;

            items.forEach(element => {

                //create card
                const card = document.createElement('div');
                card.setAttribute('class', 'card');
                card.dataset.hidden = 'false';
                // cards.appendChild(card);

                const img = document.createElement('img');
                card.appendChild(img);
                const anchor = document.createElement('a');
                card.appendChild(anchor);

                const author = document.createElement('div');
                const iAuthor = document.createElement('i');
                iAuthor.setAttribute('class', 'fas fa-male');
                author.appendChild(iAuthor);
                card.appendChild(author);

                const authorName = document.createElement('span');
                authorName.setAttribute('class', 'author');
                author.appendChild(authorName);

                const date = document.createElement('div');
                const idate = document.createElement('i');
                idate.setAttribute('class', 'fas fa-calendar-alt');
                date.appendChild(idate);
                card.appendChild(date);

                const dateName = document.createElement('span');
                dateName.setAttribute('class', 'date');
                date.appendChild(dateName);

                const counter = document.createElement('div');
                const icounter = document.createElement('i');
                icounter.setAttribute('class', 'fas fa-eye');
                counter.appendChild(icounter);
                card.appendChild(counter);
                const counterName = document.createElement('span');
                counterName.setAttribute('class', 'counter');
                counter.appendChild(counterName);

                const description = document.createElement('span');
                description.setAttribute('class', 'description');
                card.appendChild(description);

                img.src = element.snippet.thumbnails.medium.url;
                anchor.innerText = element.snippet.title;
                anchor.href = 'https://www.youtube.com/watch?v=' + element.id;
                authorName.innerText = element.snippet.channelTitle;
                dateName.innerText = element.snippet.publishedAt.slice(0, 5);
                counterName.innerText = element.statistics.viewCount;
                description.innerText = element.snippet.description.substring(0, 80) + '...';

                arrayCards.push(card);
            });
            document.body.appendChild(cards);
            output(0);
            document.body.appendChild(navdots);
        }).catch(ex => console.log('error to get IDs', ex));
    }).catch(ex => console.log('error to get query', ex));
};

const cards = document.createElement('div');
cards.className = 'cards';

const container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

const input = document.createElement('input');
input.type = 'text';
input.placeholder = 'Search...';
input.addEventListener('keypress', function (event) {
    if (event.code === "Enter") {
        url = site + input.value;
        hideCards();
    }
});

const search = document.createElement('div');
search.className = 'search';

container.appendChild(input);
container.appendChild(search);

const newAnim = () => {
    cards.style.animation = 'fadeInDown 1s both';
    setTimeout(() => cards.style.animation = 'none', 1000);
};

navdots.addEventListener("click", e => {
    navdots.childNodes.forEach(button => {
        button.dataset.checked = 'false';
    });
    e.target.dataset.checked = 'true';
    output(+e.target.dataset.pageNum * 4);
});

function output(pageNum) {
    if (cards.childNodes.length !== 0) {
        cards.innerHTML = '';
    }
    for (let i = pageNum; i < pageNum + 4; i++) {
        cards.appendChild(arrayCards[i]);
    }
    narrow(window.innerWidth);
    newAnim();
};
//# sourceMappingURL=code.js.map