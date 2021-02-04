import React from 'react';
import './styles.css';


function Home(props:any){


  return (
    <div>
      
      <div className="title">
        Home
      <p>API Root - <a href="https://swapi.dev/api/">Star Wars Api</a></p>
      </div>

      <div className="box">
      <h1>SWAPI - The Star Wars API</h1>
      <p>Bem-vindo ao swapi, a API Star Wars! Esta documentação deve ajudá-lo a se familiarizar com os recursos disponíveis e como consumi-los com solicitações HTTP.</p>

      </div>
    
      <div className="home">
        Link de cada API utilizada no projeto:
      <p><span>People:    <a href="https://swapi.dev/api/people/">https://swapi.dev/api/people/</a></span></p>
      <p><span>Planets:   <a href="https://swapi.dev/api/planets/">https://swapi.dev/api/planets/</a></span></p>
      <p><span>Films:     <a href="https://swapi.dev/api/films/">https://swapi.dev/api/films/</a></span></p>
      <p><span>Species:   <a href="https://swapi.dev/api/species/">https://swapi.dev/api/species/</a></span></p>
      <p><span>Vehicles:  <a href="https://swapi.dev/api/vehicles/">https://swapi.dev/api/vehicles/</a></span></p>
      <p><span>Starships: <a href="https://swapi.dev/api/starships/">https://swapi.dev/api/starships/</a></span></p>
      </div>

      <div className="info">
       Funções
       <p>Pesquisar - Nome/Title</p>
       <p>Adicionar - Favoritos</p>
       <p>Remover - Favoritos</p>
       <p>Avançar paginação</p>
       <p>Voltar paginação</p>
      </div>
    

   </div>

  )}

export default Home;