import { useRef, useState } from "react"
import countryList from 'country-list';
import "./style.css"

type Data = {
  country: string;
  city: string;
} | null;;

function IndexPopup() {
  const [loading, setLoading] = useState("INITIAL");
  const location = useRef<Data>(null);

  const handleClick = async() => {
    setLoading("LOADING")
    try {
      const ipres = await fetch("https://api64.ipify.org?format=json");
      const {ip} = await ipres.json();
      const dataresp = await fetch(`https://ipinfo.io/${ip}?token=${process.env.PLASMO_PUBLIC_IPINFO}`)
      const { city, country } = await dataresp.json();
      location.current = {
        country: countryList.getName(country),
        city,
      }
      setLoading("LOADED")
    } catch (error) {
      console.error("No network")
      setLoading("ERROR")
    }

  }

  return (
    <section className="w-500 h-500">
      <div className="mx-auto text-center p-4 text-2xl">
        {
        (loading == "LOADED") && `Your country is ${location.current.country} and city is ${location.current.city}`
        }
        {
          (loading == "ERROR") && <span className="text-red-500">Please try Again!</span>
        }
      </div>
      <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        {
          loading != "LOADING"? "Show my Location":"Loading..."
        }
      </button>
    </section>
  )
}

export default IndexPopup
