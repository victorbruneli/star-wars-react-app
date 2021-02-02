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
  FiTwitter,
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

function Species(props : any) {
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

    axios.get('https://swapi.dev/api/species/', { params: params })
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
        Species
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

      <div className="species-box">
        {data && data.results.map((p: any) =>
          <div className="species" key={p.name}>
            {favorites.indexOf(p.name) < 0 &&
              <button
                className="favorite-button"
                type="button"
                onClick={() => { addToFavorite(p.name); }}
              >
                <FiStar></FiStar>
              </button>
            }

            <div className="people-attribute">
              <span>Name:</span> {p.name}
            </div>

            <div className="people-attribute">
              <span>classification:</span> {p.classification}
            </div>

            <div className="people-attribute">
              <span>designation:</span> {p.designation}
            </div>

            <div className="people-attribute">
              <span>average_height:</span> {p.average_height}
            </div>

            <div className="people-attribute">
              <span>Skin Color:</span> {p.skin_color}
            </div>

            <div className="people-attribute">
              <span>hair_colors:</span> {p.hair_colors}
            </div>

            <div className="people-attribute">
              <span>eye_colors:</span> {p.eye_colors}
            </div>

            <div className="people-attribute">
              <span>average_lifespan:</span> {p.average_lifespan}
            </div>

            <div className="people-attribute">
              <span>Homeworld:</span> <a href={p.homeworld}>{p.homeworld}</a>
            </div>

            <div className="people-attribute">
              <span>language:</span> {p.language}
            </div>

            <div className="people-link-list">
              <span><FiFilm /> Films</span>
              {p.films.length === 0 && <div>Nothing</div>}
              {p.films.map((film: any) =>
                <div key={film}><a href={film}>{film}</a></div>
              )}
            </div>
            
            <div className="people-link-list">
              <span><FiTwitter /> People</span>
              {p.people.length === 0 && <div>Nothing</div>}
              {p.people.map((peop: any) =>
                <div key={peop}><a href={peop}>{peop}</a></div>
              )}
            </div>

            <div className="people-attribute">
              <span>Created At:</span> {p.created}
            </div>

            <div className="people-attribute">
              <span>Edited At:</span> {p.edited}
            </div>

            <div className="people-attribute">
              <span>URL:</span> <a href={p.url}>{p.url}</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Species;