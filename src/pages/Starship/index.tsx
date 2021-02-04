import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  FormEvent,
} from 'react';

import axios from 'axios';

import {
  FiFilm,
  FiStar,
  FiTrash2
} from 'react-icons/fi';

import './styles.css';

interface PaginatedResult<T> {
  count: number,
  previous: string,
  next: string,
  results: T[]
}

const ITENS_PER_PAGE: number = 10;

function Vehicles() {
  const [searchDraft, setSearchDraft] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [data, setData] = useState<PaginatedResult<any>>();
  const [favorites, setFavorites] = useState<any[]>([]);

  const totalPages = useMemo(() => {
    return data ? Math.ceil(data.count / ITENS_PER_PAGE) : 0;
  }, [data]);

  useEffect(() => {
    setLoadingData(true);

    const params ={
      page,
      search: search.trim() || undefined
    };

    axios.get('https://swapi.dev/api/starships/', { params: params })
      .then(response => {
        setData(response.data);
      })
      .finally(() => {
        setLoadingData(false);
      })
  }, [page, search]);

  const goToPreviousPage = useCallback(() => {
    setPage(page => page - 1)
  }, []);

  const goToNextPage = useCallback(() => {
    setPage(page => page + 1)
  }, []);

  const applySearch = useCallback((e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchDraft);
  }, [searchDraft]);

  const addToFavorite = useCallback((newFavorite: string) => {
    if (favorites.indexOf(newFavorite) < 0) {
      setFavorites((favoritesPrevValue: string[]) => [ ...favoritesPrevValue, newFavorite ]);
    }
  }, [favorites]);

  const removeFromFavorite = useCallback((oldFavorite: string) => {
    setFavorites(
      (favoritesPrevValue: string[]) => favoritesPrevValue.filter(value => value !== oldFavorite)
    );
  }, []);

  return (
    <div>
      <div className="title">
        Starships
      </div>

      <div className="favorite-box">
          <span className="favorite-box-label">Favorites:</span>
          {favorites.map((favorite: string) => 
            <span className="favorite-item" key={favorite}>{favorite}
              <button
                className="remove-favorite-button"
                onClick={() => { removeFromFavorite(favorite); }}
              >
                <FiTrash2 size="15px" title="Remove from favorites."/>
              </button>
            </span>
          )}
          {favorites.length === 0 && <span> - </span>}
      </div>

      <form onSubmit={applySearch}>
        <input className='input-pesquisar'
          type="text"
          maxLength={50}
          value={searchDraft}
          onChange={e => setSearchDraft(e.target.value)}
          disabled={loadingData}
        />
        
        <button className='btn-pesquisar'
          type="submit"
          disabled={loadingData}
        >
          Pesquisar
        </button>
      </form>

      <button className='btn-previous'
        type="button"
        onClick={goToPreviousPage}
        disabled={loadingData || (data && !data.previous)}
      >
          Previous
      </button>

      {data && <div className='div-pagina'>Página {page} de {totalPages}</div>}

      <button  className='btn-next'
        type="button"
        onClick={goToNextPage} 
        disabled={loadingData || (data && !data.next)}
      >
          Next
      </button>

      {loadingData && <h1>Loading</h1>}

      {data && !data.results.length && <h1>No results</h1>}

      <div className="starships-box">
        {data && data.results.map((p: any) =>
          <div className="starships" key={p.name}>
            {favorites.indexOf(p.name) < 0 &&
              <button
                className="favorite-button"
                type="button"
                onClick={() => { addToFavorite(p.name); }}
              >
                <FiStar></FiStar>
              </button>
            }

            <div className="ships-attribute">
              <span>Name:</span> {p.name}
            </div>

            <div className="ships-attribute">
              <span>Model:</span> {p.model}
            </div>

            <div className="ships-attribute">
              <span>manufacturer:</span> {p.manufacturer}
            </div>

            <div className="ships-attribute">
              <span>Manufacturer:</span> {p.manufacturer}
            </div>

            <div className="ships-attribute">
              <span>Cost in credits:</span> {p.cost_in_credits}
            </div>

            <div className="ships-attribute">
              <span>Length:</span> {p.length}
            </div>

            <div className="ships-attribute">
              <span>max_atmosphering_speed:</span> {p.max_atmosphering_speed}
            </div>

            <div className="ships-attribute">
              <span>crew:</span> {p.crew}
            </div>

            <div className="ships-attribute">
              <span>Passengers:</span> {p.passengers}
            </div>

            <div className="ships-attribute">
              <span>Cargo capacity:</span> {p.cargo_capacity}
            </div>

            <div className="ships-attribute">
              <span>Consumables:</span> {p.consumables}
            </div>

            <div className="ships-attribute">
              <span>hyperdrive_rating:</span> {p.hyperdrive_rating}
            </div>

            <div className="ships-attribute">
              <span>MGLT:</span> {p.MGLT}
            </div>

            <div className="ships-attribute">
              <span>starship_class:</span> {p.starship_class}
            </div>

            <div className="ships-attribute">
              <span>pilots:</span> {p.pilots}
            </div>
            
            <div className="ships-link-list">
              <span><FiFilm /> Species</span>
              {p.films.length === 0 && <div>Nothing</div>}
              {p.films.map((film: any) =>
                <div key={film}><a href={film}>{film}</a></div>
              )}
            </div>
            
            <div className="ships-attribute">
              <span>Created At:</span> {p.created}
            </div>

            <div className="ships-attribute">
              <span>Edited At:</span> {p.edited}
            </div>

            <div className="ships-attribute">
              <span>URL:</span> <a href={p.url}>{p.url}</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Vehicles;