class newBook{
    constructor(title,author,publisher,isbn,imgurl){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
        this.publisher=publisher;
        this.imgurl=imgurl;
    }
}
class UIHandler{
    static addBook(book){        
        const carddeck= document.createElement('div');
        carddeck.className=`card-deck`;
        const card=document.createElement('div');
        card.className=`card m-4`;
        const img=document.createElement('img');
        img.src=`${book.imgurl}`;
        img.className=`card-img-top`;
        img.style=`height:500px;`
        card.appendChild(img);
        const cbody=document.createElement('div');
        cbody.className=`card-body`;
        cbody.innerHTML=`<h2>${book.title}</h2>
        <h3>${book.author}</h3><br>
        <h3>${book.publisher}</h3><br>
        <h3>${book.isbn}</h3><br>
        `;
        card.appendChild(cbody);
        carddeck.appendChild(card);
        document.querySelector('#bookItems').appendChild(carddeck);
    }

    static clearArea(){
        var target=document.querySelector('#bookItems');
        target.innerHTML='';
    }
    static showAlert(message, className){
       const div= document.createElement('div');
       div.className = `alert alert-${className}`;
       div.appendChild(document.createTextNode(message));
       const container=document.querySelector('#container2');
       const afterel=document.querySelector('#inserthere');
       container.insertBefore(div,afterel);
       setTimeout(()=>div.remove(),2000);
    }
    static clearFields(){
        document.querySelector('#search-input').value='';
    }
}
document.querySelector('#search-button').addEventListener('click',(e)=>{
    e.preventDefault();
    var sbook=document.querySelector('#search-input').value;
    if(sbook=='' || sbook==null)
    {
        UIHandler.showAlert("type something for search!","danger");
        UIHandler.clearFields();
    }else{
        var url=`https://www.googleapis.com/books/v1/volumes?q=`+sbook+`&key=AIzaSyBikULBVGtnX4gFDmllovbeqL5ItH5bYe0`;
        Search.searchBook(url);      
    }
    // console.log(sbook);
    // alert(sbook+"found");
});

class Search{
static searchBook(url){
    UIHandler.clearArea();
    let bookks=[]; 
    var totObj=fetch(url)
    .then(response => response.json())
    .then(result => {
       var temp=result;
       if(temp.totalItems==0){
           UIHandler.showAlert("NO RESULT","danger");
           UIHandler.clearFields();
       }else{
           temp.items.forEach(book => {
               var title=book.volumeInfo.title;
               var author=book.volumeInfo.authors;
               var publisher=book.volumeInfo.publisher;
               var isbn=book.volumeInfo.industryIdentifiers[0].identifier;
               var imgurl=book.volumeInfo.imageLinks.thumbnail;
               var bb=new newBook(title,author,publisher,isbn,imgurl);
               UIHandler.addBook(bb);               
            //    console.log(book);
           });
       }    
    })  
}
}