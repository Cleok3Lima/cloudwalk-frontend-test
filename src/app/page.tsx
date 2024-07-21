'use client'

import { useEffect, useState } from 'react'

// Components
import Header from '@components/Header/Header'
import FilterNavigation from '@components/FilterNavigation/FilterNavigation'
import CharacterList from '@components/CharactersList/CharactersList'

// Styles
import styles from './page.module.scss'

interface Planet {
  name: string
  url: string
}

export default function Home() {
  const [planets, setPlanets] = useState<Planet[]>([])
  const [selectedPlanets, setSelectedPlanets] = useState<string[]>([])

  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await fetch('https://swapi.dev/api/planets')
      const data = await response.json()
      setPlanets(data.results)
    }

    fetchPlanets()
  }, [])

  return (
    <main className={styles.main}>
      <Header />
      <FilterNavigation
        planets={planets}
        selectedPlanets={selectedPlanets}
        setSelectedPlanets={setSelectedPlanets}
      />
      <CharacterList selectedPlanets={selectedPlanets} />
    </main>
  )
}
