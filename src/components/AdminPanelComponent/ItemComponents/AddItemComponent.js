import React, { Component } from 'react';
import styled from 'styled-components';

const Box = styled.div`
    margin: 0 auto;
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const Title = styled.div`
    font-size: 3em;
`

const Span = styled.span`
    margin-top: 50px;
    margin-bottom: 10px;
`

const SizeBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 10px;
    padding: 15px;
    margin-right: 50px;
`

const Input = styled.input`
    margin: 10px 0px;
`

const Button = styled.div`
    margin-bottom: 20px;
`

const Table = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
`

class AddItemComponent extends Component {
    state = {
        sizes: new Map(),
        categories: [],
        images: [],
        alert: 'Błąd.'
    }

    constructor(props) {
        super(props);
        this.addImage = this.addImage.bind(this);
      } 

    nameRef = React.createRef();
    categoryRef = React.createRef();
    priceRef = React.createRef();
    brandRef = React.createRef();
    descriptionRef = React.createRef();
    sizeRef = React.createRef();
    stockRef = React.createRef();

    addSize(){
        let sizes = this.state.sizes;
        sizes.set(this.sizeRef.current.value, parseInt(this.stockRef.current.value));
        this.setState({sizes: sizes});
    }

    removeSize(size){
        size = size;
        let sizes = this.state.sizes;
        sizes.delete(size);
        this.setState({sizes: sizes})
    }

    addImage(e){
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append('image', file);
        fetch('https://api.imgbb.com/1/upload?key=5e56e080d356f193d5bf7b43708f090d', {
            method: 'POST',
            body: formData
        }).then(x => x.json()).then(response => {
            e.target.value = "";
            let images = this.state.images || [];
            images.push(response.data.url);
            this.setState({images: images});
        })
    }

    removeImage(id){
        let images = this.state.images;
        images.splice(id.index, 1);
        this.setState({images: images});
    }

    async componentDidMount(){
        fetch('http://localhost:8080/api/categories/all', {
            method: 'GET'
        }).then(x => x.json()).then(response => {
          response = response.categories;
          let categories = [];
          response.forEach((category, index) => {
            categories.push(<option key={index} value={category.id}>{category.pluralName}</option>)
          })
          this.setState({categories: categories});
        })
    }

    addItem(){
        fetch('http://localhost:8080/api/product', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                token: sessionStorage.getItem('token'),
                name: this.nameRef.current.value,
                category: this.categoryRef.current.value,
                price: this.priceRef.current.value,
                brand: this.brandRef.current.value,
                description: this.descriptionRef.current.value,
                sizes: Object.fromEntries(this.state.sizes),
                images: this.state.images
            })
        }).then(x => x.json()).then(response => {
          if(response.status == 200){
              alert('Dodano nowy przedmiot.');
              window.location.reload();
          } else {
              alert(response.message);
          }
        })
    }

    render() {
        let sizes = [];
        let index = 1;
        this.state.sizes.forEach((stock, size) => {
            sizes.push(
                <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{size}</td>
                    <td>{stock}</td>
                    <td onClick={() => this.removeSize(size)}><svg color="#1A1A1A" width="16px" height="16px" viewBox="0 0 16 16" role="img" focusable="false"><path fillRule="evenodd" clipRule="evenodd" d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H2.5C2.22386 2 2 2.22386 2 2.5C2 2.77614 2.22386 3 2.5 3H13.5C13.7761 3 14 2.77614 14 2.5C14 2.22386 13.7761 2 13.5 2H10.5C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H5.5ZM12 5H4V13C4 13.5523 4.44772 14 5 14H11C11.5523 14 12 13.5523 12 13V5ZM4 4H3V5V13C3 14.1046 3.89543 15 5 15H11C12.1046 15 13 14.1046 13 13V5V4H12H4ZM6.5 6C6.77614 6 7 6.22386 7 6.5V12.5C7 12.7761 6.77614 13 6.5 13C6.22386 13 6 12.7761 6 12.5L6 6.5C6 6.22386 6.22386 6 6.5 6ZM10 6.5C10 6.22386 9.77614 6 9.5 6C9.22386 6 9 6.22386 9 6.5V12.5C9 12.7761 9.22386 13 9.5 13C9.77614 13 10 12.7761 10 12.5V6.5Z" fill="inherit"></path></svg></td>
                </tr>
            )
            index++;
        })

        let images = [];
        this.state.images.forEach((image, index) => {
            images.push(
            <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{image.split('/')[4]}</td>
                <td onClick={() => this.removeImage({index})}><svg color="#1A1A1A" width="16px" height="16px" viewBox="0 0 16 16" role="img" focusable="false"><path fillRule="evenodd" clipRule="evenodd" d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H2.5C2.22386 2 2 2.22386 2 2.5C2 2.77614 2.22386 3 2.5 3H13.5C13.7761 3 14 2.77614 14 2.5C14 2.22386 13.7761 2 13.5 2H10.5C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H5.5ZM12 5H4V13C4 13.5523 4.44772 14 5 14H11C11.5523 14 12 13.5523 12 13V5ZM4 4H3V5V13C3 14.1046 3.89543 15 5 15H11C12.1046 15 13 14.1046 13 13V5V4H12H4ZM6.5 6C6.77614 6 7 6.22386 7 6.5V12.5C7 12.7761 6.77614 13 6.5 13C6.22386 13 6 12.7761 6 12.5L6 6.5C6 6.22386 6.22386 6 6.5 6ZM10 6.5C10 6.22386 9.77614 6 9.5 6C9.22386 6 9 6.22386 9 6.5V12.5C9 12.7761 9.22386 13 9.5 13C9.77614 13 10 12.7761 10 12.5V6.5Z" fill="inherit"></path></svg></td>
            </tr>
            )
        })
        return (
            <Box>
                <Span>Nazwa przedmiotu:</Span>
                <input ref={this.nameRef} className='form-control' placeholder="Nazwa przedmiotu"></input>
                <Span>Kategoria przedmiotu</Span>
                <select ref={this.categoryRef} defaultValue='-1' className='form-control'>
                    <option value='-1' disabled>Kategoria przedmiotu</option>
                    {this.state.categories}
                </select>
                <Span>Cena przedmiotu:</Span>
                <input ref={this.priceRef} className='form-control' placeholder="Cena przedmiotu" type='number'></input>
                <Span>Marka przedmiotu (producent):</Span>
                <input ref={this.brandRef} className='form-control' placeholder="Marka przedmiotu"></input>
                <Span>Opis przedmiotu:</Span>
                <input ref={this.descriptionRef} className='form-control' placeholder="Opis przedmiotu"></input>
                <Span>Tworzenie rozmiarów:</Span>
                <Table>
                    <SizeBox>
                        <Input ref={this.sizeRef} className='form-control' placeholder="Nazwa rozmiaru"></Input>
                        <Input ref={this.stockRef} defaultValue='0' type='number' className='form-control' placeholder="Ilość rozmiaru"></Input>
                        <Button onClick={() => this.addSize()} className='btn btn-success'>Dodaj rozmiar</Button>
                    </SizeBox>
                    {sizes.length == 0 ? '' : 
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">lp.</th>
                                <th scope="col">Rozmiar</th>
                                <th scope="col">Ilość</th>
                                <th scope="col">Akcja</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sizes}
                        </tbody>
                    </table>}
                </Table>

                <Span>Dodawanie zdjęć:</Span>
                <Table>
                    <SizeBox>
                        <Input ref={this.imageRef} type='file' onChange={this.addImage} placeholder="Nazwa rozmiaru"></Input>
                    </SizeBox>
                    {images.length == 0 ? '' : 
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">lp.</th>
                                <th scope="col">Nazwa pliku</th>
                                <th scope="col">Akcja</th>
                            </tr>
                        </thead>
                        <tbody>            
                            {images}
                        </tbody>
                    </table>}
                </Table>
                <Button onClick={() => this.addItem()} className='btn btn-success'>Dodaj przedmiot</Button>      
            </Box>
        );
    }
}

export default AddItemComponent;