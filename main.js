class Book{
    constructor(title, author, isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

class UI{
    static displayBooks(){ 
    const books= Store.getBooks();
    books.forEach((book)=>UI.addBooktoList(book));
    }
    static addBooktoList(book){
        const list=document.querySelector('#book-list');
        const row= document.createElement('tr');
        row.innerHTML = `
        <th>${book.title}</th>
        <th>${book.author}</th>
        <th>${book.isbn}</th>
        <td><a href='#' class="btn btn-danger btn-sm delete">X</td>
        `;
        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
             el.parentElement.parentElement.remove();
             return true;
        }else return false;
    }
    static showAlert(message, className){
       const div= document.createElement('div');
       div.className = `alert alert-${className}`;
       div.appendChild(document.createTextNode(message));
       const container=document.querySelector('.container');
       const afterel=document.querySelector('#toInsert');
       container.insertBefore(div,afterel);
       setTimeout(()=>div.remove(),2000);
    }
    static clearFields(){
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';
    }

}
// Storing to the local storage
class Store{
    static getBooks(){
       let books;
       if(localStorage.getItem('books')===null){
           books=[];
       }else{
           books=JSON.parse(localStorage.getItem('books'));
       }
       return books;
    }
    static addBook(book){
     const books=Store.getBooks();
     books.push(book);
     localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(isbn){
      const books=Store.getBooks();

      books.forEach((book,index)=>{
          if(book.isbn===isbn)
            books.splice(index,1);
      });
      localStorage.setItem('books',JSON.stringify(books));
    }
}

// Event: Display books 
document.addEventListener('DOMContentLoaded',UI.displayBooks);

// Event add a book
document.querySelector('#book-form').addEventListener('submit',(e)=>{
e.preventDefault();
// Get form values
const title=document.querySelector('#title').value;
const author=document.querySelector('#author').value;
const isbn=document.querySelector('#isbn').value;

// isvalid
if(title==='' || author==='' || isbn===''){
   UI.showAlert('Please fill all fields','danger');    
}
else{
const book =new Book(title, author, isbn);
// add book to UI
UI.addBooktoList(book);
Store.addBook(book);
UI.showAlert('Book added successfully','success');
}
UI.clearFields();
});

// Event : Remove a Book

document.querySelector('#book-list').addEventListener('click',(e)=>{
    if(UI.deleteBook(e.target)){
    UI.showAlert('Book removed successfully','success');
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    }
});

