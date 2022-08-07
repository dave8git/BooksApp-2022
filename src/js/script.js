{
  'use strict';

  const select = {
    templateOf: {
      bookItem: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
    },
    form: {
      formFilter: '.filters form',
    }
  };

  const classNames = {
    book: {
      favoriteBook: 'favorite',
    },
  };
  const templates = {
    menuBook: Handlebars.compile(
      document.querySelector(select.templateOf.bookItem).innerHTML
    ),
  };
  class BooksList {
    constructor() {
      const thisBooks = this;
      thisBooks.initData();
      thisBooks.render();
      thisBooks.getElements();
      thisBooks.initActions(); 
      
    }

    render() {
      const thisBooks = this;
      for (let book of thisBooks.data) {
        const ratingBgc = thisBooks.determineRatingBgc(book.rating);
        console.log('book ', book);
        book.ratingBgc = ratingBgc;
        const ratingWidth = book.ratingBgc * 10;
        console.log('book ratingBgc', book.ratingBgc);
        console.log('ratingWidth', ratingWidth);
        book.ratingWidth = ratingWidth;
        const generatedHTML = templates.menuBook(book);
        thisBooks.element = utils.createDOMFromHTML(generatedHTML);
        const booksContainer = document.querySelector(select.containerOf.bookList);
        booksContainer.appendChild(thisBooks.element);
      }
    }

    initData() {
      const thisBooks = this;
      thisBooks.data = dataSource.books;
    }

    getElements() {
      const thisBooks = this;
      thisBooks.dom = {};

      thisBooks.dom.form = document.querySelector(select.form.formFilter);
    }

    initActions() {
      const thisBooks = this;
      //const favoriteBooks = [];
      thisBooks.filters = [];
      document.querySelector(select.containerOf.bookList).addEventListener('dblclick', function (e) {
        e.preventDefault();
        if (e.target.offsetParent.classList.contains('book__image')) {
          e.target.offsetParent.classList.toggle(classNames.book.favoriteBook);
        } 
      });
      thisBooks.dom.form.addEventListener('click', function (e) { 
        if(e.target.tagName === 'INPUT' && e.target.type === 'checkbox' && e.target.name === 'filter') {
          // console.log(e.target.checked);
          // console.log(e.target.value);
          if(e.target.checked) {
            thisBooks.filters.push(e.target.value);
          } else {
            for(let filter of thisBooks.filters) {
              thisBooks.filters.splice(thisBooks.filters.indexOf(filter), 1);
            }
                    
          }

        }
        thisBooks.filterBooks();
      });
    }
    filterBooks() {
      const thisBooks = this;
      let shouldBeHidden = false;
        
      for(const book of thisBooks.data) {
        for(const filter of thisBooks.filters) {
          if(!book.details[filter]) {
            shouldBeHidden = true;
            break;
          } else {
            shouldBeHidden = false;
          }
        }
        if(shouldBeHidden) {
          document.querySelector(`.book__image[data-id="${book.id}"]`).classList.add('hidden');
          //console.log(`.book__image[data-id="${book.id}"]`);
        } else {
          document.querySelector(`.book__image[data-id="${book.id}"]`).classList.remove('hidden');
        }
      }
        
   

    }

    determineRatingBgc(rating) {
      //const thisBooks = this;
      if(rating < 6 ) {
        return 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%);';
      } else if (rating > 6 && rating <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      } else if (rating > 8 && rating <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      } else if (rating > 9) {
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }
    }
  }

  const app = new BooksList();
  console.log(app);
}
