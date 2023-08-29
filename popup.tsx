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
    }

  }

  return (
    <section className="w-500 h-500 bg-sea-green">
      <div className="text-white mx-auto text-center p-4 text-2xl">
        {
        (loading == "LOADED") && `Your country is ${location.current.country} and city is ${location.current.city}`
        }
      </div>
      <button onClick={handleClick} className="bg-gray-400 text-black py-2 px-4 font-bold">
        {
          loading != "LOADING"? "Show my Location":"Loading..."
        }
      </button>
    </section>
  )
}

export default IndexPopup
