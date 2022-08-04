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
    }
  }
  const templates = {
    menuBook: Handlebars.compile(
      document.querySelector(select.templateOf.bookItem).innerHTML,
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
        const generatedHTML = templates.menuBook(book);
        thisBooks.element = utils.createDOMFromHTML(generatedHTML);
        const booksContainer = document.querySelector(select.containerOf.bookList);
        booksContainer.appendChild(thisBooks.element);
      };
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
        const favoriteBooks = [];
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
        })
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

            }
        }
        
   

    }

    determineRagingBgc() {}

  }

  const app = new BooksList();
  console.log(app);
}
