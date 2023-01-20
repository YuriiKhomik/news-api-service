// імпортуємо клас для фетчу даних
import NewsApiservice from './news-service';
// імпортуємо клас із кнопкою
// import loadMoreBtn from './load-more-btn';
import LoadMoreBtn from './load-more-btn';

const refs = {
  list: document.querySelector('.news-list'),
  form: document.querySelector('.js-search-form'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

// робимо екземпляр цього класу (тепер ми можемо передавати в нього всю необхідну інфу без потреби в створенні глобальних змінних)
const newsApiService = new NewsApiservice();

refs.form.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  // передаємо значення this.search.query з інпуту щоби newsApiService знав, що шукати
  newsApiService.query = e.target.query.value;

  if (e.target.query.value === '') {
    return alert('Type smth');
  }

  // вмикаємо кнопку
  loadMoreBtn.show();
  newsApiService.resetPage();
  clearAtriclesContainer();
  loadMoreBtn.disable();
  // fetchArticles() повертає проміс із статтями (можна подивитися у класі (return fetch...))
  //  відповідно, на цей проміс ми можемо вчепити then і обробити його як нам потрібно
  newsApiService.fetchArticles().then(articles => {
    appendArticlesMarkup(articles);
    refs.list.classList.add('news-list-active');
    loadMoreBtn.enable();
  });
}

function onLoadMore() {
  loadMoreBtn.disable();
  newsApiService.fetchArticles().then(articles => {
    // clearAtriclesContainer();
    appendArticlesMarkup(articles);
  });
}

function appendArticlesMarkup(articles) {
  refs.list.insertAdjacentHTML('beforeend', createMarkup(articles));
}

function createMarkup(articles) {
  return articles
    .map(({ url, urlToImage, title, author, description }) => {
      return `<div class="element">
        <a href="${url}">
            <img src="${urlToImage}" alt=""/>
            <h2>${title}</h2>
            <p>Posted by: ${author}</p>
            <p>${description}</p>
        </a>
      </div>`;
    })
    .join('');
}

function clearAtriclesContainer() {
  refs.list.innerHTML = '';
}
