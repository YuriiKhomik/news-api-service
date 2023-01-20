// створюємо клас, який буде відповідати за фетч даних з бекенду
// це робиться для того, щоби розділити фкнкціонал, який робить різні речі

export default class NewsApiservice {
  // в конструкторі вказуємо властивості, які буде мати екземпляр цього класу і куди будемо записувати дані замість використання глобальних змінних
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    //   об'єкт параметрів пошуку, який парситься в ЮРЛ, щоби не писати довжелехний лінк
    const searchParams = new URLSearchParams({
      q: this.searchQuery,
      pageSize: 5,
      page: this.page,
    });

    //   власне, ЮРЛ
    const url = `https://newsapi.org/v2/everything?${searchParams}`;

    //   в цому об'єкті перераємо зберігаємо заголовки (наприклад, ключ доступу до АПІ)
    const options = {
      headers: {
        'X-Api-Key': 'b41603e50de9421aa47b2028dddacda6',
      },
    };

    // ми хочемо, щоби фетч повернув проміс із статтею, який ми далі опрацюємо у зовнішньому коді
    return fetch(url, options)
      .then(r => r.json())
      .then(i => {
        //   після отримання ОК результату фетчу, збільшуємо значення сторінки на 1, для того, щоб наступний запит йшов на сторінку 2
        this.incrementPage();

        return i.articles;
      });
  }
  // метод (функція збільшення значення сторінки)
  incrementPage() {
    this.page += 1;
  }
  //   метод (функція) збивання значення сторінки на 1 (викликається при натисканні кнопки пошуку, а для кнопки лоуд мор цього сценарію не буде, тому сторінка збільшиться на 1)
  resetPage() {
    this.page = 1;
  }

  // геттери і сеттери
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
