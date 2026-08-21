import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({ data }) => {

  const navigate = useNavigate()

  const [input, setInput] = useState(data ? data : '')

  const onSearchHandler = (e) => {
    e.preventDefault()
    if (input.trim()) {
      navigate('/course-list/' + input)
    } else {
      navigate('/course-list')
    }
  }

  return (
    <form onSubmit={onSearchHandler} className="max-w-2xl w-full md:h-14 h-12 flex items-center bg-white border border-slate-200 shadow-lg hover:shadow-xl rounded-full p-1.5 transition-all duration-300 focus-within:ring-4 focus-within:ring-blue-100 focus-within:border-blue-400">
      <div className="pl-4 pr-2 flex items-center">
        <img className="w-5 h-5 opacity-50" src={assets.search_icon} alt="search_icon" />
      </div>
      <input 
        onChange={e => setInput(e.target.value)} 
        value={input} 
        type="text" 
        className="w-full h-full outline-none text-slate-700 placeholder-slate-400 text-sm font-medium bg-transparent px-2" 
        placeholder="Search for courses, skills, or topics..." 
      />
      <button 
        type='submit' 
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-sm px-7 h-full rounded-full transition-all duration-300 shadow-md hover:scale-102 active:scale-95 flex items-center gap-2 whitespace-nowrap"
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar