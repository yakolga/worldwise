import { createContext, useEffect, useState, useContext } from "react";

const BASE_URL = 'http://localhost:9000';

const CitiesContext = createContext();

function CitiesProvider({children}) {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

    useEffect(function() {
        async function fetchCities() {
            try {
                setLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch (err){
                alert('There was an error while loading a data')
            } finally {
                setLoading(false);
            }
        }
        fetchCities();
    }, []);

    async function getCity(id) {
        try {
            setLoading(true);
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data);
        } catch (err){
            alert('There was an error while loading a data')
        } finally {
            setLoading(false);
        }
    }

    async function createCity(newCity) {
        try {
            setLoading(true);
            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    "Content-type": "application/json"
                },
            });
            const data = await res.json();
            setCities((prev) => [...prev, data]);
        } catch (err){
            alert('There was an error while creating a data')
        } finally {
            setLoading(false);
        }
    }

    async function deleteCity(id) {
        try {
            setLoading(true);
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE',
            });
            setCities((prev) => prev.filter((city) => city.id !== id));
        } catch (err){
            alert('There was an error while deleting a data')
        } finally {
            setLoading(false);
        }
    }

    return (
        <CitiesContext.Provider
            value={{
                cities,
                loading,
                currentCity,
                getCity,
                createCity,
                deleteCity,
            }}
        >
            {children}
        </CitiesContext.Provider>
    )
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error ("CitiesContext was used outside the CitiesProvider");
    return context;
}

export {CitiesProvider, useCities};