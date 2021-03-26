class Card {
  constructor(title, url) {
    this.card = document.createElement('div');

    const cardBody = document.createElement('div');
    const cardButton = document.createElement('button');
    const cardImage = document.createElement('img');
    const cardText = document.createElement('p');
    const cardTitle = document.createElement('h3');

    this.card.setAttribute('class', 'card-item');
    cardBody.setAttribute('class', 'card-body');
    cardButton.addEventListener('click', this.onButtonClicked);
    cardText.setAttribute('class', 'card-text');
    cardTitle.setAttribute('class', 'card-title');

    cardButton.innerText = 'button';
    cardImage.src = url ?? '';
    cardImage.addEventListener('error', this.handelImageError);
    cardText.innerText = title + title;
    cardTitle.innerText = title ?? '';

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardButton);

    this.card.appendChild(cardImage);
    this.card.appendChild(cardBody);

  }
  
  handelImageError = event => {
    event.path && event.path[0] ? event.path[0].src = 'http://dummyimage.com/600x600/000/fff': null;
  };

  getCard = () => {
    return this.card;
  };


  onButtonClicked = () => {
    const classList = Object.values(this.card.classList ?? {});

    if (classList.includes('active')) {
      this.card.classList.remove('active');
    } else {
      this.card.classList.add('active');
    }

    const previewsCount = document.getElementById('card-active-count');
    previewsCount?.remove();

    const activeCardCount = document.createElement('p');
    activeCardCount.setAttribute('id', 'card-active-count');

    const count = document.getElementsByClassName('active')?.length;
    activeCardCount.innerText = '-> Active Card: \t' + count ?? 0;

    const title = document.getElementsByClassName('title')[0];
    title.appendChild(activeCardCount);
  };
}

class CardItems {
  constructor() {
    const body = document.getElementsByTagName('body')[0];
    const gridCards = document.createElement('div');
    const title = document.createElement('h2');
    const wrapper = document.createElement('div');

    gridCards.setAttribute('class', 'grid-cards');
    title.setAttribute('class', 'title');
    wrapper.setAttribute('class', 'wrapper');

    title.innerText = 'Lorem Ipsum';
    wrapper.appendChild(title);
    wrapper.appendChild(gridCards);
    body.appendChild(wrapper);
  }

  drawCard = list => {
    const gridCards = document.getElementsByClassName('grid-cards')[0];
    list.forEach(card => {
      gridCards.append(new Card(card.title, card.url).getCard());
    });
  };

  fetchData = () => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then(data => {
        const cardList = data.splice(0, 100);
        this.drawCard(cardList);
      });
  };
}

const list = new CardItems();
list.fetchData();
