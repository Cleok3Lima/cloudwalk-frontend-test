'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './FilterNavigation.module.scss'
import '@utils/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faX } from '@fortawesome/free-solid-svg-icons'

interface Planet {
  name: string
  url: string
}

interface FilterNavigationProps {
  planets: Planet[]
  selectedPlanets: string[]
  setSelectedPlanets: React.Dispatch<React.SetStateAction<string[]>>
}

const FilterNavigation: React.FC<FilterNavigationProps> = ({
  planets,
  selectedPlanets,
  setSelectedPlanets
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [iconRotate, setIconRotate] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target
    if (checked) {
      setSelectedPlanets([...selectedPlanets, name])
    } else {
      setSelectedPlanets(selectedPlanets.filter((planet) => planet !== name))
    }
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
    setIconRotate(!iconRotate)
  }

  const clearAll = () => {
    setSelectedPlanets([])
    setDropdownOpen(false)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const removePlanet = (planetName: string) => {
    setSelectedPlanets(
      selectedPlanets.filter((planet) => planet !== planetName)
    )
  }

  return (
    <section className={styles.filterNavigation} ref={dropdownRef}>
      <span className={styles.filterLabel}>Filter By:</span>
      <div className={styles.dropdownWrapper}>
        <button onClick={toggleDropdown} className={styles.dropdownButton}>
          {selectedPlanets.length > 0
            ? selectedPlanets.map((planet) => (
                <span
                  key={planet}
                  className={styles.selectedPlanet}
                  onClick={() => removePlanet(planet)}
                >
                  {planet}{' '}
                  <FontAwesomeIcon icon={faX} className={styles.removePlanet} />
                </span>
              ))
            : 'All'}
          <FontAwesomeIcon
            className={`${styles.arrowDown} ${dropdownOpen ? styles['rotate180'] : ''}`}
            icon={faChevronDown}
          />
        </button>
        {dropdownOpen && (
          <div className={styles.dropdownContent}>
            <form>
              {planets.map((planet) => (
                <div
                  key={planet.url}
                  className={`${styles.dropdownPlanetsName} ${selectedPlanets.includes(planet.name) ? styles.selected : ''}`}
                >
                  <label htmlFor={planet.url} className={styles.dropdownLabel}>
                    <input
                      type="checkbox"
                      id={planet.url}
                      name={planet.name}
                      checked={selectedPlanets.includes(planet.name)}
                      onChange={handleCheckboxChange}
                    />
                    <span className={styles.dropdownIcon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M10.0007 15.1709L19.1931 5.97852L20.6073 7.39273L10.0007 17.9993L3.63672 11.6354L5.05093 10.2212L10.0007 15.1709Z"></path>
                      </svg>
                    </span>

                    {planet.name}
                  </label>
                </div>
              ))}
            </form>
          </div>
        )}
      </div>
      <button onClick={clearAll} className={styles.clearButton}>
        Clear All
      </button>
    </section>
  )
}

export default FilterNavigation
