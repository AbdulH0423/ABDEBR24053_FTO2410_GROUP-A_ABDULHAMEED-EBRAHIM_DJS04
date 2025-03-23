//Importing data from data.js
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

let page = 1;
let matches = books

const starting = document.createDocumentFragment()
/**
 * Class with book list 
 */


// Helper function to create an element
class BookList {

const createElement = (tag, attributes,innerHTML='') => {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    element.innerHTML = innerHTML;
    return element;
};
    /**
     * Creating a instance of BookList
     * @param {Array} books - List of books
     * @param {Object} authours - Dictionary of authors
     * @param {Object} genres - Dictionary of genres
     * @param {Number} booksPerPage - Number of books per page
     */

    constructor(books, authors, genres, booksPerPage) {
        this.books = books;
        this.authors = authors;
        this.genres = genres;
        this.booksPerPage = booksPerPage;
        this.page = 1;
        this.matches = books;
    }

//Function to render books

const renderBooks = (bookList, container, clear = false, pageNumber =0) => {
    if (clear) container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    /**
     * Rendering books into HTML
     * @param {HTMLElement} targetElement - Element to render books into
     * @param {boolean} reset - Wheather to clear the target element before rendering
     * @param {number} startIndex - The start index of the books to render
     */

    renderBooks(targetElement, reset = false, startIndex = 0){
        if(reset)targetElement.innerHTML = "";

    bookList.slice(pageNumber * BOOKS_PER_PAGE, (pageNumber + 1) * BOOKS_PER_PAGE).forEach(({ author, id, image, title }) => {
        const bookElement = createElement("button", { class: "preview", "data-preview": id },`
            <img class="preview__image" src="${image}" />
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}
            </div>`);
        const fragment = document.createDocumentFragment();
        const slicedBooks = this.matches.slice(startIndex, startIndex + this.booksPerPage);

        for(const{author, id, image, title}of slicedBooks){
            const bookElement = this.createBookElement({author, id, title, image});
            fragment.appendChild(bookElement);
    });
        }

    container.appendChild(fragment);
        targetElement.appendChild(fragment);
    }

     // Update 'Show More' button

     const showMoreButton = document.querySelector('[data-list-button]');
     showMoreButton.disabled = matches.length <= (pageNumber + 1) * BOOKS_PER_PAGE;
     showMoreButton.innerHTML = `
         <span>Show more</span>
         <span class="list__remaining">($ ={Math.max(matches.length - ((pageNumber + 1)* BOOKS_PER_PAGE), 0)})</span>`;
};
    /**
     * Create a preview element for a book
     * @param {string} id - The id of the book
     * @param {string} title - The title of the book
     * @param {string} image - The image of the book
     * @param {string} author - The author of the book
     * @returns {HTMLElement} - The preview element
     */

    createBookElement({author, id, image, title}){
        const element = document.createElement("button");
        element.classList.add("preview");
        element.setAttribute("data-preview", id);
        element.innerHTML = `
            <img class="preview__image" src="${image}" />
            <div class= "preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class= "preview__author">${this.authors[author]}</div>
                </div>
                `;

// Function to populate dropdowns

const populateDropdown = (dropdown, data, defaultText) => {
    populateDropdown.innerHTML = '';
    const firstOption = createElement("option", {value: "any"}, defaultText);
    dropdown.appendChild(firstOption);
    /**
     * Filtering based on search filters
     * @param {Object} filters - The search filters(title, author, genre)
     */

    Object.entries(data).forEach(([id, name]) => {
        const option = createElement("option", { value: id }, name);
        dropdown.appendChild(option);
    filterBooks(filters){
        this.matches = this.books.filter(book =>{
            let genreMatch = filters.genre === "any" || book.genres.includes(filters.genre);
            return(
                (filters.title.trim()==="" || book.title.toLowerCase().includes(filters.title.toLowercase())) && 
                (filters.author === "any" || book.author === filters.author) &&
                genreMatch
            );
        });

    });
        this.page = 1;

};
    }

    /**
     * Load and render more books
     * 
     */

    loadMoreBooks(){
        this.renderBooks(document.querySelector("[data-list-items]"), true, this.page * this.booksPerPage);

const toggleModal = (selector, isOpen) => {
    document.querySelector(selector).open = isOpen;
};
 
        this.page += 1;
    }

}

// Function to apply the Theme

const applyTheme = (theme) => {
    document.documentElement.style.setProperty("--color-dark", theme === "night" ? "255, 255, 255" : "10, 10, 20");
    document.documentElement.style.setProperty("--color-light", theme === "night" ? "10, 10, 20" : "255, 255, 255");
};



// Function to filter books

const filterBooks = (filter) => {
    return books.filter(book =>{
        let genreMatch = filter.genre === "any" || book.genres.includes(filter.genre);
        let titleMatch = filter.title.trim() === "" || book.title.toLowerCase().includes(filters.title.toLowerCase());
        let authorMatch = filter.author == "any" || book.author === filter.author;
        return genreMatch && titleMatch && authorMatch;

    });
};

// Function to load more books

const loadMoreBooks = () => { 
    page += 1;
    renderBooks(matches, document.querySelector("[data-list-items]"),false,page);
};

// Initial Render

const listItemsContainer = document.querySelector("[data-list-items]");
renderBooks(matches, listItemsContainer);
populateDropdown(document.querySelector("[data-search-genres]"), genres, "All Genres");
populateDropdown(document.querySelector("[data-search-authors]"), authors, "All Authors");
applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? "night" : "day");


// Event Listeners

document.querySelector("[data-search-cancel]").addEventListener("click",()=>{
    toggleModal("[data-search-overlay]", false)
});



document.querySelector("[data-header-search]").addEventListener("click",()=>{
    toggleModal("[data-search-overlay]", true)
    document.querySelector("[data-search-title]").focus();

});


document.querySelector("[data-settings-cancel]").addEventListener("click",()=>{
    toggleModal("data-settings-overlay", false)
});



document.querySelector("[data-header-settings]").addEventListener("click",()=>{
    toggleModal("[data-settings-overlay]", true);
});


document.querySelector("[data-settings-form]").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);
    applyTheme(theme);
    toggleModal("[data-settings-overlay]", false);
});



document.querySelector("[data-list-close]").addEventListener("click",()=>{
    toggleModal("[data-list-active]", false);
});

document.querySelector("[data-list-button]").addEventListener("click", loadMoreBooks);




document.querySelector("[data-search-form]").addEventListener("submit", (event) => {
    event.preventDefault();
    const filters = Object.fromEntries(new FormData(event.target));
    matches = filterBooks(filters);
    page = 0;
    renderBooks(matches, listItemsContainer, true, page);
    toggleModal("[data-search-overlay]", false);

});



// Book Preview Click Event

document.querySelector("[data-list-items]").addEventListener("click", (event) => {
    const pathArray = event.composedPath();
    let active = null;

    for (const node of pathArray) {
        if (node?.dataset?.preview) {
            active = books.find(book => book.id === node.dataset.preview);
            break;
        }
    }

    if (active) {
        toggleModal("[data-list-active]", true);
        document.querySelector("[data-list-blur]").src = active.image;
        document.querySelector("[data-list-image]").src = active.image;
        document.querySelector("[data-list-title]").innerText = active.title;
        document.querySelector("[data-list-subtitle]").innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
        document.querySelector("[data-list-description]").innerText = active.description;
    }
});
