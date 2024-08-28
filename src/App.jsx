import Main from "../components/Main"
import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"

function App() {
  const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  function handleToggleModal() {
    setShowModal(!showModal)
  }

  useEffect(() => {
    async function fetchAPIData() {
      const url ='https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}`

      const date = (new Date()).toDateString()
      const localKey = `NASA-${date}`
      
      const localItem = localStorage.getItem(localKey)
      
      if (localItem) {
        const apiData = JSON.parse(localItem)
        setData(apiData)
        console.log('Fetched from cache today')
        return
      }
      localStorage.clear()

      try {
        const res = await fetch(url)
        const apiData = await res.json()
        localStorage.setItem(localKey, JSON.stringify(apiData))
        setData(apiData)
        console.log('Fetched from API today')
      } catch (err) {
        console.log(err.message)
      }
    }
    fetchAPIData()
  }, [])

  return (
    <>
      {data ? (<Main data={data} />) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
        )}
      {showModal && <Sidebar data={data} handleToggleModal={handleToggleModal} />}
      {data && (<Footer data={data} handleToggleModal={handleToggleModal} />)}
    </>
  )
}

export default App
