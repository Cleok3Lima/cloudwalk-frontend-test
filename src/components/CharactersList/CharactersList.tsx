'use client'

import { useEffect, useState } from 'react'

import styles from './CharactersList.module.scss'

interface Character {
  name: string
  height: string
  mass: string
  gender: string
  homeworld: string
  url: string
}

interface CharacterListProps {
  selectedPlanets: string[]
}

const CharacterList: React.FC<CharacterListProps> = ({ selectedPlanets }) => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [planetsMap, setPlanetsMap] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch('https://swapi.dev/api/people')
      const data = await response.json()
      setCharacters(data.results)
    }

    const fetchPlanets = async () => {
      const response = await fetch('https://swapi.dev/api/planets')
      const data = await response.json()
      const map: { [key: string]: string } = {}
      data.results.forEach((planet: { name: string; url: string }) => {
        map[planet.url] = planet.name
      })
      setPlanetsMap(map)
    }

    fetchCharacters()
    fetchPlanets()
  }, [])

  const filteredCharacters = characters.filter(
    (character) =>
      selectedPlanets.length === 0 ||
      selectedPlanets.includes(planetsMap[character.homeworld])
  )

  return (
    <>
      <h3 className={styles.characterListTitle}>All Characters</h3>
      <div className={styles.characterCardWrapper}>
        {filteredCharacters.map((character) => (
          <div key={character.url} className={styles.characterCard}>
            <img
              src={`https://picsum.photos/433/230?random=${character.url}`}
              alt={character.name}
            />
            <h4 className={styles.characterName}>{character.name}</h4>
            <p className={styles.characterPlanet}>
              {planetsMap[character.homeworld]}
            </p>
            <div className={styles.characterInfo}>
              <p className={styles.characterHeight}>
                Height • {character.height}
              </p>
              <p className={styles.characterMass}>Mass • {character.mass}</p>
              <p className={styles.characterGender}>
                Gender • {character.gender}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default CharacterList
