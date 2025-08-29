import React, { useState, useRef, useEffect } from 'react'
import { FaBell, FaUserCog, FaPowerOff, FaCog } from 'react-icons/fa'
import { MdSearch } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import API from '../../services/api'

const DashNav = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef(null)
    const profileRef = useRef(null)
    const [imgSrc, setImgSrc] = useState("/default-avatar.png") // fallback
    const { auth, logout } = useAuth()
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target) &&
                profileRef.current &&
                !profileRef.current.contains(e.target)
            ) {
                setMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Fetch profile image path
    const [pimg, setPimg] = useState(null)
    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const res = await API.get(`/auth/get-profile-img?nocache=${Date.now()}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Cache-Control": "no-cache",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                })
                setPimg(res.data.result || null)
            } catch (err) {
                console.error("Failed to fetch profile image:", err)
                setPimg(null)
            }
        }
        fetchProfileImage()
    }, [token])

    // Fetch blob image safely
    useEffect(() => {
        if (pimg?.profile_image) {
            const normalizedPath = pimg.profile_image.replace(/\\/g, "/")
            const url = `${import.meta.env.VITE_APP_API}${normalizedPath.startsWith("/") ? "" : "/"}${normalizedPath}`

            fetch(url)
                .then(res => res.blob())
                .then(blob => setImgSrc(URL.createObjectURL(blob)))
                .catch(err => {
                    console.error("Failed to load image blob:", err)
                    setImgSrc("/default-avatar.png")
                })
        } else {
            setImgSrc("/default-avatar.png")
        }
    }, [pimg])

    return (
        <div className="relative w-full border-b border-blue-200 bg-white px-6 md:py-3">
            <div className="flex justify-between items-center">
                {/* Search */}
                <div>
                    <form className="hidden xl:block">
                        <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 focus-within:ring-2 focus-within:ring-blue-300 transition">
                            <MdSearch className="h-5 w-5 text-blue-600" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent outline-none ml-2 w-full text-gray-700 placeholder-gray-400"
                            />
                        </div>
                    </form>
                </div>

                {/* Right section */}
                <div className="flex items-center space-x-6">
                    <Link to="/Dashboard/Notifications">
                        <button className="relative p-2 rounded-full hover:bg-blue-50 transition">
                            <FaBell className="h-5 w-5 text-gray-600" />
                            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                        </button>
                    </Link>

                    {/* Profile Block */}
                    <div
                        ref={profileRef}
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="flex items-center space-x-3 cursor-pointer hover:bg-blue-50 px-3 py-2 rounded-full transition relative"
                    >
                        <img
                            src={imgSrc}
                            alt="Profile"
                            className="w-10 h-10 rounded-full border border-blue-300"
                        />
                        <div className="leading-tight hidden md:block">
                            <h2 className="text-sm font-semibold text-gray-800">{auth.user?.username}</h2>
                            <p className="text-xs text-gray-500">{auth.role}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dropdown Menu */}
            <div
                ref={menuRef}
                className={`origin-top-right absolute right-6 mt-3 w-72 rounded-3xl bg-white border border-gray-100 shadow-xl transition-transform transform z-50
          ${menuOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
        `}
                role="menu"
                aria-label="User menu options"
            >
                <div className="p-5 border-b border-gray-100 text-center">
                    <img
                        src={imgSrc}
                        alt={`${auth.user?.username} profile`}
                        className="h-20 w-20 mx-auto rounded-full border shadow-md"
                    />
                    <h2 className="pt-3 text-lg font-bold text-slate-900">{auth.user?.username}</h2>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{auth.role}</p>
                </div>

                <div className="p-3 space-y-1">
                    <Link
                        to="/Dashboard/Profile"
                        className="flex items-center gap-3 px-4 py-2 rounded-lg text-amber-700 hover:bg-amber-100 transition font-medium"
                        role="menuitem"
                    >
                        <FaUserCog className="text-lg" />
                        Profile
                    </Link>
                    <Link
                        to="/Dashboard/Settings"
                        className="flex items-center gap-3 px-4 py-2 rounded-lg text-amber-700 hover:bg-amber-100 transition font-medium"
                        role="menuitem"
                    >
                        <FaCog className="text-lg" />
                        Settings
                    </Link>
                    <button
                        onClick={() => logout(navigate)}
                        className="w-full text-left flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition font-medium"
                        role="menuitem"
                    >
                        <FaPowerOff className="text-lg fill-red-600" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DashNav
