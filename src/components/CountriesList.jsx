import Spinner from '../components/Spinner';
import Message from '../components/Message';
import styles from './CountriesList.module.css';
import CountryItem from './CountryItem';
import { useCities } from '../contexts/CitiesContext';

function CountriesList() {
    const {cities, loading} = useCities();
    
    if (loading) return <Spinner/>
    if (!cities.length) return <Message message="Add your first city by clicking on a city on the map"/>

    const countries = [];
    const result = [];

    for (let i = 0; i < cities.length; i++) {
        if (!countries.includes(cities[i].country)) {
            countries.push(cities[i].country);
            result.push(cities[i]);
        }
    }

    return (
        <ul className={styles.countryList}>
            {result.map(country => (
                <CountryItem country={country} key={country.id}/>
            ))}
        </ul>
    )
}

export default CountriesList