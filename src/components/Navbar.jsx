import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse,
  faFilePen,
  faArrowRightToBracket,
  faArrowRightFromBracket
} from '@fortawesome/free-solid-svg-icons'

const Navbar = ({ isAuth }) => {
  return (
    <nav className="flex justify-center items-center h-12 gap-12 bg-orange-400">
      <Link className="text-white transition-all hover:text-neutral-500" to="/">
        <FontAwesomeIcon className="mr-1" icon={faHouse} />
        ホーム
      </Link>
      {isAuth ? (
        <>
          <Link
            className="text-white transition-all hover:text-neutral-500"
            to="/createpost"
          >
            <FontAwesomeIcon className="mr-1" icon={faFilePen} />
            記事投稿
          </Link>
          <Link
            className="text-white transition-all hover:text-neutral-500"
            to="/logout"
          >
            <FontAwesomeIcon className="mr-1" icon={faArrowRightFromBracket} />
            ログアウト
          </Link>
        </>
      ) : (
        <Link
          className="text-white transition-all hover:text-neutral-500"
          to="/login"
        >
          <FontAwesomeIcon className="mr-1" icon={faArrowRightToBracket} />
          ログイン
        </Link>
      )}
    </nav>
  )
}

export default Navbar
