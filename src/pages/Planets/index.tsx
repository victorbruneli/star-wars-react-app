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

function Planets() {
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

    axios.get('https://swapi.dev/api/planets/', { params: params })
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
        Planets
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

      <div className="planets-box">
        {data && data.results.map((p: any) =>
          <div className="planets" key={p.name}>
            {favorites.indexOf(p.name) < 0 &&
              <button
                className="favorite-button"
                type="button"
                onClick={() => { addToFavorite(p.name); }}
              >
                <FiStar></FiStar>
              </button>
            }

            <div className="planets-attribute">
              <span>Name:</span> {p.name}
            </div>

            <div className="planets-attribute">
              <span>rotation_period:</span> {p.rotation_period}
            </div>

            <div className="planets-attribute">
              <span>orbital_period:</span> {p.orbital_period}
            </div>

            <div className="planets-attribute">
              <span>diameter:</span> {p.diameter}
            </div>

            <div className="planets-attribute">
              <span>climate:</span> {p.climate}
            </div>

            <div className="planets-attribute">
              <span>gravity:</span> {p.gravity}
            </div>

            <div className="planets-attribute">
              <span>terrain:</span> {p.terrain}
            </div>

            <div className="planets-attribute">
              <span>surface_water:</span> {p.surface_water}
            </div>

            <div className="planets-attribute">
              <span>population:</span> {p.population}
            </div>

            <div className="planets-link-list">
              <span><FiFilm /> Species</span>
              {p.residents.length === 0 && <div>Nothing</div>}
              {p.residents.map((resident: any) =>
                <div key={resident}><a href={resident}>{resident}</a></div>
              )}
            </div>

            <div className="planets-link-list">
              <span><FiFilm /> Species</span>
              {p.films.length === 0 && <div>Nothing</div>}
              {p.films.map((film: any) =>
                <div key={film}><a href={film}>{film}</a></div>
              )}
            </div>
            
            <div className="planets-attribute">
              <span>Created At:</span> {p.created}
            </div>

            <div className="planets-attribute">
              <span>Edited At:</span> {p.edited}
            </div>

            <div className="planets-attribute">
              <span>URL:</span> <a href={p.url}>{p.url}</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Planets;