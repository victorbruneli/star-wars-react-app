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
  FiTruck,
  FiZap,
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

function Films(props : any) {
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

    axios.get('https://swapi.dev/api/films/', { params: params })
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
        Films
      </div>

      <div className="favorite-box-films">
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

      <div className="films-box">
        {data && data.results.map((p: any) =>
          <div className="films" key={p.title}>
            {favorites.indexOf(p.title) < 0 &&
              <button
                className="favorite-button"
                type="button"
                onClick={() => { addToFavorite(p.title); }}
              >
                <FiStar></FiStar>
              </button>
            }

            <div className="people-attribute">
              <span>Title:</span> {p.title}
            </div>

            <div className="people-attribute">
              <span>episode_id:</span> {p.episode_id}
            </div>

            <div className="people-attribute">
              <span>opening_crawl:</span> {p.opening_crawl}
            </div>

            <div className="people-attribute">
              <span>director:</span> {p.director}
            </div>

            <div className="people-attribute">
              <span>producer:</span> {p.producer}
            </div>

            <div className="people-attribute">
              <span>release_date:</span> {p.release_date}
            </div>


            <div className="people-link-list">
              <span><FiFilm /> Characters</span>
              {p.characters.characters === 0 && <div>Nothing</div>}
              {p.characters.map((character: any) =>
                <div key={character}><a href={character}>{character}</a></div>
              )}
            </div>

            <div className="people-link-list">
              <span><FiZap/> Planets</span>
              {p.planets.length === 0 && <div>Nothing</div>}
              {p.planets.map((planet: any) =>
                <div key={planet}><a href={planet}>{planet}</a></div>
              )}
            </div>

            <div className="people-link-list">
              <span><FiZap/> Starships</span>
              {p.starships.length === 0 && <div>Nothing</div>}
              {p.starships.map((starship: any) =>
                <div key={starship}><a href={starship}>{starship}</a></div>
              )}
            </div>

            <div className="people-link-list">
              <span><FiTruck/> Vehicles</span>
              {p.vehicles.length === 0 && <div>Nothing</div>}
              {p.vehicles.map((vehicle: any) =>
                <div key={vehicle}><a href={vehicle}>{vehicle}</a></div>
              )}
            </div>

            <div className="people-link-list">
              <span><FiTwitter /> Species</span>
              {p.species.length === 0 && <div>Nothing</div>}
              {p.species.map((specie: any) =>
                <div key={specie}><a href={specie}>{specie}</a></div>
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

export default Films;