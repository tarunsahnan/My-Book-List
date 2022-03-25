class book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;            
    }
}

class UI{

    //display books from local storage
    static displayBooks(){

        const books=storage.getBooks();
        console.log(books);
        if(book != null)
            books.forEach((book)=> UI.addBook(book));
    }

    //clear input fields
    static clear(){
        const input=document.querySelectorAll('input[type=text]');
        input[0].value='';
        input[1].value='';
        input[2].value='';
    }

    //show alerts
    static showAlert(msg,cls){

        var div = document.createElement('div');
        div.appendChild(document.createTextNode(msg));
        div.className = `alert ${cls}`;
        let form=document.querySelector('.my-form');
        let section = document.querySelector('section');
        section.insertBefore(div,form);

        setTimeout(()=>document.querySelector('.alert').remove(),3000);
    }


    //add book
    static addBook(newBook){
        this.clear;
        const tr= document.createElement('tr');
        tr.innerHTML = `<td>${newBook.title}</td>
                        <td>${newBook.author}</td>
                        <td>${newBook.isbn}</td>
                        <td id ="last" text-align="right"><button class="delete" type="SUBMIT"> X </button></td>`;
        tbody.appendChild(tr);
    }

    //remove book
    static deleteBook(e){
        e.preventDefault;
        if(e.target.classList.contains('delete'))

            // storage.deleteBook(e.target.parentElement.parentElement)
            e.target.parentElement.parentElement.remove();

    }

}


class storage{
    //return books from localStorage
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null)
            books=[];
        else    
            books=JSON.parse(localStorage.getItem('books'));

        return books;
    }

    //add book to local storage
    static addBook(newBook){

        const books=storage.getBooks();
        books.push(newBook);
        localStorage.setItem('books',JSON.stringify(books));
    }

    static deleteBook(isbn){

        var books=storage.getBooks();

        books.forEach((book,index) => {
            if(book.isbn === isbn)
                books.splice(index,1);
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}

document.addEventListener("DOMContentLoaded",UI.displayBooks);

let tbody = document.querySelector("tbody");

//add Book event
document.querySelector('.btn').addEventListener('click',function(e){
    e.preventDefault();
    const input=document.querySelectorAll('input[type=text]');

    if(input[0].value==='' ||input[1].value==='' || input[2].value==='')
        UI.showAlert("Enter all fields","error");

    else{
        const newBook = new book(input[0].value,input[1].value,input[2].value);
        UI.addBook(newBook);
        UI.clear();

        storage.addBook(newBook);
        UI.showAlert("Book Added Successfully","success");
    }
});

//delete event
document.querySelector("tbody").addEventListener('click',function(e){
    UI.deleteBook(e);
    UI.showAlert('Book Removed Successfully','success');
    storage.deleteBook(e.target.parentElement.previousElementSibling.textContent);
});